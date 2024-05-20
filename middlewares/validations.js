const applicationStatuses = require('../constants');

const validateApplication = (req, res, next) => {
    const { company, status, url } = req.body;
    if (!company || !status) {
        return res.status(400).json({ error: "Company and status are required." });
    }
    if (!Object.values(applicationStatuses).includes(status)) {
        return res.status(400).json({ error: `Status must be one of: ${Object.values(applicationStatuses).join(", ")}` });
    }
    if (url && typeof url !== 'string') {
        return res.status(400).json({ error: "URL must be a string." });
    }
    next();
};

const validateId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    next();
};

module.exports = { validateApplication, validateId };
