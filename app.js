// app.js
const express = require('express');
const cors = require('cors');
const jobApplicationsRoutes = require('./routes/jobApplicationsRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/applications', jobApplicationsRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Health Check OK');
});

module.exports = app;
