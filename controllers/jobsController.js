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
       return res.status(200).json({ data: applications})
    } catch (error) {
        //if error
        console.log('error fecthing applications:', error)
       return res.status(500).json({error: error.message})
    }
};

const getJobApplicationById = async (req, res) => {
    
    const id = req.params.id;
    console.log("ID:" , id)

    if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
        return res.status(400).json({ error: error.message });
    }
    
    try {

        const application = await jobApplicationsQueries.getApplicationById(Number(id));
        
        console.log('Application:' , application)
        if (!application) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(200).json({ data: application });
    } catch (error) {
        console.log('Error getting application by ID:', error);
        return res.status(500).json({ error: error.message });
    }
};



const createJobApplication = async (req, res) => {
    const validationError = validateJobApplication(req.body); 
    if (validationError) {
       return res.status(400).json(validationError);
    }
    const applicationData = req.body;
    try {
        const newApplication = await jobApplicationsQueries.createApplication(applicationData);
        // If successfully created
       return res.status(201).json({ data: newApplication });
    } catch (error) {
        console.log('Error creating application', error);
       return res.status(500).json({ error: error.message });
    }
};


const updateJobApplication = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
        return res.status(400).json({ error: error.message });
    }
    const validationerror = validateJobApplication(req.body);
    if(validationerror) {
       return res.status(400).json(validationerror)
    }
    const updatedData = req.body
    try {
        const updatedApp = await jobApplicationsQueries.updateApplication(Number(id), updatedData)
        if(!updatedApp) {
          return  res.status(404).json({error: error.message})
        }
       return res.status(200).json({ data: updatedApp})
    } catch ( error ) {
        console.log('error updating ID', error)
    return res.status(500).json({ error: error.message})
    }
};

const deleteJobApplication = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id, 'number')
        if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
            return res.status(400).json({ error: error.message });
        }
        const deletedApp = await jobApplicationsQueries.deleteApplication(Number(id)); // 
        console.log(deletedApp, "deleted")
        if (!deletedApp) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(200).json({ data: deletedApp });
    } catch (error) {
        console.log('Error deleting application:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    deleteJobApplication
};

