const constants = require("../constants")
const validFields = ['company, status, url']

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
        res.status(400).json({ error: 'id is not valid' })

    }
    next();
}

const validateApp = (req, res, next) => {
    const jobApp = req.body;

    for (const field of validFields){
        if(!jobApp.hasOwnProperty(field) || typeof jobApp[field] !== 'string'){
            return response.status(400).json({
                error: `${field} is missing or wrong, received ${jobApp[field]}`
            })
        }
    }
    if (status === undefined || constants[status] === undefined){
        res.status(400).json({error: "Status is not valid"})
    }
    next()
}

module.exports = { validateId, validateApp }