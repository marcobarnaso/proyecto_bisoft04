const express = require("express");
const router = new express.Router();
const Autor = require("../models/autor");
const auth = require("../middleware/auth");

router.post("/autor", auth, async (req, res) => {
  const autor = new Autor(req.body);
  try {
    await autor.save();
    res.status(201).send(autor);
  } catch (e) {
    res.status(500).send(`Error ${e}`);
  }
});

router.get("/autor", auth, async(req, res)=> {
    try {
        let autores = await Autor.find({})
        res.status(200).send(autores)
    } catch (e) {
       res.status(500).send(`Error ${e}`) 
    }
})

module.exports = router