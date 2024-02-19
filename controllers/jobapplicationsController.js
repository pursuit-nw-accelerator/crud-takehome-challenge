const express = require("express");
const jobappController = express.Router();

const {
    getAllApplications,
    // getApplicationById,
    // createApplication,
    // updateApplication,
    // deleteApplication,
} = require("../queries/jobApplicationsQueries.js");

const {
    validateIdMiddleware,
    validateJobAppMiddleware,
    validatejobAppExistsMiddleware,
} = require("../middleware/middleware.js");

// get all job applications
jobappController.get("/", async (request, response) => {
    try {
        const jobApplications = await getAllApplications();
        response.status(200).json({ data: jobApplications });
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
});

// get a specific job application
jobappController.get(
    "/:id",
    validateIdMiddleware, // Corrected middleware name
    validatejobAppExistsMiddleware, // Corrected middleware name
    async (request, response) => {
        try {
            const { jobApplications } = request;
            response.status(200).json({ data: jobApplications });
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    }
);

module.exports = jobappController; 

