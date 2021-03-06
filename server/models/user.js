const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, default: "" },
  icon: { type: String, default: "targaryen" },
  googleid: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
