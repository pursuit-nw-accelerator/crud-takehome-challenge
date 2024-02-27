const temp = ["company", "status", "url"];
const applicationStatuses = require("./constants");

function isValidDateString(str) {
  const date = new Date(str);
  return date.toString() !== "Invalid Date" && !isNaN(date.getTime());
}

function isValidStatus(str) {
  if (typeof str != "string") {
    return false;
  }
  if (!Object.values(applicationStatuses).includes(str)) {
    return false;
  }
  return true;
}

function isValidUrl(url) {
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)*[\w-]+(:\d+)?(\/\S*)?$/i;
  return urlPattern.test(url);
}

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (Number.isInteger(+id) && +id > -1) {
    next();
  } else {
    res.status(400).json({ error: "Invalid id requires integer" });
  }
};

const validateData = (req, res, next) => {
  if (!req.body.hasOwnProperty("url")) {
    req.body.url = "null";
  }
  let keys = Object.keys(req.body);
  let values = Object.values(req.body);

  keys.sort();
  const checkStatus =
    req.body.hasOwnProperty("status") && isValidStatus(req.body.status);
  let checkUrl = isValidUrl(req.body?.url);
  if (!req.body.hasOwnProperty("url") || req.body?.url === null)
    checkUrl = true;
  if (!checkStatus || !checkUrl) {
    res.status(400).json({
      error:
        `Invalid ${!checkStatus ? "status" : ""} ${!checkUrl ? "url string" : ""}`.trim(),
    });
  } else {
    const bool =
      JSON.stringify(keys) === JSON.stringify(temp) &&
      values.every((value) => typeof value === "string");
    if (!bool) {
      res.status(400).json({
        error: "new data requires company status and url to be a string",
      });
    } else {
      next();
    }
  }
};

const validatePutData = (req, res, next) => {
  const errs = [];
  let count = 0;
  for (let [k, v] of Object.entries(req.body)) {
    if (!temp.includes(k)) {
      errs.push(`invalid key in body: ${k}`);
    }
    if (k == "url" && typeof v != "string") {
      v !== null && errs.push(`invalid url type need string`);
    }
    if (k == "company" && typeof v != "string") {
      errs.push("invalid company need string");
    }
    if (k == "company" && typeof v == "string" && v.length < 1) {
      errs.push("empty company string");
    }
    if (k == "status" && !Object.values(applicationStatuses).includes(v)) {
      errs.push(`invalid status: ${v}`);
    }
    if (k == "company" || k == "status") {
      count++;
    }
  }
  if (count < 2) {
    errs.push("company and status keys required");
  }
  if (errs.length) {
    res.status(400).json({
      error: errs.join(", "),
    });
  } else {
    if (!req.body.hasOwnProperty("url")) {
      req.body.url = null;
    }
    next();
  }
};

module.exports = {
  validateId,
  validateData,
  validatePutData,
};
