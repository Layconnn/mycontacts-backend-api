const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please input the username"],
    },
    email: {
      type: String,
      required: [true, "Please input the user's email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please enter the user's password"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema)