// Why do we need to add router from express?
const { Router } = require("express");
const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
} = require("../queries/jobApplicationsQueries");

const jobsController = Router();

jobsController.get('/', async(req, res) => {
    try {
        const jobs = await getAllApplications()
        res.status(200).json({ data: jobs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = jobsController;