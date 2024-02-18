const { Router } = require("express");

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

const { validateId, validateJob } = require("../validations/validations");

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

jobsController.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = req.body;

    if (!validateId(id, res)) {
      return;
    }

    job["url"] = job["url"]?.trim() || null;

    if (!validateJob(job, res)) {
      return;
    }

    job["status"] = job["status"].toUpperCase();

    const jobToUpdate = await getApplicationById(Number(id));

    if (!jobToUpdate) {
      return res.status(404).json({ error: `No job found with id: ${id}` });
    }

    const updatedJob = await updateApplication(Number(id), job);
    res.status(200).json({ data: updatedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

jobsController.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateId(id, res)) {
      return;
    }

    const jobToDelete = await getApplicationById(Number(id));

    if (!jobToDelete) {
      return res.status(404).json({ error: `No job found with id: ${id}` });
    }

    const deletedJob = await deleteApplication(Number(id));
    res.status(200).json({ data: deletedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = jobsController;
