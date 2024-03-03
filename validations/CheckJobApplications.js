//VALIDATIONS
const applicationStatuses = require('../constants.js')

const applicationsFields = [
    "company",
    "status",
]

const checkId = (req, res, next) => {
    const { id } = req.params
    //if the id is not a number or doesn't exist
    if(!Number.isInteger(Number(id)) || Number(id) < 1){
        //return 400 status code
        res.status(400).json({error: `Id:${id} must be a positive integer`})
    } else{
        next()
    }
}

const checkClientsInput = (req, res, next) => {
    const application = req.body
    // console.log(application) //body is working
    // const {company, status} = req.body // cannot destructure this way // returns undefined

    // - There must be a company and status
    for(let field of applicationsFields){
        if (!application[field] || typeof application[field] !== "string"){
            res.status(400).json({error: `Field must be a non-empty string`})
        }
    }
    
    // - No other fields should be present (including `id`, `createdAt`, `updatedAt`, `admin`, etc.)
    for(let field in application){
        // console.log(field,":", application[field])
        if(field !== "url" && !applicationsFields.includes(field) ){
            res.status(400).json({error: `${field} is not allowed to receieve data`})
        }
    }

    // - The url field is optional, but should have a `null` value if it isn't present.
    if(!application.url){
        application.url = null
    }
    next()
}

// - The status must be one of the statuses listed in `constants.js`
const checkStatuses = (req, res, next) => {
    const application = req.body
    let statusArr = Object.values(applicationStatuses) //an array of the statuses 
    //verifying if application.status from the req, matches the statuses inside of applicationStatuses' values array
    if (!Object.values(statusArr).includes(application.status)){
        res.status(400).json({error: `Invalid status in request body`})
    }
    next()
}


module.exports = {
    checkId,
    checkClientsInput,
    checkStatuses
}