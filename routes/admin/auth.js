const express=require('express')
const userRepo=require('../../repositories/users')
const router=express.Router();
const signupTemplate=require('../../views/admin/auth/signup')
const signinTemplate=require('../../views/admin/auth/signin')

router.get('/signup',(req,res)=>{
    res.send(signupTemplate({req}))
});

//data need to be parsed


router.post('/signup',async(req,res)=>{
const {email,password,confirmPassword}=req.body;
const existingUser=await userRepo.getOneBy({email})  
if(existingUser){
    return res.send('Email already exists!')
}
if(password!==confirmPassword){
    return res.send('Passwords must match!')
}
//create a user id our user repo to represent this person
const user=await userRepo.create({email,password});

//store the id of that user inside the users cookie
req.session.userId=user.id;  //added by cookie session

res.send('Account Created')
});

router.get('/signout',(req,res)=>{
 req.session=null;
 res.send('You are Logged out')
});

router.get('/signin',(req,res)=>{
res.send(signinTemplate())
});

router.post('/signin',async(req,res)=>{
 const {email,password}=req.body;  //req.body have all the info inside form
 const user=await userRepo.getOneBy({email});    //to find an existing email in database
 if(!user){
     return res.send('Email not Found')
 } 

 const validPassword=await userRepo.comparePasswords(
     user.password,
     password
 )
 if(!validPassword){
     return res.send('Invalid Paasword!')
 }
 req.session.userId=user.id;  //user authenticated
res.send('You are signed in')
});

module.exports=router;
