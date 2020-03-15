const mongoose = require("mongoose");

const TheorySchema = new mongoose.Schema({
  text: String,
  character: Array,
  action: String,
  category: String,
});

module.exports = mongoose.model("theory", TheorySchema);
