const express=require('express');
const productRepo=require('../repositories/products')
const router=express.Router();
const productsIndexTemplate=require('../views/products/index')

router.get('/',async(req,res)=>{
 const products=await productRepo.getAll();
 res.send(productsIndexTemplate({products}))
});
module.exports=router;