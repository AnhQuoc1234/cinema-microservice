const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    showtimes: [{ type: Date, required: true }],
    seatsAvailable: { type: Number, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);