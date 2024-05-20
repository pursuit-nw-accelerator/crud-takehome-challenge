const express = require('express');
const applicationsController = require('./controllers/applicationControllers.js');
const { dbChecker, crudChecker } = require('./middlewares/middlewares.js');
const cors = require("cors");
const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json());

// TODO: Add controller(s)
app.use('/applications', applicationsController);

// TODO: Implement health check route
app.get('/', dbChecker, crudChecker, (req, res) => {
    return res.status(200).json({data: 'The server is ON'});
});

app.get('*', (req, res) => {
    return res.status(404).json({error: 'the route cannot be found'});
})

module.exports = app;
