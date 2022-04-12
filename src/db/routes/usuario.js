const express = require("express");
const router = new express.Router();


router.post("/user", async (req, res) => {
  console.log('USUARIO!')
  // const user = new User(req.body);

  // try {
  //   await user.save();
  //   res.status(201).send({ user });
  // } catch (e) {
  //   res.status(400).send(e);
  // }
});

module.exports = router