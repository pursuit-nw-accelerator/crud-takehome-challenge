const express = require("express");

const jobAppController = express.Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

const { validateId, validateData, validatePutData } = require("../middleware");

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

jobAppController.put(
  "/:id",
  validateId,
  validatePutData,
  async (request, response) => {
    const { id } = request.params;
    try {
      const appData = request.body;
      const updatedJob = await updateApplication(+id, appData);
      response.status(200).json({ data: updatedJob });
    } catch (error) {
      response.status(500).json({
        error: "rettempt with correct application id and correct fields",
      });
    }
  },
);

jobAppController.delete("/:id", validateId, async (request, response) => {
  const { id } = request.params;
  try {
    const deletedApp = await deleteApplication(+id);
    response.status(200).json({ data: deletedApp });
  } catch (error) {
    response.status(500).json({ error: "reattempt with correct id" });
  }
});

module.exports = jobAppController;
