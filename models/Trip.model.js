const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  title: String,
  description: String,
  place: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
  // owner will be added later on
});

module.exports = model('Trip', tripSchema);
