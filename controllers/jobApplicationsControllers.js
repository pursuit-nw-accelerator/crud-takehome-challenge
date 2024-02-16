const express = require("express");
const controller = express();

controller.get("/route", (req, res) => {
  try {
    res.status(200).send({ response: "Route successful!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = controller;
