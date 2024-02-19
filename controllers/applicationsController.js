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

  if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const application = await getApplicationById(Number(id));
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json({ data: application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create new application
applicationsController.post("/", async (req, res) => {
  const { company, status, url } = req.body;

  // validate company and status
  if (!company || !status) {
    return res.status(400).json({ error: "Company and status are required fields" });
  }

  // validate status 
  const validStatuses = ["APPLIED", "CREATED", "PHONE_SCREEN", "ON_SITE", "REJECTED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  // validate URL
  if (url && typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // validate fields 
  const allowedFields = ["company", "status", "url"];
  const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: `Unexpected fields: ${extraFields.join(", ")}` });
  }

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

  if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "Invalid id. Must be a positive integer" });
  }

  const { company, status, url } = req.body;

  // validate company and status presence
  if (!company || !status) {
    return res.status(400).json({ error: "Company and status are required fields" });
  }

  // validate status 
  const validStatuses = ["APPLIED", "CREATED", "PHONE_SCREEN", "ON_SITE", "REJECTED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  // validate URL 
  if (url && typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // validate fields 
  const allowedFields = ["company", "status", "url"];
  const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: `Unexpected fields: ${extraFields.join(", ")}` });
  }

  try {
    const updatedApplication = await updateApplication(Number(id), req.body);
    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json({ data: updatedApplication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete application
applicationsController.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "Invalid id. Must be a positive integer" });
  }

  try {
    const deletedApplication = await deleteApplication(Number(id));
    if (!deletedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json({ data: deletedApplication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = applicationsController;
