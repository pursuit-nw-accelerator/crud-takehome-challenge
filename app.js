const express = require('express');
const cors = require('cors');
const { validateApplication, validateId } = require('./middlewares/validations');
const {
    getAll,
    getById,
    create,
    update,
    remove
} = require('./controllers/jobApplicationsController');


// TODO: Add application-wide middleware
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Add controller(s)
app.get('/applications', getAll);
app.get('/applications/:id', validateId, getById);
app.post('/applications', validateApplication, create);
app.put('/applications/:id', validateId, validateApplication, update);
app.delete('/applications/:id', validateId, remove);

// TODO: Implement health check route
app.get('/', (req, res) => {
    res.status(200).json({ data: "Service is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
