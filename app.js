const express = require('express');
const cors = require("cors")
const applicationsController = require("./controllers/applicationsController")
const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json())

// TODO: Add controller(s)
app.use("/applications", applicationsController)

// TODO: Implement health check route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to application tracker");
})

module.exports = app;
