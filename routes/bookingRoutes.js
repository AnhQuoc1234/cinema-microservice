const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Showtime = require('../models/Showtime');

// Create a booking
router.post('/', async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.body.showtime);
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    if (showtime.seatsAvailable < req.body.seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking(req.body);
    const newBooking = await booking.save();

    // Update seats available
    showtime.seatsAvailable -= req.body.seatsBooked;
    await showtime.save();

    res.status(201).json(newBooking);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// Get all bookings
router.get('/', async (req, res) => {
try {
    const bookings = await Booking.find().populate('showtime');
    res.json(bookings);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Export the router
module.exports = router;