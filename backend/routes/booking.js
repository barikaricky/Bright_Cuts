const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  const { customer, barber, service, price, date } = req.body;
  try {
    const booking = new Booking({ customer, barber, service, price, date });
    await booking.save();
    res.json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;