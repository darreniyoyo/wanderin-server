const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  // owner will be added later on
});

module.exports = model('Trip', tripSchema);
