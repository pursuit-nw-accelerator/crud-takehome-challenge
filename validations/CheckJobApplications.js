//VALIDATIONS
const {applicationStatuses} = require('../constants.js')

    const checkId = (req, res, next) => {
        const { id } = req.params
        console.log(id)
        //if the id is not a number or doesn't exist
        if(!Number.isInteger(Number(id)) || Number(id) < 1){
        //return 400 status code
        response.status(400).json({error: `Id:${id} must be a positive integer`})
        } else{
            next()
        }
    }

    const checkClientsInput = (req, res, next) => {
        // - There must be a company and status
        const {company, status} = req.body
        if (!company){
            return res.status(400).json({error: "Must have a company in your request"})
        }
        if (!status){
            return res.status(400).json({error: "Must have a status in your request"})
        }
        // - The url field is optional, but should have a `null` value if it isn't present.
        if(req.body.url == null){
            res.body.url = null
        }
        // - The status must be one of the statuses listed in `constants.js`
        for(const status in applicationStatuses) {
            console.log(status)
        }
        // - No other fields should be present (including `id`, `createdAt`, `updatedAt`, `admin`, etc.)

        if(req.body.id || req.body.createdAt || req.body.updatedAt){
            return res.status(400).json({error: "Fields not available for request"})
        }
        next()
    }
    module.exports = {
        checkId,
        checkClientsInput
    }