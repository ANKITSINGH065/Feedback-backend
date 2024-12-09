const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  feedback: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Feedback",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
