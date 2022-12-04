const express = require('express');
const router = express.Router();
const {Locations} = require('../models');

router.get('/', async (req, res) => {
    const listOfLocations = await  Locations.findAll();
    res.json(listOfLocations);
})

router.post('/', async (req, res) => {
    const Location= req.body;
    await Locations.create(Location);
    res.json(Location);
})

module.exports = router;