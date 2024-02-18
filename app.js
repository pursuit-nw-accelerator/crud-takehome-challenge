const express = require('express');
const cors = require('cors');
const jobsController = require('./controllers/jobsController');
const app = express();

// TODO: Add application-wide middleware
app.use(cors());
// Why is the below needed?
app.use(express.json());

// TODO: Add controller(s)
app.use('/jobs', jobsController);

// TODO: Implement health check route
app.get('/',(req, res) =>{
    res.status(200).json({ data: 'Service Live'});
})
module.exports = app;
