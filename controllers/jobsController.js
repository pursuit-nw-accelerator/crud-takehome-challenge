// Why do we need to add router from express?
const { Router } = require("express");
const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
} = require("../queries/jobApplicationsQueries");
const {
    validateId,
    validateJob,
} = require("../validations/checkJobs")
const jobsController = Router();

//Get All job applications
jobsController.get('/', async(req, res) => {
    try {
        const jobs = await getAllApplications()
        res.status(200)
            .json({ data: jobs });
    } catch (err) {
        res.status(500)
            .json({ error: err.message });
    }
})
//Get a job application by id
jobsController.get('/:id', validateId, async(req, res) => {
    try {
        const { id } = req.params
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
        res
            .status(500)
            .json({ error: err.message });
    }
})
//Create a job application
jobsController.post('/', validateJob, async(req, res) => {
    try {
        const job = await createApplication(req.body)
        if (job) {
            res
                .status(200).json({ data: job });
        } else {
            return res
                .status(404)
                .json({ error: `Job Application could not be created` });
          }
    } catch (err) {
        res
            .status(500)
            .json({ error: err.message });
    }
})
//Update a job application by id
jobsController.put('/:id', validateId, validateJob, async(req, res) => {
    try {
        const { id } = req.params
        const job = await updateApplication(Number(id), req.body)
        if (job) {
            res
                .status(200).json({ data: job });
        } else {
            return res
                .status(404)
                .json({ error: `Job Application could not be updated` });
          }
    } catch (error) {
        
    }
})
//Delete a job application by id
jobsController.delete('/:id', validateId, async(req, res) => {
    try {
        const { id } = req.params
        const job = await deleteApplication(Number(id))
        if (job) {
            res
                .status(200).json({ data: job });
        } else {
            return res
                .status(404)
                .json({ error: `Job Application could not be deleted` });
          }
    } catch (error) {
        
    }
})

module.exports = jobsController;