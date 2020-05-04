const mongoose = require('mongoose');

const Movie = new mongoose.Schema(
  {
    name: { type: String, required: true },
    time: { type: [String], required: true },
    rating: { type: Number, required: true },
    img: {type: Buffer, required: false}
  },
  { timestamps: true }
);

module.exports = mongoose.model(process.env.DB_COLLECTION_NAME, Movie);
