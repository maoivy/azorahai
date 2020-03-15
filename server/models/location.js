const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const LocationSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "user" },
  name: String,
  items: [{ name: String, timestamp: Date }],
});

module.exports = mongoose.model("location", LocationSchema);
