const express = require("express");
const cors = require("cors");

const jobAppController = require("./controllers/jobAppController");

require("dotenv").config();

const app = express();

// TODO: Add application-wide middleware
app.use(cors());

// TODO: Add controller(s)
app.use(express.json());

app.use("/applications", jobAppController);

// TODO: Implement health check route
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running");
});

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
