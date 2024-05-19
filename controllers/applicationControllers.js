const { Router } = require('express');
const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
  } = require('../queries/jobApplicationsQueries.js');
const { intChecker, propChecker, bodyChecker } = require('../middlewares/middlewares.js');

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
        const application = getApplicationById(parseInt(req.params.id));

        if(application){
            return res.status(201).json({data : application})
        } else {
            return res.status(400).json({error: `${id} does not exist in the database`})
        }
    } catch(err){
        return res.status(500).json({ error: err });
    }
})

applicationsController.post('/', propChecker, bodyChecker,async (req, res) => {
    try{
        const application = await createApplication(req.body);

        if(application){
            return res.status(201).json({data : application})
        } else {
            return res.status(400).json({error: `${id} does not exist in the database`})
        }
    } catch(err){
        return res.status(500).json({ error: err });
    }

});
applicationsController.put('/:id', intChecker, bodyChecker, async (req, res) => {
    try{
        const application = await updateApplication(parseInt(req.params.id), req.body);

        if(application){
            return res.status(200).json({data: application})
        } else {
            return res.status(400).json({error: `${id} does not exist in the database`})
        }
    } catch(err){
        return res.status(500).json({ error: err });
    }
    
});
applicationsController.delete('/:id', intChecker, async (req, res) => {
    try{
        const application = await deleteApplication(parseInt(req.params.id));

        if(application){
            return res.status(204).json({data: student})
        } else {
            return res.status(400).json({error: `${id} does not exist in the database`})
        }
    } catch(err){
        return res.status(500).json({ error: err });
    }
});
applicationsController.get('*', async (req, res) => {
    try{
        return res.status(404).json({error: ''})
    } catch(err){
        return res.status(500).json({ error: err });
    }
});