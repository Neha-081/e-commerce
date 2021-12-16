const e = require('express');
const express = require('express')
const bodyParser=require('body-parser')  //midleware library


 //app is a object that describes all the web functions a server can do
 const app=express();

 //urlencoded-function within the library bodyparser which 
//use for handling specific info that is coming as htnl form
 app.use(bodyParser.urlencoded({extended:true}))
 app.get('/',(req,res)=>{
     res.send(`
     <div>
     <form method="POST">
     <input name="email" type="email" placeholder="email">
     <input name="password" type="password" placeholder="password">
     <input name="confirmPassword" type="password" placeholder="confirm password">
     <button>Signup</button>
 </form>
     </div>
     `)
 });

 //data need to be parsed
 

 app.post('/',(req,res)=>{
 console.log(req.body);
   res.send('Account Created')
 });

 app.listen(3000,()=>{
     console.log('Listening on port 3000');
 });