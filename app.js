const express = require('express');
const applicationsController = require('./controllers/applicationControllers.js');
const { dbChecker } = require('./middlewares/middlewares.js');

const app = express();

// TODO: Add application-wide middleware
app.use(cors());

// TODO: Add controller(s)
app.use('/applications', applicationsController);

// TODO: Implement health check route
app.get('/', dbChecker, (req, res) => {
    return res.status(200).json({data: 'The server is ON'});
});

app.get('*', (req, res) => {
    return res.status(404).json({error: 'the route cannot be found'});
})

module.exports = app;
