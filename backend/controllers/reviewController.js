const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
exports.createReview = async (req, res) => {
  const { name, place, message, rating } = req.body;

  try {
    const review = await Review.create({
      name,
      place,
      message,
      rating
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
