const express = require('express');
const User = require('../models/User');
const Barber = require('../models/Barber');
const Booking = require('../models/Booking');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats (admin only)
router.get('/dashboard', auth, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalBarbers = await Barber.countDocuments();
    const pendingBarbers = await Barber.countDocuments({ verificationStatus: 'pending' });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    
    // Calculate total platform revenue (20% commission)
    const revenue = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$platformFee' } } }
    ]);
    
    const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

    res.json({
      stats: {
        totalUsers,
        totalBarbers,
        pendingBarbers,
        totalBookings,
        completedBookings,
        totalRevenue
      }
    });
  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
});

// Get pending barber verifications
router.get('/barbers/pending', auth, authorize('admin'), async (req, res) => {
  try {
    const pendingBarbers = await Barber.find({ verificationStatus: 'pending' })
      .populate('userId', 'firstName lastName email phone createdAt')
      .sort({ createdAt: -1 });

    res.json({ barbers: pendingBarbers });
  } catch (error) {
    console.error('Get pending barbers error:', error);
    res.status(500).json({ error: 'Failed to get pending barbers' });
  }
});

// Verify/reject barber
router.put('/barbers/:id/verify', auth, authorize('admin'), async (req, res) => {
  try {
    const { status, notes } = req.body; // status: 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid verification status' });
    }

    const barber = await Barber.findByIdAndUpdate(
      req.params.id,
      { 
        verificationStatus: status,
        verificationNotes: notes
      },
      { new: true }
    ).populate('userId', 'firstName lastName email');

    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' });
    }

    // Update user verification status
    await User.findByIdAndUpdate(barber.userId._id, { isVerified: status === 'approved' });

    res.json({
      message: `Barber ${status} successfully`,
      barber
    });
  } catch (error) {
    console.error('Verify barber error:', error);
    res.status(500).json({ error: 'Failed to verify barber' });
  }
});

// Get all bookings for monitoring
router.get('/bookings', auth, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('customerId', 'firstName lastName email phone')
      .populate({
        path: 'barberId',
        populate: {
          path: 'userId',
          select: 'firstName lastName email phone'
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
    console.error('Get admin bookings error:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Get revenue analytics
router.get('/revenue', auth, authorize('admin'), async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let groupBy;
    if (period === 'day') {
      groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    } else if (period === 'week') {
      groupBy = { $dateToString: { format: '%Y-%U', date: '$createdAt' } };
    } else {
      groupBy = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
    }

    const revenue = await Booking.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: '$platformFee' },
          totalBookings: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ revenue });
  } catch (error) {
    console.error('Get revenue analytics error:', error);
    res.status(500).json({ error: 'Failed to get revenue analytics' });
  }
});

// Deactivate/activate user
router.put('/users/:id/toggle-status', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ error: 'Failed to toggle user status' });
  }
});

module.exports = router;