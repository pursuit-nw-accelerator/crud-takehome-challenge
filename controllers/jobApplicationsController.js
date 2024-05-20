const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} = require('../queries/jobApplicationsQueries');

const getAll = async (req, res, next) => {
    try {
        const applications = await getAllApplications();
        res.status(200).json({ data: applications });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await getApplicationById(parseInt(id));
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json({ data: application });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const newApplication = await createApplication(req.body);
        res.status(201).json({ data: newApplication });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedApplication = await updateApplication(parseInt(id), req.body);
        if (!updatedApplication) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json({ data: updatedApplication });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedApplication = await deleteApplication(parseInt(id));
        if (!deletedApplication) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json({ data: deletedApplication });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, getById, create, update, remove };
