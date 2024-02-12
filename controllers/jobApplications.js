const express = require("express");
const jobApplications = express.Router();
const { getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication, } = require('../queries/jobApplicationsQueries');
const { newJobApplication, queryId } = require('../validations/jobApplication');
/////////////////////////////////////////////////////////

jobApplications.get('/', async (req, res) => {
  //get all applications
  await req.generalProcedure(req, res, async () => {

    let ret = await getAllApplications();
    ret.filter(el => el.deleted !== 1);
    if (ret.length === 0) throw new Error("no application found.", { cause: 404 });
    res.json({ data: ret });
  });
});

jobApplications.get('/:id', queryId, async (req, res) => {
  //get one application by id
  await req.generalProcedure(req, res, async () => {
    let ret = await getApplicationById(req.vaildId);
    if (!ret || ret.deleted === 1) throw new Error("application id not found.", { cause: 404 });
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
