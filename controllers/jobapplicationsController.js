const express = require("express");
const jobappController = express.Router();

const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
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
    validateIdMiddleware,
    validatejobAppExistsMiddleware,
    async (request, response) => {
        try {
            const { jobApplication } = request;
            response.status(200).json({ data: jobApplication });
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    }
);

// POST / jobApplication
jobappController.post(
    "/",
    validateJobAppMiddleware,
    async (request, response) => {
      try {
        const { jobApplication } = request; // from middleware
        const newJobApplication = await createApplication(jobApplication);
        response.status(201).json({ data: newJobApplication });
      } catch (err) {
        response.status(500).json({ error: err.message });
      }
    },
);

// PUT /jobapplications/:id
jobappController.put(
    "/:id",
    validateIdMiddleware,
    validatejobAppExistsMiddleware,
    validateJobAppMiddleware,
    async (request, response) => {
      try {
        const { id, jobApplication } = request; // from middleware
        const updatedJobApplication = await updateApplication(id, jobApplication);
        response.status(200).json({ data: updatedJobApplication });
      } catch (err) {
        response.status(500).json({ error: err.message });
      }
    },
);

// DELETE /jobapplications/:id
jobappController.delete(
    "/:id",
    validateIdMiddleware,
    validatejobAppExistsMiddleware,
    async (request, response) => {
      try {
        const { id } = request; // from middleware
        const deletedJobApplication = await deleteApplication(id);
        response.status(200).json({ data: deletedJobApplication });
      } catch (err) {
        response.status(500).json({ error: err.message });
      }
    },
);

module.exports = jobappController;


