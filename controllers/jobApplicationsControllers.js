const express = require("express");
const controller = express();
controller.use(express.json());

const queries = require("../queries/jobApplicationsQueries");
const validations = require("../validations/jobApplicationsValidations");

// GET ALL
controller.get("/applications", async (req, res) => {
  try {
    const applications = await queries.getAllApplications();
    res.status(200).send({ data: applications });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET BY ID
controller.get("/applications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const application = await queries.getApplicationById(Number(id));
    if (application) res.status(200).send({ data: application });
    else
      res
        .status(404)
        .send({ error: `Application with id: '${id}' was not found.` });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// CREATE
controller.post("/applications", async (req, res) => {
  const application = req.body;
  try {
    const validation = validations.validateKeys(application);
    if (validation.error) {
      res.status(500).send({ error: validation.error });
    } else {
      const newApplication = await queries.createApplication(validation);
      res.status(200).send({ data: newApplication });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE
controller.put("/applications/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const validation = validations.validateKeys(update);
    if (validation.error) {
      res.status(500).send(validation.error);
    } else {
      const updatedApplication = await queries.updateApplication(
        Number(id),
        validation
      );
      res.status(200).send({ data: updatedApplication });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE
controller.delete("/applications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedApplication = await queries.deleteApplication(Number(id));
    res.status(200).send({ data: deletedApplication });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = controller;
