const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  title: { 
    type: String, 
    required: true,
  },
  description: String,
  days: Number,
  location: String,
});

module.exports = model('Trip', tripSchema);
