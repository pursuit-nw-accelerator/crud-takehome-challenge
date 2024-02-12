const validateFields = (req, res, next) => {
  if (req.body.company && req.body.status) {
    next();
  } else {
    res.status(400).json({
      error:
        "You are missing required fields. Please make sure you have: company and status",
    });
  }
};

module.exports = { validateFields };
