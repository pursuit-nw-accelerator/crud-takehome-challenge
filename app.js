const express = require('express');
const app = express();
const cors = require("cors");
const jobapplicationsRoutes = require("./controllers/jobapplicationsController");


// Middleware
app.use(cors());
app.use(express.json());


// Error handling middleware for JSON parsing errors for POST and PUT requests 
// so the server doesn't crash, which allows for a retry.

app.use((error, req, res, next) => {
    if ((error instanceof SyntaxError) && (req.method === 'POST' || req.method === 'PUT')) {
      // Only handle JSON parsing errors for POST and PUT requests
      res.status(400).json({ error: 'Invalid JSON format in request body' });
    } else {
      next();
    }
  });
  


app.use("/jobapplications", jobapplicationsRoutes);

// // Controllers
// app.get("/jobapplications", (req, res) => {
//     res.json( {data: "Welcome to the CRUD back end takehome challenge"})
// })


// Health check route
app.get ("/", (req, res) => {
    res.status(200).json({data: "Service is running"})
})


// No such page route
app.get ("*", (req, res) => {
    res.status(404).json({data: "Page not found"})
})


module.exports = app;
