const applicationStatus = require("../constants");

const validKeys = (app) => {
  const appKeys = ["company", "url", "status"];
  for (let key in app) {
    if (!appKeys.includes(key)) {
      return false;
    }
  }
  return true;
}

const checkKeys = (req, res, next) => {
  if (validKeys(req.body)) {
    next();
  }
  else {
    res.status(400).json({ error: "Invalid data!" });
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
    res.status(400).json({ error: "Status is not valid!" });
  }
  else {
    res.status(400).json({ error: "Status is required!" });
  }
};

module.exports = {checkKeys, checkCompany, checkStatus};
