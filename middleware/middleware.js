const { getApplicationById } = require("../queries/jobApplicationsQueries");
const applicationStatuses = require("../constants.js");


const JOB_APP_FIELDS = [
    "company",
    "url",
    "status",
];

const validateIdMiddleware = (request, response, next) => {
    // If id  !valid, return 400 and stop
    const { id } = request.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return response
            .status(400)
            .json({ error: `The id must be a positive integer; received ${id}` });
    } else {
        // Else "annotate" request with parsed id as number and call next
        request.id = Number(id);
        next();
    }
};

const validateJobAppMiddleware = (request, response, next) => {
    const jobApplication = request.body;


    if (
        !jobApplication.hasOwnProperty("status") ||
        !Object.values(applicationStatuses).includes(jobApplication["status"])
    ) {
        return response.status(400).json({
            error: `Invalid status. Allowed values: ${Object.values(applicationStatuses).join(", ")}`,
        });
    }

    // Set the url field to null if it's an empty string or null
    if (jobApplication.url === "") {
        jobApplication.url = null;
    }


    // Each of JOB_APP_FIELDS must be present and must be a string and not an empty string.
    for (const field of JOB_APP_FIELDS) {
        // Skip the "url" field for JOB_APP_FIELDS check
        if (field === "url") {
            continue;
        }


        // return false if field is not a key in jobApplications, or if the value is not a string
        if (!jobApplication.hasOwnProperty(field) || typeof jobApplication[field] !== "string" || jobApplication[field].trim() === "") {
            return response.status(400).json({
                error: `Field ${field} is not present or wrong type, received ${jobApplication[field]}`,
            });
        }
    }

    // The jobApplications cannot have any extra fields NOT in JOB_APP_FIELDS
    // (Example: cannot have an extra "admin" field)
    for (const field in jobApplication) {
        if (!JOB_APP_FIELDS.includes(field)) {
            return response.status(400).json({ error: `Field ${field} not allowed` });
        }
    }

    request.jobApplication = jobApplication;
    next();
};



const validatejobAppExistsMiddleware = async (request, response, next) => {
    const { id } = request; // assumes this is called AFTER validateIdMiddleware
    const jobApplications = await getApplicationById(id);
    if (!jobApplications) {
        return response
            .status(404)
            .json({ error: `Cannot find jobApplication with id ${id}` });
    }
    request.jobApplications = jobApplications;
    next();
};

module.exports = {
    validateIdMiddleware,
    validateJobAppMiddleware,
    validatejobAppExistsMiddleware,
};







