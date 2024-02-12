const constants = require('../constants');
///////////////////////////////////////////////
const newJobApplication = (req, res, next) => {
  let { company, status, url } = req.body;
  if (status === undefined || constants[status] === undefined) {
    res.status(400).json({ "error": "status not vaild." });
    return;
  }

  if (company === undefined || company.length < 1 || company.length > 100) {
    res.status(400).json({ "error": "company not vaild." });
    return;
  }

  if (url === undefined) url = null;
  req.vaildBody = { company, status, url };
  next();
}

///////////////////////////////////////////////
module.exports = { newJobApplication }