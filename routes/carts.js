const express=require('express');
const cartsRepo=require('../repositories/carts')
const productsRepo=require('../repositories/products')
const cartShowTemplate=require('../views/carts/show')
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

 const existingItem=cart.items.find(item=>item.id===req.body.productId);
 if(existingItem){
     //increment quanitity and save cart
     existingItem.quantity++;
 }else{
     //add new product id to items array
     cart.items.push({id:req.body.productId,quantity:1})
 }

 await cartsRepo.update(cart.id,{
     items:cart.items
 });

    //either increment quantity for existing product
    
    
    //or add new product to items array 
    

    res.send("product id")
})

//receive a get req to show all items in cart

router.get('/cart',async(req,res)=>{
    if(!req.session.cartId){
        return res.redirect('/')
    }
    const cart = await cartsRepo.getOne(req.session.cartId);
    for(let item of cart.items){
        //item==={if:,quantity}
  const product =await productsRepo.getOne(item.id);
  item.product=product;
    }
    res.send(cartShowTemplate({items:cart.items}))
})
//receive a post req to delete a item from a cart


module.exports=router;