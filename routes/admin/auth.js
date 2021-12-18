const express=require('express')
const {check,validationResult}=require('express-validator')
const userRepo=require('../../repositories/users')
const signupTemplate=require('../../views/admin/auth/signup')
const signinTemplate=require('../../views/admin/auth/signin')
const {requireEmail,requirePassword,requireConfirmpw, requireEmailExist, requirePasswordExist}=require('./validator')
const router=express.Router();

router.get('/signup',(req,res)=>{
    res.send(signupTemplate({req}))
});

//data need to be parsed

//validation
router.post('/signup',
[requireEmail,requirePassword,requireConfirmpw,requireEmailExist,requirePasswordExist],
async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.send(signupTemplate({req,errors}))
}

const {email,password,confirmPassword}=req.body;

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
res.send(signinTemplate({}));   //to get no errors
});

router.post('/signin',[requirePassword,
requireConfirmpw],
async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.send(signinTemplate({errors}))
    }

 const {email}=req.body;  //req.body have all the info inside form
 const user=await userRepo.getOneBy({email});    //to find an existing email in database


 req.session.userId=user.id;  //user authenticated
res.send('You are signed in')
});

module.exports=router;
