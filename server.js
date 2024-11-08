const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route Imports
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/bookings'); 

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Cinema Microservice');
});

app.use('/movies', movieRoutes);
app.use('/bookings', bookingRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});