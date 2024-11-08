const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

exports.createBooking = async (req, res) => {
    const { movieId, customerName, seatsBooked } = req.body;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        if (movie.seatsAvailable < seatsBooked) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        movie.seatsAvailable -= seatsBooked;
        await movie.save();

        const booking = new Booking({ movieId, customerName, seatsBooked });
        await booking.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('movieId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
