const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    isbn: {
      type: Number,
      trim: true,
      required: true,
    },
    editorial: {
      type: String,
      trim: true,
      required: true,
    },
    published: {
      type: String,
      trim: true,
      required: true,
    },
    excerpt: {
      type: String,
      trim: true,
      required: true,
    },
    awards: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    discount: {
      type: String,
      trim: true,
      required: true,
    },
    cover: {
      type: Buffer
    },
    genere: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Libro = mongoose.model("Libro", libroSchema);

module.exports = Libro;
