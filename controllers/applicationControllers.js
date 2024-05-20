const { Router } = require('express');
const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
  } = require('../queries/jobApplicationsQueries.js');
const { intChecker, bodyChecker } = require('../middlewares/middlewares.js');

const applicationsController = Router();

applicationsController.get('/', async (req, res) => {
    try{
        const applications = await getAllApplications();

        if(applications){
            return res.status(200).json({ data : applications });
        } else {
            return res.status(400).json({error: `${id} does not exist in the database`})
        }
    } catch(err) {
        return res.status(500).json({ error: err });
    }
});

applicationsController.get('/:id', intChecker, async (req, res) => {
    try{
        const application = await getApplicationById(parseInt(req.params.id));
        console.log("==========")
        console.log(application)
        console.log("==========")
        if(application){
            return res.status(201).json({data : application});
        } else {
            return res.status(400).json({error: `${req.params.id} does not exist in the database`})
        }
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: `internal server error` });
    }
})

applicationsController.post('/', bodyChecker, async (req, res) => {
    try{
        const application = await createApplication(req.body);

        if(application){
            return res.status(201).json({data : application})
        } else {
            return res.status(400).json({error: `${req.params.id} does not exist in the database`})
        }
    } catch(err){
        return res.status(500).json({ error: `internal server error` });
    }

});
applicationsController.put('/:id', intChecker, bodyChecker, async (req, res) => {
    try{
        const application = await updateApplication(parseInt(req.params.id), req.body);

        if(application){
            return res.status(200).json({data: application})
        } else {
            return res.status(400).json({error: `${req.params.id} does not exist in the database`})
        }
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: `internal server error` });
    }
    
});
applicationsController.delete('/:id', intChecker, async (req, res) => {
    try{
        const application = await deleteApplication(parseInt(req.params.id));
        console.log(application)
        if(application){
            return res.status(200).json({data: application})
        } else {
            return res.status(400).json({error: `${req.params.id} does not exist in the database`})
        }
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: `internal server error` });
    }
});
applicationsController.get('*', (req, res) => {
    try{
        return res.status(404).json({error: 'data cannot be found'})
    } catch(err){
        return res.status(500).json({ error: `internal server error` });
    }
});

module.exports = applicationsController;