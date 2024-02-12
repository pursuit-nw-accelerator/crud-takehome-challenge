const temp = ["company", "status", "url"];
const applicationStatuses = require("./constants");

function isValidDateString(str) {
  const date = new Date(str);
  return date.toString() !== "Invalid Date" && !isNaN(date.getTime());
}

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (Number.isInteger(+id) && +id > -1) {
    next();
  } else {
    res.status(400).json({ error: "Invalid id requires integer" });
  }
};

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
  let tempmod = [...temp];
  tempmod.splice(1, 0, "createdAt");
  let keys = Object.keys(req.body);
  let values = Object.values(req.body);
  keys.sort();
  let dateCheck =
    req.body.hasOwnProperty("createdAt") &&
    isValidDateString(req.body.createdAt);
  let checkStatus =
    req.body.hasOwnProperty("status") && isValidStatus(req.body.status);
  let checkUrl = isValidUrl(req.body?.url);
  if (!req.body.hasOwnProperty("url") || req.body?.url === null) {
    checkUrl = true;
  }
  if (!req.body.hasOwnProperty("createdAt")) {
    dateCheck = true;
  }
  if (!req.body.hasOwnProperty("status")) {
    checkStatus = true;
  }
  if (!dateCheck || !checkStatus || !checkUrl) {
    res.status(400).json({
      error:
        `Invalid ${!dateCheck ? "date string" : ""} ${!checkStatus ? "job search status" : ""} ${!checkUrl ? "url String" : ""}`.trim(),
    });
  } else {
    const bool =
      values.every((value) => typeof value === "string") &&
      keys.every((item) => tempmod.includes(item));
    if (!bool) {
      res.status(400).json({
        error: "update createdAt company status or url with strings",
      });
    } else {
      next();
    }
  }
};

module.exports = {
  validateId,
  validateData,
  validatePutData,
};
