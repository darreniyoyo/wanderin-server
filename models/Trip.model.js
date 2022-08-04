const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  title: String, //required
  description: String,
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }]

//   stages: [{
//     location: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
//     days: Number
//   }]

  // owner will be added later on
});

module.exports = model('Trip', tripSchema);
