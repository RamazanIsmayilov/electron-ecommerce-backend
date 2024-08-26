const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  surname: {
    type: String,
    required: [true, "Please enter a surname"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"]
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
