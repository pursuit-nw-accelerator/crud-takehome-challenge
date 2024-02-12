const { Router } = require("express");

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
} = require("../Middleware/middleware")

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

module.exports = jobApplications;