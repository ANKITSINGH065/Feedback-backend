const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.post("/submitFeedback", async (req, res) => {
  try {
    const { category, rating, comments, userID } = req.body;

    const feedback = new Feedback({ category, rating, comments, userID });
    await feedback.save();
    console.log(feedback);

    res
      .status(200)
      .json({ feedback, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/feedbackByCategory/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const feedbacks = await Feedback.find({ category });
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/updateFeedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, rating, comments } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { category, rating, comments },
      { new: true }
    );

    if (feedback) {
      res
        .status(200)
        .json({ feedback, message: "Feedback updated successfully" });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getFeedbackByUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const feedbacks = await Feedback.find({ userID: userId });

    if (feedbacks.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for this user" });
    }

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedback for user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteFeedback/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (feedback) {
      res.status(200).json({ message: "Feedback deleted successfully" });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
