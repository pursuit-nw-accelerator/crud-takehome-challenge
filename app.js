const cors = require('cors');
const express = require('express');
const items = require("./controllers/applicationController");

const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json());

// TODO: Add controller(s)
app.use('/applications', items);

// TODO: Implement health check route
app.get('/', (req, res) => {
    res.status(200).json({ data: 'Service is running'});
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
