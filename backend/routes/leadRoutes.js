const express = require('express');
const router = express.Router();
const {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats,
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, getLeadStats);

router
  .route('/')
  .get(protect, getLeads)
  .post(createLead); // Can be called by public contact form or protected admin

router
  .route('/:id')
  .put(protect, updateLead)
  .delete(protect, deleteLead);

module.exports = router;
