const express = require('express');
const cors = require('cors');
const { validateApplication, validateId } = require('./middleware/validation');
const {
    getAll,
    getById,
    create,
    update,
    remove
} = require('./controllers/jobApplicationsController');

// TODO: Add application-wide middleware
app.use(cors());

// TODO: Add controller(s)

// TODO: Implement health check route

module.exports = app;
