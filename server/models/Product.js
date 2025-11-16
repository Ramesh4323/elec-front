const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Pipes', 'Wires', 'Switches', 'Lights', 'Tools', 'Fans', 'Agri Tools', 'Others'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
