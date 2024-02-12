const express = require("express");
const jobApplications = express.Router();
const { getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication, } = require('../queries/jobApplicationsQueries');
const { newJobApplication } = require('../validations/jobApplication');
/////////////////////////////////////////////////////////


jobApplications.get('/', async (req, res) => {
  await req.generalProcedure(req, res, () => {

  });
});

jobApplications.post('/', newJobApplication, async (req, res) => {
  await req.generalProcedure(req, res, async () => {
    console.log(req.vaildBody);
    // await createApplication();
  });
});

/////////////////////////////////////////////////////////
module.exports = jobApplications;
