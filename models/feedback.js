const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      required: true,
    },
    userID: {
      type:String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
