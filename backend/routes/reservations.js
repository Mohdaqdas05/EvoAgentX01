const express = require('express');
const {
  getAllReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  cancelReservation,
} = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllReservations);
router.post('/', createReservation);
router.get('/:id', getReservation);
router.put('/:id', protect, authorize('admin'), updateReservation);
router.put('/:id/cancel', protect, cancelReservation);
router.delete('/:id', protect, authorize('admin'), deleteReservation);

module.exports = router;
