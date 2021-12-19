const {check}=require('express-validator');
const userRepo=require('../../repositories/users')

module.exports={
    
requireTitle:check('title')
    .trim()
    .isLength({min:5,max:40})
    .withMessage('MUst be between 5 and 40 characters')
    ,
requirePrice:check('price')
    .trim()
    .toFloat()   //convert string to number,number with decimal
    .isFloat({min:1})  //min value of rs 1  
    .withMessage('Must be a number and greater than 1')
    ,
    
    requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async(email)=>{
      const existingUser=await userRepo.getOneBy({email})  
      if(existingUser){
      throw new Error('Email in Use!')
      }
  
    }),
    requirePassword:check('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('Must be between 4 and 20 characters'),

    requireConfirmpw:check('confirmPassword')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('Must be between 4 and 20 characters')
    .custom((confirmPassword,{req})=>{
      if(confirmPassword!==req.body.password){
          throw new Error('Passwords must match!')
      }
     }),
     requireEmailExist:check('email')
     .trim()
     .normalizeEmail()
     .isEmail()
     .withMessage('Must provide a valid email')
     .custom(async(error)=>{
         const user = await userRepo.getOneBy({email});
         if(!user){
             throw new Error('Email not found')
         }
     }),
     requirePasswordExist:check('password')
     .trim()
     .custom(async(password,{req})=>{
         const user=await userRepo.getOneBy({email:req.body.email})
         if(!user){
             throw new Error('Invalid Password')
         }
         const validPassword=await userRepo.comparePasswords(
             user.password,
             password
         )
         if(!validPassword){
             throw new Error('Invalid password')
         }
     })
}