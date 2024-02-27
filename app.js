const express = require("express");
const cors = require("cors");
const app = express();
const applicationController = require("./controllers/applicationController");
// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json());

// TODO: Add controller(s)
app.use(`/applications`, applicationController);
// TODO: Implement health check route
app.get("/", (req, res) => {
  res.status(200).json({ data: `Service is running` });
});
module.exports = app;
