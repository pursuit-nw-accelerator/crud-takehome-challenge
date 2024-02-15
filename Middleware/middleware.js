const { getApplicationById } = require("../queries/jobApplicationsQueries");

const validId = (req, res, next) => {
    const { id } = req.params;
    if(!Number.isInteger(Number(id)) || Number(id) < 1){
        return res.status(400).json({error: `id param ${id} must be positive integer;`})
    }else {
        next();
    }
}

const idExist = async (req, res, next) => {
    const { id } = req.params;
    const application = await getApplicationById(Number(id));
    if(!application){
       return res.status(400).json({error: `id param ${id} doesnot exist;`})
    }else {
        next();
    }
}

const application_fields = [
    "company",
    "status",
    "url" ,
]

const validInputFields = (req, res, next) => {
    const application = req.body;

    for(let field of application_fields){
        if(!application.hasOwnProperty(field) || typeof application[field] !== "string" && !(field === 'url' && application[field] === null)){
           return res.status(400).json({error: `${field} field missing or wrong data type, recived ${application[field]}`})
        } 
    }

    for(let field in application){
        if(!application_fields.includes(field)){
           return res.status(400).json({error: `${field} is not allowed. Please fill only the required inputs`})
        }
    }
    next()
}


module.exports = {
    validId,
    idExist,
    validInputFields,
}