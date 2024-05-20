const applicationStatuses = require("../constants");

const validateApplication = (application) => {
  const requiredFields = ["company", "status"];
  const optionalFields = ["url"];

  // Ensure that required fields are not null
  for (const field of requiredFields) {
    if (!(field in application)) {
      return { valid: false, error: `Missing ${field} field.` };
    }
  }

  // Ensure the status is one of the allowed statuses
  if (!Object.values(applicationStatuses).includes(application.status)) {
    return { valid: false, error: `Invalid status value.` };
  }

  // Set optional fields to null if not provided
  for (const field of optionalFields) {
    if (!application[field]) {
      application[field] = null;
    }
  }

  // Ensure there are no additional fields present
  const allFields = [...requiredFields, ...optionalFields];
  const extraFields = Object.keys(application).filter(
    (field) => !allFields.includes(field)
  );

  if (extraFields.length > 0) {
    return {
      valid: false,
      error: `Unexpected field(s) added: ${extraFields.join(", ")}.`,
    };
  }

  return { valid: true };
};

module.exports = {
  validateApplication,
};
