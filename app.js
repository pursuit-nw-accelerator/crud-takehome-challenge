const express = require("express");
const cors = require("cors"); // getting started
const app = express();

// TODO: Add application-wide middleware
app.use(cors());
// user stories 4
app.use(express.json());

// TODO: Add controller(s)
// user stories 2
const { getApplications } = require("./controllers/jobApplicationsController");
app.get("/applications", getApplications);
// user stories 3
const { getApplication } = require("./controllers/jobApplicationsController");
app.get("/applications/:id", getApplication);
// user stories 4
const {
  createNewApplication,
} = require("./controllers/jobApplicationsController");
app.post("/applications", createNewApplication);
// user stories 5
const {
  updateExistingApplication,
} = require("./controllers/jobApplicationsController");
app.put("/applications/:id", updateExistingApplication);
// user stories 6
const {
  deleteExistingApplication,
} = require("./controllers/jobApplicationsController");
app.delete("/applications/:id", deleteExistingApplication);

// TODO: Implement health check route
//user stories 1
app.get("/health", (req, res) => {
  res.status(200).json({ data: "API is up and running" });
});

module.exports = app;
