const app = require("../app");
const { getApplicationById } = require("../queries/jobApplicationsQueries");
//const { applicationStatuses } = require("../constants");

const idCheck = (req, res, next) => {
  const { id } = req.params;
  const idNum = Number(id);
  if (idNum < 0 || isNaN(idNum)) {
    return res.status(400).json({
      error: `The id you entered - ${id}, must be a number and greater than 0`,
    });
  } else {
    next();
  }
};

const applicationExist = async (req, res, next) => {
  const id = Number(req.params.id);
  const application = await getApplicationById(id);

  if (!application) {
    res
      .status(404)
      .json({ error: `An application with the id - ${id} does not exist` });
  } else {
    next();
  }
};

const appKeys = ["company", "url", "status"];
const mustKeys = ["company", "status"];

const applicationStatuses = {
  CREATED: "CREATED", // the job was added to app, but no action taken yet
  APPLIED: "APPLIED", // the user applied for the job
  REJECTED: "REJECTED", // the user was notified they didn't get the job
  PHONE_SCREEN: "PHONE_SCREEN", // the user was invited to do a phone screen
  ON_SITE: "ON_SITE", // the user was invited to an on site interview
  RECEIVED_OFFER: "RECEIVED_OFFER", // the user got a job offer
  OFFER_ACCEPTED: "OFFER_ACCEPTED", // the user accepted the offer
  OFFER_DECLINED: "OFFER_DECLINED", // the user declined the offer
};
const statusValues = Object.values(applicationStatuses);

const validKeysAndStatus = (req, res, next) => {
  const newAppData = req.body;
  const newAppDataKeys = Object.keys(newAppData);

  for (let key of newAppDataKeys) {
    if (!appKeys.includes(key)) {
      res.status(400).json({
        error: `Invalid key - ${key}.`,
      });
    } else {
      next();
    }
  }
  if (!statusValues.includes(newAppData["status"])) {
    res.status(400).json({ data: `The value for the status is not valid` });
  }
};

const missingKeys = (req, res, next) => {
  const newAppData = req.body;
  const newAppDataKeys = Object.keys(newAppData);

  for (let key of mustKeys) {
    if (!newAppDataKeys.includes(key)) {
      res.status(400).json({ error: `Missing key - ${key}` });
    } else {
      next();
    }
  }
};

module.exports = {
  idCheck,
  applicationExist,
  validKeysAndStatus,
  missingKeys,
};
