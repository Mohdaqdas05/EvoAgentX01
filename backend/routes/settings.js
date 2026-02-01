const express = require('express');
const {
  getAllSubmissions,
  createSubmission,
  updateSubmission,
  getSettings,
  updateSettings,
} = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Contact routes
router.post('/contact', createSubmission);
router.get('/contact', protect, authorize('admin'), getAllSubmissions);
router.put('/contact/:id', protect, authorize('admin'), updateSubmission);

// Settings routes
router.get('/restaurant', getSettings);
router.put('/restaurant', protect, authorize('admin'), updateSettings);

module.exports = router;
