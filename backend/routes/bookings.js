const express = require('express');
const Booking = require('../models/Booking');
const Barber = require('../models/Barber');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Create a booking (customer only)
router.post('/', auth, authorize('customer'), async (req, res) => {
  try {
    const {
      barberId,
      services,
      scheduledFor,
      customerLocation,
      customerNotes
    } = req.body;

    // Calculate total amount
    const totalAmount = services.reduce((sum, service) => sum + service.price, 0);

    const booking = new Booking({
      customerId: req.user._id,
      barberId,
      services,
      totalAmount,
      scheduledFor: new Date(scheduledFor),
      customerLocation,
      customerNotes
    });

    await booking.save();
    await booking.populate(['customerId', 'barberId']);

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (req.user.role === 'customer') {
      query.customerId = req.user._id;
    } else if (req.user.role === 'barber') {
      const barber = await Barber.findOne({ userId: req.user._id });
      if (barber) {
        query.barberId = barber._id;
      }
    }

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('customerId', 'firstName lastName phone profileImage')
      .populate({
        path: 'barberId',
        populate: {
          path: 'userId',
          select: 'firstName lastName phone profileImage'
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'firstName lastName phone profileImage')
      .populate({
        path: 'barberId',
        populate: {
          path: 'userId',
          select: 'firstName lastName phone profileImage'
        }
      });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user has access to this booking
    const barber = await Barber.findOne({ userId: req.user._id });
    const hasAccess = 
      booking.customerId._id.toString() === req.user._id.toString() ||
      (barber && booking.barberId._id.toString() === barber._id.toString()) ||
      req.user.role === 'admin';

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Failed to get booking' });
  }
});

// Update booking status (barber only)
router.put('/:id/status', auth, authorize('barber'), async (req, res) => {
  try {
    const { status, barberNotes } = req.body;
    const validStatuses = ['accepted', 'in_progress', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const barber = await Barber.findOne({ userId: req.user._id });
    const booking = await Booking.findOne({
      _id: req.params.id,
      barberId: barber._id
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Update booking
    booking.status = status;
    if (barberNotes) booking.barberNotes = barberNotes;

    if (status === 'in_progress') {
      booking.actualStartTime = new Date();
    } else if (status === 'completed') {
      booking.actualEndTime = new Date();
      booking.paymentStatus = 'paid'; // Trigger payment processing
      
      // Update barber earnings and completed bookings count
      barber.earnings.total += booking.barberEarnings;
      barber.earnings.thisMonth += booking.barberEarnings;
      barber.completedBookings += 1;
      await barber.save();
    }

    await booking.save();
    await booking.populate(['customerId', 'barberId']);

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user can cancel this booking
    const barber = await Barber.findOne({ userId: req.user._id });
    const canCancel = 
      booking.customerId.toString() === req.user._id.toString() ||
      (barber && booking.barberId.toString() === barber._id.toString());

    if (!canCancel) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Only allow cancellation if booking is not completed
    if (booking.status === 'completed') {
      return res.status(400).json({ error: 'Cannot cancel completed booking' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancelledBy = req.user.role;
    
    await booking.save();

    res.json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// Rate booking (customer only)
router.put('/:id/rate', auth, authorize('customer'), async (req, res) => {
  try {
    const { score, review } = req.body;

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ error: 'Rating score must be between 1 and 5' });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      customerId: req.user._id,
      status: 'completed'
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found or not completed' });
    }

    if (booking.rating.score) {
      return res.status(400).json({ error: 'Booking already rated' });
    }

    // Update booking rating
    booking.rating = {
      score,
      review,
      ratedAt: new Date()
    };
    await booking.save();

    // Update barber rating
    const barber = await Barber.findById(booking.barberId);
    await barber.updateRating(score);

    res.json({
      message: 'Rating submitted successfully',
      rating: booking.rating
    });
  } catch (error) {
    console.error('Rate booking error:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

module.exports = router;