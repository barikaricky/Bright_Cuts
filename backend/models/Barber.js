const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  experience: String,
  pricing: Number,
  portfolio: [String],
  verified: { type: Boolean, default: false },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Barber', BarberSchema);