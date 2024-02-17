const { Router } = require("express");

const {
  getAllApplications,
  getApplicationById,
  createApplication,
} = require("../queries/jobApplicationsQueries");

const {validateId, validateJob} = require("../validations/validations")

const jobsController = Router();

jobsController.get("/", async (req, res) => {
  try {
    const jobs = await getAllApplications();
    res.status(200).json({ data: jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

jobsController.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateId(id, res)) {
      return;
    }

    const job = await getApplicationById(Number(id));

    if (job) {
      res.status(200).json({ data: job });
    } else {
      return res.status(404).json({ error: `No job found with id: ${id}` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

jobsController.post("/", async (req, res) => {
  try {
    const job = req.body;

    job["url"] = job["url"]?.trim() || null;

    if (!validateJob(job, res)) {
      return;
    }

    job["status"] = job["status"].toUpperCase();

    const createdJob = await createApplication(job);
    res.status(201).json({ data: createdJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = jobsController;
