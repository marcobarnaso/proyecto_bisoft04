const express = require("express");
const router = new express.Router();
const User = require("../models/usuario");
const auth = require("../middleware/auth");

router.post("/user", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Usuario no encontrado.");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/user/:id", auth, async (req, res) => {
  try {
    await req.user.remove() // user id comes in the request from the auth method
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/user/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "lastName",
    "secondLastName",
    "email",
    "phone",
    "password",
    "idType",
    "identification",  // TODO => check this one works with authentication
    "provincia",
    "canton",
    "distrito",
    "address",
  ];

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  const user = req.user;
  const token = req.token;

  try {
    user.tokens = user.tokens.filter((e) => {
      return e.token != token; // si el token es igual al token que se esta iterando del user, entonces se filtra y se remueve del array de tokens
    });
    await user.save();
    res.status(200).send(`${user.name} cerró su sesión`);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/users/logoutAll', auth, async (req, res)=> {
  try {
    req.user.tokens = []  
    await req.user.save()
    res.status(200).send('All user logged out')
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router;
