const { Router } = require("express");

const jobApplications = Router();

const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
} = require("../queries/jobApplicationsQueries");
// const app = require("../app");

jobApplications.get("/", async (req, res) => {
    try {
        const application = await getAllApplications();
        res.status(200).json({ data : application })
    } catch(err) {
        res.status(500).json({err : err.message})
    }
});

module.exports = jobApplications;