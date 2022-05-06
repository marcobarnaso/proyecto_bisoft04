const express = require("express");
const router = new express.Router();
const multer = require('multer')
const sharp = require('sharp')
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

router.delete("/autor", auth, async(req, res)=> {
  try {
    const autor = await Autor.findOne({'authorId': req.body.idAutor})
    await Autor.deleteOne({"_id": autor.id}) 
    res.status(200).send(autor)
  } catch (e) {
    res.status(500).send(e)
  }
})

const upload = multer({
  limits: {
      fileSize: 10000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
  }
})

router.post('/autor/foto', auth, upload.single('picture'), async (req, res) => {
  let autor = await Autor.findOne({"authorId":req.body.authorId})
  const buffer = await sharp(req.file.buffer).resize({ width: 80, height: 127 }).png().toBuffer()
  autor.picture = buffer
  await autor.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/autor/foto', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/autor/foto/:id', async (req, res) => {
  try {
      const autor = await Autor.findOne({"authorId":req.params.id})
      if (!autor || !autor.picture) {
          throw new Error()
      }

      res.set('Content-Type', 'image/jpg')
      res.send(autor.picture)
  } catch (e) {
      res.status(404).send()
  }
})

module.exports = router