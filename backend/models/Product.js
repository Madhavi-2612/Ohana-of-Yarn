const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Products',
        'Pattern',
        'Amigurumi',
        'Bags',
        'Clothing',
        'Home Decor',
        'Accessories',
        'Baby Items',
        'Gifts',
        'Other',
      ],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '/uploads/default-product.jpg',
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
