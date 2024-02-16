const express = require("express");
const cors = require("cors");

const app = express();

// DONE: Add application-wide middleware
app.use(cors());

// DONE: Add controller(s)
const controller = require("./controllers/jobApplicationsControllers");
app.use(controller);

// DONE: Implement health check route
app.get("/", (req, res) => {
  try {
    res.status(200).send({ response: "success" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = app;
