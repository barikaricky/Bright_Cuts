const express = require('express');
const Barber = require('../models/Barber');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get nearby barbers
router.get('/nearby', auth, async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Find nearby barbers
    const barbers = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          distanceField: 'distance',
          maxDistance: radius * 1000, // convert to meters
          spherical: true,
          query: { role: 'barber', isActive: true }
        }
      },
      {
        $lookup: {
          from: 'barbers',
          localField: '_id',
          foreignField: 'userId',
          as: 'barberProfile'
        }
      },
      {
        $unwind: '$barberProfile'
      },
      {
        $match: {
          'barberProfile.verificationStatus': 'approved',
          'barberProfile.availability.isAvailable': true
        }
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          distance: 1,
          specialties: '$barberProfile.specialties',
          pricing: '$barberProfile.pricing',
          rating: '$barberProfile.rating',
          experience: '$barberProfile.experience'
        }
      }
    ]);

    res.json({ barbers });
  } catch (error) {
    console.error('Get nearby barbers error:', error);
    res.status(500).json({ error: 'Failed to get nearby barbers' });
  }
});

// Get barber profile
router.get('/:id', async (req, res) => {
  try {
    const barber = await Barber.findOne({ userId: req.params.id })
      .populate('userId', 'firstName lastName profileImage');

    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' });
    }

    res.json({ barber });
  } catch (error) {
    console.error('Get barber error:', error);
    res.status(500).json({ error: 'Failed to get barber' });
  }
});

// Update barber profile (barber only)
router.put('/profile', auth, authorize('barber'), async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = [
      'specialties', 'experience', 'pricing', 'availability', 
      'serviceRadius', 'bankDetails'
    ];
    const actualUpdates = {};

    // Filter allowed updates
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        actualUpdates[key] = updates[key];
      }
    });

    const barber = await Barber.findOneAndUpdate(
      { userId: req.user._id },
      actualUpdates,
      { new: true, runValidators: true }
    ).populate('userId', 'firstName lastName profileImage');

    res.json({
      message: 'Barber profile updated successfully',
      barber
    });
  } catch (error) {
    console.error('Update barber profile error:', error);
    res.status(500).json({ error: 'Failed to update barber profile' });
  }
});

// Toggle availability
router.put('/availability', auth, authorize('barber'), async (req, res) => {
  try {
    const { isAvailable } = req.body;

    const barber = await Barber.findOneAndUpdate(
      { userId: req.user._id },
      { 'availability.isAvailable': isAvailable },
      { new: true }
    );

    res.json({
      message: 'Availability updated successfully',
      isAvailable: barber.availability.isAvailable
    });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Get barber dashboard data
router.get('/dashboard/stats', auth, authorize('barber'), async (req, res) => {
  try {
    const barber = await Barber.findOne({ userId: req.user._id });
    
    if (!barber) {
      return res.status(404).json({ error: 'Barber profile not found' });
    }

    const stats = {
      totalEarnings: barber.earnings.total,
      pendingEarnings: barber.earnings.pending,
      thisMonthEarnings: barber.earnings.thisMonth,
      completedBookings: barber.completedBookings,
      rating: barber.rating,
      verificationStatus: barber.verificationStatus
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
});

module.exports = router;