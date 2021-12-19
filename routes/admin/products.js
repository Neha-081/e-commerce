const express=require('express');
const {validationResult}=require('express-validator')
const router=express.Router();
const productRepo=require('../../repositories/products')
const productsNewTemplate=require('../../views/admin/products/new')
const {requireTitle,requirePrice}=require('./validator')

router.get('/admin/products',(req,res)=>{

});

router.get('/admin/products/new',(req,res)=>{
  res.send(productsNewTemplate({}));
});

router.post('/admin/products/new',[requirePrice,requirePrice],(req,res)=>{
  const errors=validationResult(req);
  console.log(errors);
  res.send('submitted')
});
module.exports=router;