const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  title: { 
    type: String, 
    required: true,
  },
  description: String,
  days: Number,
  place: [{ 
    type: Schema.Types.ObjectId, ref: 'Place' 
  }],



  // owner will be added later on
});

module.exports = model('Trip', tripSchema);
