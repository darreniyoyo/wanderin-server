const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const placeSchema = new Schema({
  title: String,
  description: String,
  trip: { type: Schema.Types.ObjectId, ref: 'Trip' }
});

module.exports = model('Place', placeSchema);
