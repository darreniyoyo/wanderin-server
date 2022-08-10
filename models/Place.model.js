const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const placeSchema = new Schema({
  title: {type: String, required: true, },
  description: String,
});

module.exports = model('Place', placeSchema);
