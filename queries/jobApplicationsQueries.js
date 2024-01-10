/*
 * Query functions you can use to interact with
 * your application's fake "database" (in-memory JSON object)
 *
 * You should understand how these functions work and what they
 * return, but you should not have to modify them them.
 *
 * If you find that you have to modify the functions, either:
 * a) you have found a bug and you should notify your instructor ASAP
 * or
 * b) you are doing something wrong.
 */
let { jobApplications } = require('../db/data/jobApplicationsData.json');
let lastId = jobApplications.length;

const getAllApplications = async () => {
  return jobApplications;
};

const getApplicationById = async (id) => {
  return jobApplications.find((application) => application.id === id);
};

const createApplication = async (application) => {
  jobApplications.push({
    id: ++lastId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...application,
  });
  return jobApplications[jobApplications.length - 1];
};

const updateApplication = async (id, application) => {
  const idx = jobApplications.findIndex(
    (currApplication) => currApplication.id === id
  );
  jobApplications[idx] = {
    ...jobApplications[idx],
    updatedAt: new Date().toISOString(),
    ...application,
  };
  return jobApplications[idx];
};

const deleteApplication = async (id) => {
  const idx = jobApplications.findIndex(
    (currApplication) => currApplication.id === id
  );
  const deletedjobApplication = jobApplications[idx];
  jobApplications = jobApplications.filter(
    (application) => application.id !== id
  );
  return deletedjobApplication;
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};
