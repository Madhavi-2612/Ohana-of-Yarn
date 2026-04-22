const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReviewStatus, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getReviews);
router.post('/', createReview);
router.put('/:id/approve', protect, admin, updateReviewStatus);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;
