const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    type: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    secondLastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    phone: {
      type: Number,
      required: true,
      minlength: 8,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    idType: {
      type: String,
      required: true,
      trim: true,
    },
    identification: {
      type: Number,
      minlength: 9,
      unique: true
    },
    provincia: {
      type: String,
      required: true,
      trim: true,
    },
    canton: {
      type: String,
      required: true,
      trim: true,
    },
    distrito: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [{
        token:  {
            type: String,
            required: true
        }
    }]
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject() // cleans up the user object from the mongoose metadata

    delete userObject.password // delete property password
    delete userObject.tokens // delete property tokens

    return userObject // return de user object to the handler without the sensible data, this is just to send the response without the password or tokens
}

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.jwtSecret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model("User", userSchema);

module.exports = User;
