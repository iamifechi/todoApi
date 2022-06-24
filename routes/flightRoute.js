const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController')

const {
    bookFlight,
    getAllFlights,
    getSingleFlight,
    updateFlight,
    deleteFlight,
    seed,
  } = flightController

router.post('/', bookFlight); //POST /api/v1/flights
router.get('/', getAllFlights); //GET /api/v1/flights
router.get('/:id', getSingleFlight); //GET /api/v1/flights/:id
router.put('/:id', updateFlight); //PUT /api/v1/flights/:id
router.delete('/:id', deleteFlight); //DELETE /api/v1/flights/:id
router.post('/seed', seed); //POST /api/v1/flights/seed

module.exports = router;

