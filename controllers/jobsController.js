const { Router } = require("express");

const {
  getAllApplications,
  getApplicationById,
} = require("../queries/jobApplicationsQueries");

const jobsController = Router();

const validateId = (id, res) => {
  let regex = /^[1-9]\d*$/;
  if (regex.test(id)) {
    return true;
  } else {
    res
      .status(400)
      .json({ error: `Id param must be a postive integer! Received: ${id}` });
    return false;
  }
};

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

module.exports = jobsController;
