const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const jobAppController = require("./controllers/jobAppController");

app.use("/applications", jobAppController);

app.get("/", (request, response) => {
  response.status(200).json({ data: "Service is running" });
});

app.get("/*", (request, response) => {
  response.status(404).json({ error: "Not Found" });
});

module.exports = app;
