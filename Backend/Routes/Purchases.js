const express = require('express');
const router = express.Router();
const {Purchases} = require('../models');

router.get('/', async (req, res) => {
    const listOfPurchases = await  Purchases.findAll();
    res.json(listOfPurchases);
})

router.post('/', async (req, res) => {
    const Purchase= req.body;
    await Purchases.create(Purchase);
    res.json(Purchase);
})

module.exports = router;