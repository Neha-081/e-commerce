const express=require('express')
const {handleErrors}=require('./middlewares')
const usersRepo=require('../../repositories/users')
const signupTemplate=require('../../views/admin/auth/signup')
const signinTemplate=require('../../views/admin/auth/signin')
const {requireEmail,requirePassword,requireConfirmpw, requireEmailExist, requirePasswordExist}=require('./validator')
const req = require('express/lib/request')
const router=express.Router();

router.get('/signup',(req,res)=>{
    res.send(signupTemplate({req}))
});

//data need to be parsed

//validation
router.post('/signup',
[requireEmail,requirePassword,requireConfirmpw],
handleErrors(signupTemplate),
async(req,res)=>{

const {email,password}=req.body;

//create a user id our user repo to represent this person
const user=await usersRepo.create({email,password});

//store the id of that user inside the users cookie
req.session.userId=user.id;  //added by cookie session

res.redirect('/admin/products')
});

router.get('/signout',(req,res)=>{
 req.session=null;
 res.send('You are Logged out')
});

router.get('/signin',(req,res)=>{
res.send(signinTemplate({}));   //to get no errors
});

router.post('/signin',[requireEmailExist,requirePasswordExist],
handleErrors(signinTemplate),
async(req,res)=>{
 const {email}=req.body;  //req.body have all the info inside form
 const user=await usersRepo.getOneBy({email});    //to find an existing email in database


 req.session.userId=user.id;  //user authenticated
 res.redirect('/admin/products')
});

module.exports=router;
