const express = require('express');
const router = express.Router();
const {Products} = require('../models');

router.get('/', async (req, res) => {
    const listOfproducts = await  Products.findAll();
    res.json(listOfproducts);
})

router.get("/cart/:id", async(req, res) => {
    const id= req.params.id;
    const product =await Products.findByPk(id);
    res.json(product);
})

router.post('/', async (req, res) => {
    const products= req.body;
    await Products.create(products);
    res.json(products);
})

router.delete("/:productId", async (req, res) => {
    const productId = req.params.productId;
    await Products.destroy({
      where: {
        id: productId,
      },
    });
  });

module.exports = router;