const jobs = require("express");
// express.Router is an Express.js Framework, creates a new object
//assigning jobs var to the returned object by express.Router()
//why? 
//want to create a new router object in your program to handle requests
// const db = require('../db/data')
const applications = jobs.Router({mergeParams: true}) //this allows me to use the variable applications for fetching rather than express or jobs in this case
const { getAllApplications,
getApplicationById,
createApplication,
updateApplication,
deleteApplication } = require('../queries/jobApplicationsQueries')

const {
    checkId,
    checkClientsInput
} = require('../validations/checkJobApplications')

//INDEX
applications.get("/", async (req, res) => {
    const allApplications = await getAllApplications()
    console.log(allApplications)
    try{
        if(allApplications){
            res.status(200).json({data: allApplications})
        }
    } catch(error) {
        res.status(500).json({error: error.message})
    }
})

//SHOW
//route handler for get requests to a specific route pattern ("/:id")
//id is a placeholder for the interchangeable parameter
// Async => a specific operation begins upon receipt of an indication (signal) that the preceding operation has been completed.
//takes 2 params req & res which reps the incoming HTTP req and the outgoing HTTP rep, respectively.
applications.get("/:id", checkId, async (req, res) => {
    try { 
        //extract id params from the req URL 
        const { id } = req.params   
        const application = await getApplicationById(Number(id))
        if(application){
            res.status(200).json({data: application})
        }
    } catch(error) {
        res.status(500).json({error: error.message})
    }
})
/**
 * 1. When a route includes an `id` param, validate that the id can be parsed as a positive integer. Return the correct status code and message if the id is not valid.
1. When creating or updating an application, validate the client's input. Return the correct status code if it's not valid.
 */
// CREATE (POST)
applications.post("/", checkClientsInput, async (req, res) => {
    try{ 
        const application = req.body
        const newApplication = await createApplication(application)
        res.status(200).json({data: newApplication})
    } catch(error) {
        res.status(500).json({error: error.message})
    }
})
// UPDATE (PUT)

//DELETE


module.exports = applications
/*                             WORKS CITED
    https://www.geeksforgeeks.org/express-js-express-router-function/
*/  