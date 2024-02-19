const  {getApplicationById } = require("../queries/jobApplicationsQueries");

const JOB_APP_FIELDS = [
    "company",
    "status",
];

const validateIdMiddleware = (request, response, next) => {
    // If id  !valid, return 400 and stop
    const { id } = request.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      return response
        .status(400)
        .json({ error: `The id must be a positive integer; received ${id}` });
    } else {
      // Else "annotate" request with parsed id as number and call next
      request.id = Number(id);
      next();
    }
  };

  const validateJobAppMiddleware = (request, response, next) => {
    const jobApplications = request.body;
    // Each of JOB_APP_FIELDS must be present and must be a string and not empty string.
    for (const field of JOB_APP_FIELDS) {
      // return false if field is not a key in jobApplications, or if the value is not a string
      if (!jobApplications.hasOwnProperty(field) || typeof jobApplications[field] !== "string" || jobApplications[field].trim() === "") {
        return response.status(400).json({
          error: `Field ${field} is not present or wrong type, received ${jobApplications[field]}`,
        });
      }
    }

  // The jobApplications cannot have any extra fields NOT in JOB_APP_FIELDS
  // (Example: cannot have an extra "admin" field)
  for (const field in jobApplications) {
    if (!JOB_APP_FIELDS.includes(field)) {
      return response.status(400).json({ error: `Field ${field} not allowed` });
    }
  }
  request.jobApplications = jobApplications;
  next();
};


const validatejobAppExistsMiddleware = async (request, response, next) => {
    const { id } = request; // assumes this is called AFTER validateIdMiddleware
    const jobApplications = await getApplicationById(id);
    if (!jobApplications) {
      return response
        .status(404)
        .json({ error: `Cannot find jobApplication with id ${id}` });
    }
    request.jobApplications = jobApplications;
    next();
  };
  
  module.exports = {
    validateIdMiddleware,
    validateJobAppMiddleware,
    validatejobAppExistsMiddleware,
  };







