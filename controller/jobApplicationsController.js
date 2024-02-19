const express = require('express');
const router = express.Router();
const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} = require('../queries/jobApplicationsQueries');

// Route to get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await getAllApplications();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get an application by ID
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const application = await getApplicationById(id);
        if (!application) {
            res.status(404).json({ message: 'Job not found' });
        } else {
            res.json(application);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to create a new application
router.post('/', async (req, res) => {
    try {
        const newApplication = await createApplication(req.body);
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update an application by ID
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedApplication = await updateApplication(id, req.body);
        if (!updatedApplication) {
            res.status(404).json({ message: 'Job not found' });
        } else {
            res.json(updatedApplication);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete an application by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedApplication = await deleteApplication(id);
        if (!deletedApplication) {
            res.status(404).json({ message: 'Job not found' });
        } else {
            res.json(deletedApplication);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
