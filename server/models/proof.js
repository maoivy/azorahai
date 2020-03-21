const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProofSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "user" },
  username: String,
  icon: { type: String, default: "targaryen" },
  theory: { type: ObjectId, ref: "theory" },
  text: String,
  likes: { type: Array, default: [] },
});

module.exports = mongoose.model("proof", ProofSchema);
