//controller to handle job apps
const jobApplicationsQueries = require('../queries/jobApplicationsQueries');


  //function to GET

const getJobApplications = async (req,res) => {
    try {
        const applications = await jobApplicationsQueries.getAllApplications(); 
        //if successful
        res.status(200).json({ data: applications})
    } catch (error) {
        //if error
        console.log('Error fecthing applications:', error)
        res.status(500).json({error: 'Internal Server Error'})
    }
};

const getJobApplicationById = async (req,res) => {
    //id must be integer
    const id = parseInt(req.params.id);

    try {
        const application = await jobApplicationsQueries.getApplicationById(id);
        //if id isnt found return 404 otherwise return id
        if(!application){
            return res.status(404).json({error: 'Applications not found'})
        } 
        res.status(200).json({ data: application})
        //catch other errors
    } catch (error) {
        console.log('Error getting ID:', error)
        res.status(500).json({error: 'Internal Server Error'})
    }

};

const createJobApplication = async (req,res) => {
    const applicationData = req.body
    try {
        const newApplication = await jobApplicationsQueries.createApplication(applicationData)
        //if successfully created
        res.status(201).json({ data: newApplication})
    } catch (error) {
        console.log('Error creating app', error)
        res.status(500).json({ error: 'Internal Server Error'})
    }
};

const updateJobApplication = async (req,res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body
    try {
        const updatedApp = await jobApplicationsQueries.updateApplication(id, updatedData)
        if(!updatedApp) {
            res.status(404).json({error: 'Could not find App'})
        }
        res.status(200).json({ data: updatedApp})
    } catch ( error ) {
        console.log('Error updating ID', error)
    res.status(500).json({ error: 'Internal Server Error'})
    }
};

const deleteJobApplication = async (req, res) => {
    const id = parseInt(req.params.id);
    // const deleteData = req.body
    try {
        const deleteApp = await jobApplicationsQueries.deleteApplication(id)
        if(!deleteApp) {
            res.status(404).json('Could not find App')
        } 
        res.status(200).json({ data: deleteApp})
    } catch (error) {
        console.log('Error deleting app:', error)
        res.status(500).json({ error: 'Internal Server Error'})
    }
};

module.exports = {
    getJobApplications,
    getJobApplicationById,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication
}
