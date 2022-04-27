const express = require("express");
const router = new express.Router();
const Libro = require("../models/libro");
const auth = require("../middleware/auth");
const { send } = require("process");

router.post("/libros", auth, async (req, res) => {
  const libro = new Libro(req.body);

  try {
    await libro.save();
    res.status(201).send(libro);
  } catch (e) {
    res.status(500).send(`Error ${e}`);
  }
});

router.get("/libros", auth, async(req, res)=>{
    try {
        const libros = await Libro.find({})
        res.status(200).send(libros)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete("/libros", auth, async (req, res) => {
    try {
        const libro = await Libro.findOne({"isbn":req.body.isbn})
        await Libro.deleteOne({"_id": libro.id})
        res.status(200).send(libro)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router