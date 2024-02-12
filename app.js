require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();

// TODO: Add application-wide middleware

app.use(cors({ credentials: true, origin: true }));

app.use(express.json({ type: "application/json", limit: "1mb" }));
app.use((req, res, next) => {
  try {
    req.generalProcedure = async function (req, res, fn, error_callback) {
      try {
        await fn();
      } catch (error) {
        console.error(error);
        const code = error.cause || 500;
        res.status(code).json({ error: (error || 500) });
        if (error_callback) error_callback();
      }
    };

    next();
  } catch (error) {
    logError(error);
  }
});
// TODO: Add controller(s)
app.use("/v1/jobApplications", require('./controllers/jobApplications'));
// TODO: Implement health check route
app.get('/', (req, res) => {
  res.send("Server is running.");
});
app.get('*', (req, res) => {
  res.status(404).send('Page not found.');
});
////////////////////////////////////////////////////
module.exports = app;
