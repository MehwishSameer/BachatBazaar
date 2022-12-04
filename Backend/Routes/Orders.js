const express = require('express');
const router = express.Router();
const {Orders} = require('../models');

router.get("/:userId", async(req, res) => {
    const userId= req.params.userId;
     const orders =await Orders.findAll({where:{UserId:userId}});
     res.json(orders);
 });

 router.get("/", async(req, res) => {
    const orders =await Orders.findAll();
    res.json(orders);
 });

router.post('/', async (req, res) => {
    const order= req.body;
    await Orders.create(order);
    res.json(order);
})

router.get('/:userId/:orderID', async (req, res) => {
  const userId= req.params.userId;
  const orderId= req.params.orderID;
     const orders =await Orders.findAll({where:{UserId:userId, orderID:orderId}});
     res.json(orders);
})

router.patch('/:userId/:orderID', async (req, res) => {
  const userId= req.params.userId;
  const orderId= req.params.orderID;
  Orders.update({productQuantity:req.body.productQuantity, checked:req.body.checked}, { where: {UserId:userId, orderID:orderId} }).then((orders)=>{
     res.json(orders);})   
})

router.delete("/:orderID", async (req, res) => {
    const orderId = req.params.orderID;
   
    await Orders.destroy({
      where: {
        orderID: orderId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY"); 
  });

module.exports = router;