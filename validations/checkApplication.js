const applicationStatus = require("../constants");

const validKeys = (app) => {
  const appKeys = ["company", "url", "status"];
  const invalidKeys = [];
  for (let key in app) {
    if (!appKeys.includes(key)) {
      invalidKeys.push(key);
    }
  }
  return invalidKeys;
}

const checkKeys = (req, res, next) => {
  const invalidKeys = validKeys(req.body);
  if (!invalidKeys.length) {
    next();
  }
  else {
    res.status(400).json({ error: `Following field(s) are not allowed '${invalidKeys.join(', ')}'` });
  }
};

const checkCompany = (req, res, next) => {
  if (req.body.company) {
    next();
  }
  else {
    res.status(400).json({ error: "Company name is required!" });
  }
};

const checkStatus = (req, res, next) => {
  const app = req.body;
  if (app.status && applicationStatus[app.status]) {
    next();
  }
  else if (app.status) {
    res.status(400).json({ error: `Status with value of '${app.status}' is not valid!` });
  }
  else {
    res.status(400).json({ error: "Status is required!" });
  }
};

module.exports = {checkKeys, checkCompany, checkStatus};
