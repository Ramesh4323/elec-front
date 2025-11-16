const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} = require('../controllers/cart');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, addToCart);
router.route('/:productId').delete(protect, removeFromCart).put(protect, updateCartItem);

module.exports = router;
