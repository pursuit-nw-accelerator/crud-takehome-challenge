

const express = require('express');
const controllers = require('../controllers/jobsController');

const router = express.Router();

router.get('/', controllers.getJobApplications);
router.get('/:id', controllers.getJobApplicationById);
router.post('/', controllers.createJobApplication);
router.put('/:id', controllers.updateJobApplication);
router.delete('/:id', controllers.deleteJobApplication);

module.exports = router;
