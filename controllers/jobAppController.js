const express = require("express");

const jobAppController = express.Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

const { validateId, validateData } = require("../middleware");

jobAppController.get("/", async (request, response) => {
  try {
    const jobs = await getAllApplications();
    response.status(200).json({ data: jobs });
  } catch (error) {
    response.status(500).json({ error: "json server down" });
  }
});

jobAppController.get("/:id", validateId, async (request, response) => {
  const { id } = request.params;
  try {
    const job = await getApplicationById(+id);
    response.status(200).json({ data: job || `id of ${id} not found` });
  } catch (error) {
    response.status(500).json({ error: "json server error" });
  }
});

jobAppController.post("/", validateData, async (request, response) => {
  const jobapp = request.body;
  try {
    const createdApp = await createApplication(jobapp);
    response.status(201).json({ data: createdApp });
  } catch (error) {
    response.status(500).json({ error: "Create resource error" });
  }
});

module.exports = jobAppController;
