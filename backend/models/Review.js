const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
