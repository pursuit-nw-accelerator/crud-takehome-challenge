const { Router } = require("express");
const { idCheck, applicationExist } = require("../middleware/middleware");
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

module.exports = applicationController;
