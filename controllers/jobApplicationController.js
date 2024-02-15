const { Router, application } = require("express");

const jobApplications = Router();

const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
} = require("../queries/jobApplicationsQueries");

const {
    validId,
    idExist,
    validInputFields,
} = require("../Middleware/middleware");

const app = require("../app");

// const application_fields = [
//     "company",
//     "url",
//     "createdAt",
//     "status",
//     "updatedAt"
// ]

//GET ALL APPLICATIONS
jobApplications.get("/", async (req, res) => {
    try {
        const application = await getAllApplications();
        res.status(200).json({ data : application })
    } catch(err) {
        res.status(500).json({err : err.message})
    }
});

// GET ONE APPLICATION
jobApplications.get("/:id",validId,idExist,  async ( req, res ) => {
    try{
        const { id } = req.params;
        const application = await getApplicationById(Number(id))
        res.status(200).json({ data : application})
    } catch (err){
        res.status(500).json({err: err.message})
    }
})

// POST
jobApplications.post("/", async (req, res) => {
    try {
        const application = req.body;
        const newApplication = await createApplication(application)
        res.status(201).json({data: newApplication})
    } catch(err){
        res.status(500).json({ err: err.message })
    }
})

// PUT
jobApplications.put("/:id", validInputFields, async (req, res) => {
    try {
        const { id } = req.params;
        const application = req.body;

        const updatedApplicaion = await updateApplication(Number(id), application)
        res.status(200).json({ data : updatedApplicaion })
    }catch(err) {
        res.status(500).json({ err: err.message})
    }
})

// DELETE
jobApplications.delete("/:id",validId, idExist, async(req, res) => {
    try {
        const { id } = req.params;

        const deleted = await deleteApplication(Number(id))
        res.status(200).json({ data: deleted })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})


module.exports = jobApplications;