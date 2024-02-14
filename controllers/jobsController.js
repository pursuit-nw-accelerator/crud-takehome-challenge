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

jobsController.get('/:id', async(req, res) => {
    try {
        const { id } = req.params
        //Make a validation route for below 
        if (!Number.isInteger(Number(id))) {
            // the id is not valid
            return res.status(400).json({ error: `Invalid id: ${id}` });
        }
        const job = await getApplicationById(Number(id))
        if (job) {
            res
            .status(200).json({ data: job });
        } else {
            return res
            .status(404)
            .json({ error: `Job Application doesn't exist for id ${id}` });
          }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = jobsController;