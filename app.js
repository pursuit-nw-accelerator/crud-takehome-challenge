const express = require("express");
const cors = require("cors"); // getting started
const app = express();
// 3rd comment implement fix: create an instance of an express router
const jobApplicationsRouter = require("./controllers/jobApplicationsController");

// TODO: Add application-wide middleware
app.use(cors());
// user stories 4
app.use(express.json());

// TODO: Add controller(s)
// 3rd comment implement fix: create an instance of an express router
app.use("/", jobApplicationsRouter);

// TODO: Implement health check route
//user stories 1
app.get("/health", (req, res) => {
  res.status(200).json({ data: "API is up and running" });
});

module.exports = app;
