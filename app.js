const express = require('express');

const app = express();
const cors = require("cors");
const jobapplicationsRoutes = require("./controllers/jobapplicationsController");


// Middleware
app.use(cors());
app.use(express.json());
app.use("/jobapplications", jobapplicationsRoutes);

// Controllers
app.get("/jobapplications", (req, res) => {
    res.json( {data: "Welcome to the CRUD back end takehome challenge"})
})


// Health check route
app.get ("/", (req, res) => {
    res.status(200).json({data: "Service is running"})
})


// No such page route
app.get ("*", (req, res) => {
    res.status(404).json({data: "Page not found"})
})


module.exports = app;
