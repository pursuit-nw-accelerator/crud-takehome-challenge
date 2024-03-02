//using the require function to include express and cors module
//this is how we include and use a package installed from npm in any js file
const express = require('express');
const cors = require(`cors`)

//define an instance to handle request and response from client -> server
const app = express();
//MIDDLEWARE
// TODO: Add application-wide middleware
require("dotenv").config
app.use(cors());

//CONTROLLERS
const jobsControllers = require("./controllers/jobApplicationController")
app.use("/applications", jobsControllers)

// TODO: Add controller(s)

//HEALTH CHECK ROUTE 
// app.get() is a function that tells the server what to do when a get request at the given route is called. 
//It has a callback function (req, res) that listen to the incoming request req object 
//responds accordingly using res response object. 
//Both req and res are made available to us by the Express framework.
app.get("/", (req, res) => res.status(200).json({data: `Hello World`}))
// The req object represents the HTTP request and has properties for the request query string, parameters, body, and HTTP headers. 
// The res object represents the HTTP response that an Express app sends when it gets an HTTP request. In our case, we are sending a text Hello World whenever a request is made to the route /.
module.exports = app;

/*                             WORKS CITED
https://www.freecodecamp.org/news/express-explained-with-examples-installation-routing-middleware-and-more/
*/  
