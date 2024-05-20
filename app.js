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
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Add controller(s)

// TODO: Implement health check route

module.exports = app;
