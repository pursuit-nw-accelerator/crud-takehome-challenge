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
  //get all applications
  await req.generalProcedure(req, res, async () => {
    const ret = (await getAllApplications()).filter(el => el.deleted !== 1);
    res.json({ data: ret });
  });
});

jobApplications.get('/:id', async (req, res) => {
  //get one application by id
  await req.generalProcedure(req, res, async () => {
    const ret = (await getAllApplications()).filter(el => el.deleted !== 1);
    res.json({ data: ret });
  });
});

jobApplications.post('/', newJobApplication, async (req, res) => {
  //create application
  await req.generalProcedure(req, res, async () => {
    const ret = await createApplication(req.vaildBody);

    if (!ret) throw new Error("Db query return empty.");

    res.json({ data: ret });
  });
});

/////////////////////////////////////////////////////////
module.exports = jobApplications;
