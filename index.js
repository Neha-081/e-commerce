const express = require('express')
const bodyParser=require('body-parser')  //midleware library
const cookieSession=require('cookie-session')
const authRouter=require('./routes/admin/auth')
const productsRouter=require('./routes/admin/products')

 //app is a object that describes all the web functions a server can do
 const app=express();

 app.use(express.static('public'));

 //urlencoded-function within the library bodyparser which 
//use for handling specific info that is coming as htnl form
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(cookieSession({
 keys:['mayanehaprajapati']  //used to encrypt all the info store inside the cookie 
 }));

 app.use(authRouter)
 app.use(productsRouter)
 

 app.listen(3000,()=>{
     console.log('Listening on port 3000');
 });