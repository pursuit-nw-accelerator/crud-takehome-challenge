const { Router } = require('express');
const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
  } = require('../queries/jobApplicationsQueries.js');

const applicationsController = Router();

applicationsController.get('/', async (req, res) => {
    const applications = await getAllApplications();
    return res.status(200).json({ data : applications });
});

applicationsController.get('/:id', async (req, res) => {
    const application = getApplicationById(parseInt(req.params.id));
    return res.status(200).json({ data : application});
})

applicationsController.post('/', async (req, res) => {
    const application = await createApplication(req.body);
    return res.status(201).json({data : application})

});
applicationsController.put('/:id', async (req, res) => {
    const application = await updateApplication(parseInt(req.params.id), req.body);
    return res.status(200).json({data: application})
    
});
applicationsController.delete('/:id', async (req, res) => {
    const application = await deleteApplication(parseInt(req.params.id));
    return res.status(204).json({data: student})
});
applicationsController.get('*', async (req, res) => {
    return res.status(404).json({error: ''})
});