const {check}=require('express-validator');
const userRepo=require('../../repositories/users')

module.exports={
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
     })
}