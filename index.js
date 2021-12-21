const express = require('express')
const bodyParser=require('body-parser')  //midleware library
const cookieSession=require('cookie-session')
const authRouter=require('./routes/admin/auth')
const adminProductsRouter=require('./routes/admin/products')
const productsRouter=require('./routes/products')
const cartsRouter=require('./routes/carts')

 //app is a object that describes all the web functions a server can do
 const app=express();

 app.use(express.static('public'));

 //urlencoded-function within the library bodyparser which 
//use for handling specific info that is coming as htnl form
//bodyparser cares only about urlencoded i.e-default enctype
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(cookieSession({
 keys:['mayanehaprajapati']  //used to encrypt all the info store inside the cookie 
 }));

 app.use(authRouter)
 app.use(adminProductsRouter)
 app.use(productsRouter)
 app.use(cartsRouter)
 

 app.listen(3000,()=>{
     console.log('Listening on port 3000');
 });