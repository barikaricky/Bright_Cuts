const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  barber: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber' },
  service: String,
  price: Number,
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'canceled'], default: 'pending' },
  date: Date,
});

module.exports = mongoose.model('Booking', BookingSchema);