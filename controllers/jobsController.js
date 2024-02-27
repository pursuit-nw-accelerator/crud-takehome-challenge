//controller to handle job apps
const jobApplicationsQueries = require('../queries/jobApplicationsQueries');

const { validateJobApplication } = require('../validations/jobApplicationValidation')

//valid int
const isValidId = (id) => {
    return Number.isInteger(Number(id)) && Number(id) > 0
};

  //function to GET

const getJobApplications = async (req,res) => {
    try {
        const applications = await jobApplicationsQueries.getAllApplications(); 
        //if successful
        res.status(200).json({ data: applications})
    } catch (error) {
        //if error
        console.log('Error fecthing applications:', error)
        res.status(500).json({error: error.message})
    }
};

const getJobApplicationById = async (req,res) => {
    //id must be integer
    const id = req.params.id;
    if(!isValidId(id)){
        return res.status(404).json({error: error.message})
    }
    try {
        const application = await jobApplicationsQueries.getApplicationById(id);
        //if id isnt found return 404 otherwise return id
        if(!application){
            return res.status(404).json({error: error.message})
        } 
        res.status(200).json({ data: application})
        //catch other errors
    } catch (error) {
        console.log('Error getting ID:', error)
        res.status(500).json({error: error.message})
    }

};

const createJobApplication = async (req,res) => {
    const validationError = validateJobApplication(req.body);
    if(validationError) {
       return res.status(400).json(validationError)
    }
    const applicationData = req.body
    try {
        const newApplication = await jobApplicationsQueries.createApplication(applicationData)
        //if successfully created
        res.status(201).json({ data: newApplication})
    } catch (error) {
        console.log('Error creating app', error)
        res.status(500).json({ error: error.message})
    }
};

const updateJobApplication = async (req, res) => {
    const id = req.params.id;
    if(!isValidId(id)){
        return res.status(404).json({error: error.message})
    }
    const validationError = validateJobApplication(req.body);
    if(validationError) {
       return res.status(400).json(validationError)
    }
    const updatedData = req.body
    try {
        const updatedApp = await jobApplicationsQueries.updateApplication(id, updatedData)
        if(!updatedApp) {
          return  res.status(404).json({error: error.message})
        }
       return res.status(200).json({ data: updatedApp})
    } catch ( error ) {
        console.log('Error updating ID', error)
    return res.status(500).json({ error: error.message})
    }
};

const deleteJobApplication = async (req, res) => {
    const id = req.params.id;
    if(!isValidId(id)){
        return res.status(404).json({error: error.message})
    }
    const validationError = validateJobApplication(req.body);
    if(validationError) {
       return res.status(400).json(validationError)
    }
    // const deleteData = req.body
    try {
        const deleteApp = await jobApplicationsQueries.deleteApplication(id)
        if(!deleteApp) {
           return res.status(404).json({error: error.message})
        } 
        return res.status(200).json({ data: deleteApp})
    } catch (error) {
        console.log('Error deleting app:', error)
        return res.status(500).json({ error: error.message})
    }
};

module.exports = {
    getJobApplications,
    getJobApplicationById,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication
}
