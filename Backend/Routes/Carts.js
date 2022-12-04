const express = require('express');
const router = express.Router();
const {Carts} = require('../models');

router.get("/:userId", async(req, res) => {
    const userId= req.params.userId;
     const carts =await Carts.findAll({where:{UserId:userId}});
     res.json(carts);
 });

 router.get("/:productId", async(req, res) => {
  const productId= req.params.productId;
   const carts =await Carts.findAll({where:{ProductId:productId}});
   res.json(carts);
});

router.get("/", async(req, res) => {
   const carts =await Carts.findAll();
   res.json(carts);
});

router.post('/', async (req, res) => {
    const cart= req.body;
    await Carts.create(cart);
    res.json(cart);
})

router.get('/:userId/:cartID', async (req, res) => {
  const userId= req.params.userId;
  const cartId= req.params.cartID;
     const carts =await Carts.findAll({where:{UserId:userId, cartID:cartId}});
     res.json(carts);
})

router.patch('/:userId/:cartID', async (req, res) => {
  const userId= req.params.userId;
  const cartId= req.params.cartID;
  Carts.update({productQuantity:req.body.productQuantity, checked:req.body.checked}, { where: {UserId:userId, cartID:cartId} }).then((carts)=>{
     res.json(carts);})   
})

router.delete("/:cartID", async (req, res) => {
    const cartId = req.params.cartID;
   
    await Carts.destroy({
      where: {
        CartID: cartId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY"); 
  });

module.exports = router;
