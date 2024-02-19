const constants = require("../constants")
const validFields = ['company, status']

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'id is not valid' })
    }

    next();
}

const validateApp = (req, res, next) => {
    const {jobApp} = req.body;

    for (const field of validFields){
        if(!jobApp.hasOwnProperty(field)){
            return response.status(400).json({
                error: `${field} is missing or wrong, received ${jobApp[field]}`
            })
        }
    }
    if (typeof jobApp['company'] !== 'string'){
        return res.status(400).json({error: `Something is wrong with ${jobApp['company']}`})
    }
    if (typeof jobApp['status'] !== 'string' || !constants.includes(jobApp['status'].toUpperCase())){
        return res.status(400).json({error: `Status ${jobApp['status']} is not available`})
    }
    
    for (const field in jobApp){
        if (!validFields.includes(field)){
            return response.status(400).json({error: `${field} is not allowed.`})
        }
    }

    next()
}

module.exports = { validateId, validateApp }