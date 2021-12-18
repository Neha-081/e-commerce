const express=require('express');
const req = require('express/lib/request');
const router=express.Router();
const productRepo=require('../../repositories/products')
const productsNewTemplate=require('../../views/admin/products/new')


router.get('/admin/products',(req,res)=>{

});

router.get('/admin/products/new',(req,res)=>{
  res.send(productsNewTemplate({}));
});


module.exports=router;