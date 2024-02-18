const express = require("express");

const app = express();

// TODO: Add application-wide middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

// TODO: Add controller(s)
const jobsController = require("./controllers/jobsController");
app.use("/jobs", jobsController);

// TODO: Implement health check route
app.use("/", (req, res) => {
  res.status(200).json({ data: "Health Check Complete" });
});

module.exports = app;
