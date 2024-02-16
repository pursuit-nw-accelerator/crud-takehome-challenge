/** Initial application structure when being sent
 *  to our backend. The 'url' key is allowed
 *  but not required when creating an application. */
const initialApplicationMap = {
  company: "",
  status: "",
  url: "",
};

/** Validates applications that are being created
 *  to match the structure of the initialApplicationMap. */
const validateInitialApplication = (application) => {
  try {
    // Must have company and status
    let keys = [];
    for (const key in application) {
      if (!initialApplicationMap.hasOwnProperty(key) && key != "url")
        return { error: "Application does not have required fields." };
      else if (typeof initialApplicationMap[key] != typeof application[key])
        return { error: "Application has invalid data." };

      keys.push(key);
    }

    // 'url' is the only valid exception.
    if (keys.length > 3) {
      return { error: "Application has too many fields." };
    }
    // If only company and status, set url to null
    else if (!keys.includes("url")) {
      return { url: null, ...application };
    } else {
      return application;
    }
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = {
  validateInitialApplication,
};
