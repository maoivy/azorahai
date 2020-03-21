const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProofSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "user" },
  username: String,
  icon: String,
  theory: { type: ObjectId, ref: "theory" },
  text: String,
  likes: { type: Array, default: [] },
  likecount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("proof", ProofSchema);
