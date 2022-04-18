const jwt = require("jsonwebtoken");
const User = require("../models/usuario");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.jwtSecret);
    const user = await User.findOne({_id: decode._id, 'tokens.token':token}) //looking for the user with the _id thats stored in the jwt, also looking for the token, the key is tokens.token cause its going to look for a token in the user token array
    if(!user){
        throw new Error() //if theres no user, this will trigger the catch
    }
    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
