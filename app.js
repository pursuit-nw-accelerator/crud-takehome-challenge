const express = require('express');
const cors = require('cors');

const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json())

// TODO: Add controller(s)
const jobApplicationController = require("./controllers/jobApplicationController");

app.use('/applications', jobApplicationController);

// TODO: Implement health check route
app.get('/', (request, response) => {
    response.status(200).json({ data : "service is running"})
})

module.exports = app;
