const express = require('express');
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getMetrics,
} = require('../controllers/clientController');
const { protect } = require('../middleware/auth');

router.get('/metrics', protect, getMetrics);

router
  .route('/')
  .get(protect, getClients)
  .post(protect, createClient);

router
  .route('/:id')
  .get(protect, getClientById)
  .put(protect, updateClient)
  .delete(protect, deleteClient);

module.exports = router;
