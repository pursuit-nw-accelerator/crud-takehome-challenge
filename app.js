const express = require('express');
const applicationsController = require('./controllers/applicationControllers.js');

const app = express();

// TODO: Add application-wide middleware
app.use(cors());

// TODO: Add controller(s)
app.use('/applications', applicationsController);

// TODO: Implement health check route

module.exports = app;
