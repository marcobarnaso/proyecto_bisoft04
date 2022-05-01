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

module.exports = router