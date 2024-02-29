const validateNoAdditionalFields = (req, res, next) => {
  const allowedFields = ["company", "url", "status"];

  const reqBodyKeys = Object.keys(req.body);

  const invalidFields = reqBodyKeys.filter(
    (key) => !allowedFields.includes(key) && req.body[key] !== undefined
  );

  if (invalidFields.length === 0) {
    next();
  } else {
    res.status(400).json({
      error: `Additional fields are not allowed: ${invalidFields.join(", ")}`,
    });
  }
};

const validateRequiredFields = (req, res, next) => {
  if (req.body.company && req.body.status) {
    next();
  } else {
    res.status(400).json({
      error:
        "You are missing required fields. Please make sure you have: company and status",
    });
  }
};

module.exports = { validateNoAdditionalFields, validateRequiredFields };
