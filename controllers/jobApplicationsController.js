// 3rd comment implement: create an instance of an express router
const express = require("express");
const router = express.Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

// Middleware to validate the request body
const validateApplication = (req, res, next) => {
  const requiredFields = ["company", "status", "createdAt"];
  for (let field of requiredFields) {
    if (req.body[field] == null) {
      return res.status(400).json({ error: `Missing field: ${field}` });
    }
  }
  next();
};

// user stories 2
//GET /applications
const getApplications = async (req, res) => {
  try {
    const applications = await getAllApplications();
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// user stories 3
//GET /applications/:id
const getApplication = async (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);
  if (!Number.isInteger(parsedId) || String(parsedId) !== id || parsedId < 1) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const application = await getApplicationById(parsedId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json({ data: application });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// user stories 4
//POST /applications
const createNewApplication = async (req, res) => {
  try {
    const newApplication = req.body;
    const application = await createApplication(newApplication);
    res.status(201).json({ data: application });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// user storues 5
//PUT /applications/:id
const updateExistingApplication = async (req, res) => {
  // validate ID
  const { id } = req.params;
  const parsedId = parseInt(id, 10);
  if (!Number.isInteger(parsedId) || String(parsedId) !== id || parsedId < 1) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    //check for updated id, and if id not exist then return error massage
    const applicationExists = await getApplicationById(parsedId);
    if (!applicationExists) {
      return res.status(404).json({ error: "Application not found" });
    }
    const updateData = req.body;
    const updatedApplication = await updateApplication(parsedId, updateData);
    res.status(200).json({ data: updatedApplication });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// user stories 6
// DELETE /applications/:id
const deleteExistingApplication = async (req, res) => {
  // validate ID
  const { id } = req.params;
  const parsedId = parseInt(id, 10);
  if (!Number.isInteger(parsedId) || String(parsedId) !== id || parsedId < 1) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const result = await deleteApplication(parsedId);
    if (!result) {
      return res.status(404).json({ error: "Application not found" });
    }
    // res.status(204).end();
    // 1st and 2nd comment implement : Modify the deleteExistingApplication function to return the deleted record in the response. Also addresses requirement by returning a 200 status code with the deleted data.
    res.status(200).json({ data: result }); // instead of res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 3rd comment implement: create an instance of an express router
router.get("/applications", getApplications);
router.get("/applications/:id", getApplication);
router.post("/applications", validateApplication, createNewApplication);
router.put("/applications/:id", validateApplication, updateExistingApplication);
router.delete("/applications/:id", deleteExistingApplication);

module.exports = router;
