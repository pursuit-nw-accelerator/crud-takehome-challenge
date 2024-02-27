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
    response.status(500).send("Internal Server Error");
  }
});

jobAppController.get("/:id", validateId, async (request, response) => {
  const { id } = request.params;
  try {
    const job = await getApplicationById(+id);
    if (job) {
      response.status(200).json({ data: job });
    } else {
      response.status(404).json({ error: `No application found for id ${id}` });
    }
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
});

jobAppController.post("/", validateData, async (request, response) => {
  const jobapp = request.body;
  try {
    const createdApp = await createApplication(jobapp);
    response.status(201).json({ data: createdApp });
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
});

jobAppController.put(
  "/:id",
  validateId,
  validatePutData,
  async (request, response) => {
    const { id } = request.params;
    try {
      const lookup = await getApplicationById(+id);
      if (!lookup) {
        response
          .status(404)
          .json({ error: `Unable to update id: ${id} not found` });
      } else {
        const appData = request.body;
        const updatedJob = await updateApplication(+id, appData);
        response.status(200).json({ data: updatedJob });
      }
    } catch (error) {
      response.status(500).send("Internal Server Error");
    }
  },
);

jobAppController.delete("/:id", validateId, async (request, response) => {
  const { id } = request.params;
  try {
    const deletedApp = await deleteApplication(+id);
    if (deletedApp) {
      response.status(200).json({ data: deletedApp });
    } else {
      response.status(404).json({ error: `No application found for id ${id}` });
    }
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
});

module.exports = jobAppController;
