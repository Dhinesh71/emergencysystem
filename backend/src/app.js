const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const accidentRoutes = require('./routes/accident.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logger

// Static files (Uploads)
// Serve uploads folder at /uploads URL path
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/accidents', accidentRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
