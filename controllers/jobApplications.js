const express = require("express");
const jobApplications = express.Router();
const { getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication, } = require('../queries/jobApplicationsQueries');
/////////////////////////////////////////////////////////


jobApplications.get('/', async (req, res) => {
  await req.generalProcedure(req, res, () => {

  });
});

jobApplications.post('/', async (req, res) => {
  await req.generalProcedure(req, res, async () => {
    await createApplication();
  });
});

/////////////////////////////////////////////////////////
module.exports = jobApplications;
