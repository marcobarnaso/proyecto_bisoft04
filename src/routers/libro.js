const express = require("express");
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router();
const Libro = require("../models/libro");
const auth = require("../middleware/auth");

router.post("/libros", auth, async (req, res) => {
  const libro = new Libro(req.body);

  try {
    await libro.save();
    res.status(201).send(libro);
  } catch (e) {
    res.status(500).send(`Error ${e}`);
  }
});

router.get("/libros", async(req, res)=>{
    try {
        const libros = await Libro.find({})
        res.status(200).send(libros)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/libro/buscar/:isbn", async(req, res)=>{
  try {
      const libro = await Libro.findOne({"isbn":req.params.isbn})
      res.status(200).send(libro)
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

const upload = multer({
  limits: {
      fileSize: 1000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
  }
})

router.post('/libro/portada', auth, upload.single('cover'), async (req, res) => {
  let libro = await Libro.findOne({"isbn":req.body.isbn})
  const buffer = await sharp(req.file.buffer).resize({ width: 160, height: 255 }).png().toBuffer()
  libro.cover = buffer
  await libro.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/libro/portada', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/libro/portada/:isbn', async (req, res) => {
  try {
      const libro = await Libro.findOne({"isbn":req.params.isbn})
      if (!libro || !libro.cover) {
          throw new Error()
      }

      res.set('Content-Type', 'image/jpg')
      res.send(libro.cover)
  } catch (e) {
      res.status(404).send()
  }
})


module.exports = router