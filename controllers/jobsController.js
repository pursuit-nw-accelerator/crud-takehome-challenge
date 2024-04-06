//controller to handle job apps
const jobApplicationsQueries = require('../queries/jobApplicationsQueries');

const { validateJobApplication } = require('../validations/jobApplicationValidation')


  //function to GET

const getJobApplications = async (req,res) => {
    try {
        const applications = await jobApplicationsQueries.getAllApplications(); 
        console.log("Applications:" , applications)
       return res.status(200).json({ data: applications})
    } catch (error) {
        console.error('Error fecthing applications:', error)
       return res.status(500).json({error: error.message})
    }
};

const getJobApplicationById = async (req, res) => {
    
    const id = req.params.id;
    console.log("ID:" , id)

    if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
        console.error("Invalid ID")
        return res.status(400).json({ error: "Invalid ID" });
    }
    
    try {

        const application = await jobApplicationsQueries.getApplicationById(Number(id));
        console.log('Application:' , application)
        if (!application) {
            console.error('Application does not exist');
            return res.status(404).json({ error: "Application not found" });
        }
        return res.status(200).json({ data: application });
    } catch (error) {
        console.error('Error getting application by ID:', error);
        return res.status(500).json({ error: error.message });
    }
};



const createJobApplication = async (req, res) => {
    const validationError = validateJobApplication(req.body); 
    if (validationError) {
        console.error(validationError)
       return res.status(400).json(validationError);
    }
    const applicationData = req.body;
    console.log("Application Data:" , applicationData)
    try {
        const newApplication = await jobApplicationsQueries.createApplication(applicationData);
        console.log("New Application:" , newApplication)

       return res.status(201).json({ data: newApplication });
    } catch (error) {
        console.log('Error creating application', error);
       return res.status(500).json({ error: error.message });
    }
};


const updateJobApplication = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
            console.error("Invalid ID");
            return res.status(400).json({ error: "Invalid ID" });
        }

        const validationerror = validateJobApplication(req.body);
        if (validationerror) {
            console.error(validationerror);
            return res.status(400).json(validationerror);
        }

        const updatedData = req.body;
        console.log("ID:", id);
        console.log("Updated Data:", updatedData);

        const updatedApp = await jobApplicationsQueries.updateApplication(Number(id), updatedData);
        console.log("Updated App:", updatedApp);

        if (!id) {
            console.error("Application does not exist");
            return res.status(404).json({ error: "Application does not exist" });
        }

        return res.status(200).json({ data: updatedApp });
    } catch (error) {
        console.error('Error updating application:', error.message);
        return res.status(500).json({ error: "Error updating application" });
    }
};



const deleteJobApplication = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("ID:" , id)
        if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
            console.error("Invalid ID")
            return res.status(400).json({ error: "Invalid ID" });
        }
        const deletedApp = await jobApplicationsQueries.deleteApplication(Number(id));
        console.log("Deleted:" , deletedApp)
        if (!deletedApp) {
            console.error("Application does not exist")
            return res.status(404).json({ error: "Application does not exist" });
        }
        return res.status(200).json({ data: deletedApp });
    } catch (error) { 
        console.log(error)
        console.error('Error deleting application:', error.message);
        return res.status(500).json({ error: error.message });
    }
    
};

module.exports = {
    getJobApplications,
    getJobApplicationById,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication
}
