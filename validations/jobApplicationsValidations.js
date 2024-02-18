const applicationStatuses = require("../constants");

/** Makes sure an application has all required fields, data types, and no extra fields. */
function validateKeys(application) {
  if (application.company && application.status) {
    if (!applicationStatuses[application.status]) {
      return { error: "Invalid application status." };
    }

    const keys = Object.keys(application);

    // Maximum keys, yet no url => error
    if (keys.length >= 3 && !application.hasOwnProperty("url")) {
      return { error: "Attempted to send invalid fields." };
    } else if (!application.hasOwnProperty("url")) {
      application.url = null;
    }

    // And finally, make sure the data types are valid
    const validTypes = () => {
      for (const key of keys) {
        if (typeof application[key] != "string") {
          if (key == "url" && typeof application[key] == "null") continue;
          else return false;
        }
      }
      return true;
    };
    if (!validTypes()) {
      return { error: "Attempted to send invalid data." };
    }

    return application;
  } else {
    return { error: "Application did not have all required fields." };
  }
}

module.exports = {
  validateKeys,
};
