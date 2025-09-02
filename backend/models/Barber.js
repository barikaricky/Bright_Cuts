const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialties: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  pricing: {
    haircut: { type: Number, required: true, min: 0 },
    beard: { type: Number, default: 0 },
    styling: { type: Number, default: 0 },
    treatment: { type: Number, default: 0 }
  },
  portfolio: [{
    imageUrl: String,
    description: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  availability: {
    isAvailable: { type: Boolean, default: true },
    workingHours: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String }
    }
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  earnings: {
    total: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 }
  },
  completedBookings: {
    type: Number,
    default: 0
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [{
    type: String,
    description: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountName: String
  },
  serviceRadius: {
    type: Number,
    default: 10 // kilometers
  }
}, {
  timestamps: true
});

// Calculate average rating
barberSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

module.exports = mongoose.model('Barber', barberSchema);