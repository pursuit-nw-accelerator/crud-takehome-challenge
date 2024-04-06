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
    if (!Array.isArray(ret)) throw new Error("no application found.", { cause: 500 });
    res.json({ data: ret });
  });
});

jobApplications.get('/:id', queryId, async (req, res) => {
  //get one application by id
  await req.generalProcedure(req, res, async () => {

    const applicationExist = await getApplicationById(req.vaildId);
    if (applicationExist === undefined) throw new Error(`application id: ${req.vaildId} not found.`, { cause: 404 });

    res.json({ data: applicationExist });
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

jobApplications.patch('/:id', queryId, newJobApplication, async (req, res) => {
  //edit application
  await req.generalProcedure(req, res, async () => {

    const applicationExist = await getApplicationById(req.vaildId);
    if (applicationExist === undefined) throw new Error(`application id: ${req.vaildId} not found.`, { cause: 404 });

    const ret = await updateApplication(req.vaildId, req.vaildBody);
    if (!ret) throw new Error("Db query return empty.");

    res.json({ data: ret });
  });
});

jobApplications.delete('/:id', queryId, async (req, res) => {
  //delete application
  await req.generalProcedure(req, res, async () => {

    const applicationExist = await getApplicationById(req.vaildId);
    if (applicationExist === undefined) throw new Error(`application id: ${req.vaildId} not found.`, { cause: 404 });

    const ret = await deleteApplication(req.vaildId);

    res.json({ data: ret });
  });
});
/////////////////////////////////////////////////////////
module.exports = jobApplications;
