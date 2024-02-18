const express = require('express');
const cors = require('cors');
const jobApplicationsController = require('../crud-takehome-challenge/controller/jobApplicationsController')

const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// TODO: Add controller(s)
app.use('/jobs', jobApplicationsController);

// TODO: Implement health check route
app.get('/health', (req, res) => {
    res.status(200).send('Server is up and running');
  });

module.exports = app;
