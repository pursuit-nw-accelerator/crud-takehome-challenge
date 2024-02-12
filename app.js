const express = require("express");

const app = express();

// TODO: Add application-wide middleware
const cors = require("cors");
app.use(cors());

// TODO: Add controller(s)

// TODO: Implement health check route
app.use("/", (req, res) => {
  res.send("Health Check Complete");
});

module.exports = app;
