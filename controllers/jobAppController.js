const _ = require("lodash");
const express = require("express");
const jobApp = express.Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

const {
  validateNoAdditionalFields,
  validateRequiredFields,
} = require("../validation/validateFields");

const { applicationStatuses } = require("../constants");

jobApp.get("/", async (req, res) => {
  try {
    const getAllApps = await getAllApplications();

    if (getAllApps) {
      return res.status(200).json({ data: getAllApps });
    } else {
      return res
        .status(400)
        .json({ error: "Could not retrieve all applications." });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

jobApp.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const escapedId = Number(_.escape(id));

    if (escapedId < 0) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    const checkIfAppExists = await getApplicationById(escapedId);

    if (!checkIfAppExists) {
      return res
        .status(404)
        .json({ error: `Application with ID: ${id} does not exist.` });
    }

    return res.status(200).json({ data: checkIfAppExists });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

jobApp.post(
  "/",
  validateNoAdditionalFields,
  validateRequiredFields,
  async (req, res) => {
    try {
      const appData = {
        company: req.body.company,
        url: req.body.url || null,
        status: req.body.status,
      };

      const statusValues = Object.values(applicationStatuses);

      const correctStatus = statusValues.some(
        (status) => appData.status.toLowerCase() === status.toLowerCase()
      );

      if (!correctStatus) {
        return res.status(400).json({
          error:
            "Please input one of the correct statuses: CREATED, APPLIED, REJECTED, PHONE_SCREEN, ON_SITE, RECEIVED_OFFER, OFFER_ACCEPTED, OFFER_DECLINED",
        });
      }

      const createApp = await createApplication(appData);

      if (createApp) {
        return res.status(201).json({ data: createApp });
      } else {
        return res.status(400).json({ error: "Could not create application." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

jobApp.put(
  "/:id",
  validateNoAdditionalFields,
  validateRequiredFields,
  async (req, res) => {
    try {
      const { id } = req.params;
      const escapedId = Number(_.escape(id));

      if (escapedId < 0) {
        return res.status(400).json({ error: "Invalid ID." });
      }

      const checkIfAppExists = await getApplicationById(escapedId);

      if (!checkIfAppExists) {
        return res
          .status(404)
          .json({ error: `Application with ID: ${id} does not exist.` });
      }

      const updatedAppData = {
        company: req.body.company,
        url: req.body.url || null,
        status: req.body.status,
      };

      const statusValues = Object.values(applicationStatuses);

      const correctStatus = statusValues.some(
        (status) => updatedAppData.status.toLowerCase() === status.toLowerCase()
      );

      if (!correctStatus) {
        return res.status(400).json({
          error:
            "Please input one of the correct statuses: CREATED, APPLIED, REJECTED, PHONE_SCREEN, ON_SITE, RECEIVED_OFFER, OFFER_ACCEPTED, OFFER_DECLINED",
        });
      }

      const updateApp = await updateApplication(escapedId, updatedAppData);

      return res.status(201).json({ data: updateApp });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

jobApp.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const escapedId = Number(_.escape(id));

    if (escapedId < 0) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    const checkIfAppExists = await getApplicationById(escapedId);

    if (!checkIfAppExists) {
      return res
        .status(404)
        .json({ error: `Application with ID: ${id} does not exist.` });
    }

    const deleteApp = await deleteApplication(escapedId);

    return res.status(200).json({ data: deleteApp });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = jobApp;
