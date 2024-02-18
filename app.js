const cors = require('cors');
const express = require('express');
const applications = require("./controllers/applicationController");

const app = express();

// TODO: Add application-wide middleware
app.use(cors());

// TODO: Add controller(s)
app.use('/applications', applications);

// TODO: Implement health check route
app.get('/', (req, res) => {
    res.status(200).json({ data: 'Service is running'});
});

module.exports = app;
