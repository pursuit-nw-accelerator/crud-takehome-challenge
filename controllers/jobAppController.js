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

const { validateFields } = require("../validation/validateFields");

const { applicationStatuses } = require("../constants");

jobApp.get("/", async (req, res) => {
  try {
    const getAllApps = await getAllApplications();

    if (getAllApps) {
      return res.status(200).json({ data: getAllApps });
    } else {
      return res
        .status(404)
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

    const getAppById = await getApplicationById(escapedId);

    if (getAppById) {
      return res.status(200).json({ data: getAppById });
    } else {
      return res
        .status(404)
        .json({ error: `Could not retrieve application with ID: ${id}.` });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

jobApp.post("/", validateFields, async (req, res) => {
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
      return res.status(404).json({ error: "Could not create application." });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

jobApp.put("/:id", validateFields, async (req, res) => {
  try {
    const { id } = req.params;
    const escapedId = Number(_.escape(id));

    const updatedAppData = {
      company: req.body.company,
      url: req.body.url || null,
      status: req.body.status,
    };

    const statusValues = Object.values(applicationStatuses);

    for (const status of statusValues) {
      if (updatedAppData.status !== status) {
        return res.status(400).json({
          error:
            "Please input one of the correct statuses: APPLIED, REJECTED, PHONE_SCREEN, ON_SITE, RECEIVED_OFFER, OFFER_ACCEPTED, OFFER_DECLINED",
        });
      }
    }

    const updateApp = await updateApplication(escapedId, updatedAppData);

    if (updateApp) {
      return res.status(201).json({ data: updateApp });
    } else {
      return res
        .status(404)
        .json({ error: `Could not update application with ID: ${id}.` });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

jobApp.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const escapedId = Number(_.escape(id));

    const deleteApp = await deleteApplication(escapedId);

    if (deleteApp) {
      return res.status(200).json({ data: deleteApp });
    } else {
      return res
        .status(404)
        .json({ error: `Could not delete application with ID: ${id}.` });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = jobApp;
