const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProofSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "user" },
  theory: { type: ObjectId, ref: "theory" },
  text: String,
});

module.exports = mongoose.model("proof", ProofSchema);
