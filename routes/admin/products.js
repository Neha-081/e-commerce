const express = require('express');
const multer = require('multer');

const {handleErrors,requireAuth}=require('./middlewares')
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate=require('../../views/admin/products/index')
const productsEditTemplate=require('../../views/admin/products/edit')
const { requireTitle, requirePrice } = require('./validator');
const req = require('express/lib/request');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products',requireAuth,async (req, res) => {
  const products=await productsRepo.getAll()
res.send(productsIndexTemplate({products}))
});

router.get('/admin/products/new', requireAuth,(req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    if(!req.session.userId){
      return res.redirect('/signin')
    }
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    res.redirect('/admin/products')
  }
);

router.get('/admin/products/:id/edit',requireAuth,async(req,res)=>{
  //editing the input
  const product = await productsRepo.getOne(req.params.id)
  //if id not founf in any of existing id
  if(!product){
    return res.send('product not found')

  }
  res.send(productsEditTemplate({product}))

})
//image upload in edit
router.post('/admin/products/:id/edit',
requireAuth,
upload.single('image'),       //name must be same i.e-image as form name
[requireTitle,requirePrice],
handleErrors(productsEditTemplate,async(req)=>{      //second argue works only when reuire validation above its doesnt work
 const product=await productsRepo.getOne(req.params.id);
 return {product};  //return the same product name if input remains empty
}),
async(req,res)=>{
  const changes=req.body;  //updated title and price
if(req.file){
  changes.image=req.file.buffer.toString('base64');
}
try{
await productsRepo.update(req.params.id,changes);  //updating new values
}catch(err){
  return res.send('could not find item')
}

res.redirect('/admin/products')
});

//delete product
router.post('/admin/products/:id/delete',requireAuth,async(req,res)=>{
await productsRepo.delete(req.params.id);
res.redirect('/admin/products')

})

module.exports = router;
