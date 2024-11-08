const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMovie = async (req, res) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
