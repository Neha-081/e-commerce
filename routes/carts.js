const express=require('express');
const router=express.Router();

//receive a post req to add an item to a cart
//getting product id by clicking on add to cart
router.post('/cart/products',async(req,res)=>{
    console.log(req.body.productId);
    res.send("product id")
})

//receive a get req to show all items in cart

//receive a post req to delete a item from a cart


module.exports=router;