const controllers = require('./controllers/jobsController')

const express = require('express');
const cors = require('cors');

const app = express();

// TODO: Add application-wide middleware
app.use(express.json())
app.use(cors());

// TODO: Add controller(s)
app.get('/applications', controllers.getJobApplications)
app.get('/applications:id', controllers.getJobApplicationById)
app.post('/applications', controllers.createJobApplication)
app.put('/applications:id', controllers.updateJobApplication)
app.delete('/applications:id', controllers.deleteJobApplication)

// TODO: Implement health check route
app.get('/health', (req, res) => {
    res.send('Health Check OK');
  });

module.exports = app;
