const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, uniqe: true },
});

module.exports = model("User", userSchema);
