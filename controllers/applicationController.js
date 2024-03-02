const { Router } = require("express");
const items = Router();
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication
} = require("../queries/jobApplicationsQueries");
const {
  checkKeys,
  checkCompany,
  checkStatus
} = require("../validations/checkApplication");

// Get All
items.get('/', async(req, res) => {
  try {
    const applications = await getAllApplications();
    res.status(200).json({ data: applications});
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One
items.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({ error: `id ${id} is not valid` });
  }

  try {
    const application = await getApplicationById(Number(id));
    if (application) {
      res.status(200).json({ data: application });
    }
    else {
      res.status(404).json({ error: `Application with id ${id} not found` });
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add New
items.post("/", checkKeys, checkCompany, checkStatus, async (req, res) => {
  try {
    const application = await createApplication(req.body);
    if (!application.url) {
      application.url = null;
    }
    res.status(201).json({ data: application });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
items.put("/:id", checkKeys, checkCompany, checkStatus, async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({ error: `id ${id} is not valid` });
  }

  try {
    const search = await getApplicationById(Number(id));
    if (!search) {
      res.status(404).json({ error: `Application with id ${id} not found` });
    }
    else {
      const application = await updateApplication(Number(id), req.body);
      res.status(200).json({ data: application });
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
items.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({ error: `id ${id} is not valid` });
  }
  
  try {
    const search = await getApplicationById(Number(id));
    if (!search) {
      res.status(404).json({ error: `Application with id ${id} not found` });
    }
    else {
      const application = await deleteApplication(Number(id));
      res.status(200).json({ data: application });
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = items;
