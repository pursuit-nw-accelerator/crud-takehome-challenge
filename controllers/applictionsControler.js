const { Router } = require("express");
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

const applicationsController = Router();

// get all applications
applicationsController.get("/", async (req, res) => {
  try {
    const applications = await getAllApplications();
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get one application
applicationsController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const application = await getApplicationById(Number(id));
    res.status(200).json({ data: application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create new application
applicationsController.post("/", async (req, res) => {
  try {
    const newApplication = await createApplication(req.body);
    res.status(201).json({ data: newApplication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update application
applicationsController.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedApplication = await updateApplication(Number(id), req.body);
    res.status(200).json({ data: updatedApplication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete application
applicationsController.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedApplication = await deleteApplication(Number(id));
    res.status(200).json({ data: deletedApplication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = applicationsController;
