const temp = ["company", "status", "url"];
const applicationStatuses = require("./constants");
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (Number.isInteger(+id) && +id > -1) {
    next();
  } else {
    res.status(400).json({ error: "Invalid id requires integer" });
  }
};

module.exports = {
  validateId,
};
