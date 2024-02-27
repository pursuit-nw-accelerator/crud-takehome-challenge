const { Router } = require("express");
const {
  idCheck,
  applicationExist,
  validKeys,
  missingKeys,
  validStatus,
} = require("../middleware/middleware");
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");
const app = require("../app");

const applicationController = Router();

applicationController.get("/", async (req, res) => {
  try {
    const applications = await getAllApplications();
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

applicationController.get(
  "/:id",
  idCheck,
  applicationExist,
  async (req, res) => {
    try {
      const { id } = req.params;
      const application = await getApplicationById(Number(id));
      if (application) {
        res.status(200).json({ data: application });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

applicationController.delete(
  "/:id",
  idCheck,
  applicationExist,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedApplication = await deleteApplication(Number(id));
      if (deletedApplication) {
        res.status(200).json({ data: deletedApplication });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

applicationController.post(
  "/",
  missingKeys,
  validKeys,
  validStatus,
  async (req, res) => {
    try {
      const userInputData = req.body;
      const newApplication = await createApplication({
        ...userInputData,
        url: userInputData.url ? userInputData["url"] : null,
      });
      if (newApplication) {
        res.status(201).json({ data: newApplication });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

applicationController.put(
  "/:id",
  idCheck,
  missingKeys,
  validKeys,
  validStatus,
  applicationExist,
  async (req, res) => {
    try {
      const { id } = req.params;
      const application = req.body;

      const updatedApplication = await updateApplication(
        Number(id),
        application
      );
      if (application) {
        res.status(200).json({ data: updatedApplication });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = applicationController;
