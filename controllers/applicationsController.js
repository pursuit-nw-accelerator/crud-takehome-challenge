const { Router } = require("express");
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

const applicationsController = Router();

//See all applications
applicationsController.get("/", async (request, response) => {
  try {
    const applications = await getAllApplications();

    response.status(200).json({ data: applications });
  } catch (error) {
    response.status(500).json({ error: "Server failed to retrieve application list." });
  }
});

//Get application by ID
applicationsController.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const application = await getApplicationById(Number(id));
    
        if (application) {
          response.status(200).json({ data: application });
        } else {
          response.status(404).json({ error: "There is no application at that ID." });
        }
      } catch (error) {
        response.status(500).json({ error: "Server failed to retrieve application by given ID." });
      }
})

//POST new application
applicationsController.post("/", async (request, response) => {
    try {
        const application = request.body;
        const createdApplication = await createApplication(application);

        response.status(201).json({ data: createdApplication});
    } catch (error) {
        response.status(500).json({ error: "Server failed to create application." });
    }
})

//PUT (update) an existing application
applicationsController.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const application = request.body;
    const updatedApplication = await updateApplication(Number(id), application);

    if(updatedApplication.id) {
      response.status(200).json({ data: updatedApplication });
    } else {
      response.status(404).json({ error: "There is no application at that ID." });
    }
  } catch (error) {
    response.status(500).json({ error: "Server failed to update application." });
  }
})

//DELETE an existing application
applicationsController.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedApplication = await deleteApplication(Number(id));

    if(deletedApplication) {
      response.status(200).json({ data: deletedApplication });
    } else {
      response.status(404).json({ error: "There is no application at that ID." });
    }
  } catch (error) {
    response.status(500).json({ error: "Server failed to delete application." });
  }
})

module.exports = applicationsController;
