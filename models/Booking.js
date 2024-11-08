const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    customerName: { type: String, required: true },
    seatsBooked: { type: Number, required: true },
    bookingTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);