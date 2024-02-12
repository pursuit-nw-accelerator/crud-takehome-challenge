const { getApplicationById } = require("../queries/jobApplicationsQueries");

const validId = (req, res, next) => {
    const { id } = req.params;
    if(!Number.isInteger(Number(id)) || Number(id) < 1){
        res.status(400).json({error: `id param ${id} must be positive integer;`})
    }else {
        next();
    }
}

const idExist = async (req, res, next) => {
    const { id } = req.params;
    const application = await getApplicationById(Number(id));
    if(!application){
        res.status(400).json({error: `id param ${id} doesnot exist;`})
    }else {
        next();
    }
}

module.exports = {
    validId,
    idExist,
}