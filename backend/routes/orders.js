const express = require('express');
const {
  getAllOrders,
  getUserOrders,
  getOrder,
  createOrder,
  processPayment,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllOrders);
router.get('/user/my', protect, getUserOrders);
router.post('/', createOrder);
router.get('/:id', getOrder);
router.post('/:id/payment', protect, processPayment);
router.put('/:id', protect, authorize('admin'), updateOrder);
router.delete('/:id', protect, authorize('admin'), deleteOrder);

module.exports = router;
