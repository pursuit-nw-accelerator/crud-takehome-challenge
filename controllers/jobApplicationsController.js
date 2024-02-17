// user stories 2
const { getAllApplications } = require("../queries/jobApplicationsQueries");
const getApplications = async (req, res) => {
  const applications = await getAllApplications();
  res.status(200).json({ data: applications });
};

// user stories 3
const { getApplicationById } = require("../queries/jobApplicationsQueries");
const getApplication = async (req, res) => {
  const { id } = req.params;
  const application = await getApplicationById(parseInt(id, 10));
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }
  res.status(200).json({ data: application });
};

// user stories 4
const { createApplication } = require("../queries/jobApplicationsQueries");
const createNewApplication = async (req, res) => {
  const newApplication = req.body;
  const application = await createApplication(newApplication);
  res.status(201).json({ data: application });
};

// user storues 5
const { updateApplication } = require("../queries/jobApplicationsQueries");
const updateExistingApplication = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedApplication = await updateApplication(
    parseInt(id, 10),
    updateData
  );
  if (!updatedApplication) {
    return res.status(404).json({ error: "Application not found" });
  }
  res.status(200).json({ data: updatedApplication });
};

// user stories 6
const { deleteApplication } = require("../queries/jobApplicationsQueries");
const deleteExistingApplication = async (req, res) => {
  const { id } = req.params;
  const result = await deleteApplication(parseInt(id, 10));
  if (!result) {
    return res.status(404).json({ error: "Application not found" });
  }
  res.status(204).end();
};

module.exports = {
  getApplications,
  getApplication,
  createNewApplication,
  updateExistingApplication,
  deleteExistingApplication,
};
