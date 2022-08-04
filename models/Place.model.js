const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const placeSchema = new Schema({
  title: String, // required
  description: String,
});

module.exports = model('Place', placeSchema);
