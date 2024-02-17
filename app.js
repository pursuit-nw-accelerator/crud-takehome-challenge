const express = require('express');
const cors = require('cors')

const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json())

// TODO: Add controller(s)

// TODO: Implement health check route

app.get('/', (req, res) => {
    res.status(200).json({message: "Server working!"})
})

app.get('*', (req, res) => {
    res.status(404).json({message: `path name ${req.url} does not exist`})
})

module.exports = app;
