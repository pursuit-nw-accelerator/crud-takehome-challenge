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
        return res.status(200).json({ data : applications });
    } catch(err) {
        return res.status(400).json({ error: err });
    }
});

applicationsController.get('/:id', intChecker, async (req, res) => {
    try{
        const application = getApplicationById(parseInt(req.params.id));
        return res.status(200).json({ data : application});
    } catch(err){
        return res.status(400).json({ error: err });
    }
})

applicationsController.post('/', propChecker, bodyChecker,async (req, res) => {
    try{
        const application = await createApplication(req.body);
        return res.status(201).json({data : application})
    } catch(err){
        return res.status(400).json({ error: err });
    }

});
applicationsController.put('/:id', intChecker, bodyChecker, async (req, res) => {
    try{
        const application = await updateApplication(parseInt(req.params.id), req.body);
        return res.status(200).json({data: application})
    } catch(err){
        return res.status(400).json({ error: err });
    }
    
});
applicationsController.delete('/:id', intChecker, async (req, res) => {
    try{
        const application = await deleteApplication(parseInt(req.params.id));
        return res.status(204).json({data: student})
    } catch(err){
        return res.status(400).json({ error: err });
    }
});
applicationsController.get('*', async (req, res) => {
    try{
        return res.status(404).json({error: ''})
    } catch(err){
        return res.status(400).json({ error: err });
    }
});