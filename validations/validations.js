const applicationStatuses = require("../constants");

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

const JOB_FIELDS = ["company", "status"];

const validateJob = (job, res) => {
  for (const field of JOB_FIELDS) {
    if (!job.hasOwnProperty(field)) {
      res.status(400).json({
        error: `Field '${field}' is missing`,
      });
      return false;
    }
    if (typeof job[field] !== "string") {
      res.status(400).json({
        error: `Field '${field}' must be a string, received: a ${typeof job[
          field
        ]}, ${job[field]}`,
      });
      return false;
    }
  }

  if (!applicationStatuses[job["status"].toUpperCase()]) {
    res.status(400).json({
      error: `Status must be 'CREATED', 'APPLIED', 'REJECTED', 'PHONE_SCREEN,' 'ON_SITE', 'RECEIVED_OFFER', 'OFFER_ACCEPTED', or 'OFFER_DECLINED', received: ${job["status"]}`,
    });
    return;
  }

  for (const field in job) {
    if (!JOB_FIELDS.includes(field) && field !== "url") {
      res.status(400).json({ error: `${field} field not allowed for job` });
      return false;
    }
  }

  return true;
};

module.exports = { validateId, validateJob };
