const constants = require('../constants');
///////////////////////////////////////////////
const returnError = (message) => {
  return { error: message };
}

const newJobApplication = (req, res, next) => {
  let { company, status, url } = req.body;
  const bodyTemplate = { company: true, status: true, url: true };

  for (let key in req.body) if (bodyTemplate[key] === undefined) {
    res.status(400).json(returnError("request only accept company, status, url as key name."));
    return;
  }

  if (status === undefined || constants[status] === undefined) {
    res.status(400).json(returnError("status not vaild."));
    return;
  }

  if (company === undefined || company.length < 1 || company.length > 100) {
    res.status(400).json(returnError("company not vaild."));
    return;
  }

  if (url === undefined) url = null;
  req.vaildBody = { company, status, url };
  next();
}

const queryId = (req, res, next) => {
  let { id } = req.params;

  if (!Number.isInteger(Number(id)) || id < 0) {
    res.status(400).json(returnError("id not vaild."));
    return;
  }
  req.vaildId = Number(id);
  next();
}
///////////////////////////////////////////////
module.exports = { newJobApplication, queryId }