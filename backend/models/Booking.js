const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true
  },
  services: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  platformFee: {
    type: Number,
    required: true,
    default: function() {
      return this.totalAmount * 0.2; // 20% commission
    }
  },
  barberEarnings: {
    type: Number,
    required: true,
    default: function() {
      return this.totalAmount - this.platformFee;
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  customerLocation: {
    address: { type: String, required: true },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  customerNotes: {
    type: String,
    maxlength: 500
  },
  barberNotes: {
    type: String,
    maxlength: 500
  },
  estimatedDuration: {
    type: Number, // in minutes
    default: 60
  },
  actualStartTime: Date,
  actualEndTime: Date,
  cancellationReason: String,
  cancelledBy: {
    type: String,
    enum: ['customer', 'barber', 'admin']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentReference: String,
  rating: {
    score: { type: Number, min: 1, max: 5 },
    review: String,
    ratedAt: Date
  }
}, {
  timestamps: true
});

// Index for geospatial queries
bookingSchema.index({ 'customerLocation.coordinates': '2dsphere' });

// Pre-save middleware to calculate fees
bookingSchema.pre('save', function(next) {
  if (this.isModified('totalAmount')) {
    this.platformFee = this.totalAmount * 0.2;
    this.barberEarnings = this.totalAmount - this.platformFee;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);