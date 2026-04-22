const Review = require('../models/Review');

// @desc    Get all reviews (Public: only approved, Admin: all)
// @route   GET /api/reviews
exports.getReviews = async (req, res) => {
  try {
    const { isAdmin } = req.query;
    const filter = isAdmin === 'true' ? {} : { isApproved: true };
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
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
      rating,
      isApproved: false // Always starts unapproved
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update review approval status (Admin only)
// @route   PUT /api/reviews/:id/approve
exports.updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.isApproved = !review.isApproved;
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a review (Admin only)
// @route   DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
