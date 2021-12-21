const express=require('express');
const cartsRepo=require('../repositories/carts')
const router=express.Router();
//receive a post req to add an item to a cart
//getting product id by clicking on add to cart
router.post('/cart/products',async(req,res)=>{
    //figure out the cart
 let cart;
    if(!req.session.cartId){  //by cookie
     //we dont have a cart and need to create one
     //store the cart id on the req.session.cartId
     //property
  cart=await cartsRepo.create({items:[]});  //array contain product id and quantity
 req.session.cartId=cart.id;
}else{
    //we have  a cart lets get it from the repository
     cart=await cartsRepo.getOne(req.session.cartId);   //will generate card id and array of items

 }
console.log(cart);

    //either increment quantity for existing product
    //or add new product to items array 
    

    res.send("product id")
})

//receive a get req to show all items in cart

//receive a post req to delete a item from a cart


module.exports=router;