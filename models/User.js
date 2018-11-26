const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    trim: true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
