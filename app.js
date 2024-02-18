const express = require('express');

const app = express();
const cors = require("cors");
const jobapplicationsRoutes = require("./controllers/jobapplicationsController");

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json());
app.use("/jobapplications", jobapplicationsRoutes);

// Controller(s)
app.get("/", (req, res) => {
    res.json( {message: "Welcome to the CRUD back end takehome challenge"})
})


// Health check route
app.get ("*", (req, res) => {
    res.status(404).json({message: "Page not found"})
})



module.exports = app;
