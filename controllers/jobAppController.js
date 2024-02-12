const express = require("express");
const jobApp = express.Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

jobApp.get("/", async (req, res) => {});

jobApp.get("/", async (req, res) => {});

jobApp.post("/", async (req, res) => {});

jobApp.put("/", async (req, res) => {});

jobApp.delete("/", async (req, res) => {});

module.exports = jobApp;
