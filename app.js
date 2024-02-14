const express = require('express');
const cors = require('cors');

const app = express();

// TODO: Add application-wide middleware
app.use(cors());

// TODO: Add controller(s)

// TODO: Implement health check route
app.get('/',(res, rep) =>{
    rep.status(200).json({ data: 'Service Live'});
})
module.exports = app;
