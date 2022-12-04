const express = require('express');
const router = express.Router();
const {Users} = require('../models');

router.get('/', async (req, res) => {
    const listOfUsers = await  Users.findAll();
    res.json(listOfUsers);
})

router.get("/cart/:id", async(req, res) => {
    const id= req.params.id;
    const user =await Users.findByPk(id);
    res.json(user);
})

router.post('/', async (req, res) => {
    const user= req.body;
    await Users.create(user);
    res.json(user);
})

router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId;
    await Users.destroy({
      where: {
        id: userId,
      },
    });
  });

module.exports = router;