const fs = require('node:fs');
const FILE = '../db/data/jobApplicationsData.json';
const applicationStatuses = require('../constants.js');
const {
    getApplicationById,
    createApplication,
    deleteApplication,
    updateApplication,
  } = require('../queries/jobApplicationsQueries.js');

/**************************************
 * intChecker()
 * ===================================
 * @param {Object} req - 
 * @param {Object} res - 
 * @param {function} next - 
 * 
 * a middleware to check a parameter in the url.
 * the parameter must be numeric with positive integer.
 */
const intChecker = (req, res, next) => {
    if(!/^[0-9]*$/.test(req.params.id)){
        return res.status(401).json({error : "id must be a valid numeric" });
    }
    next();
}

/**************************************
 * bodyChecker()
 * ===================================
 * @param {Object} req - 
 * @param {Object} res - 
 * @param {function} next - 
 * 
 * a middleware to check the body block from a request.
 * "company" and "status" must exist, and any other property besides "url" must be omitted.
 */
const bodyChecker = (req, res, next) => {
    if(!req.body){
        return res.status(401).json({error: "missing body"});
    }

    if(!req.body.company){
        return res.status(401).json({error: "company field must be filled"});
    }

    if(!applicationStatuses[req.body.status]){
        return res.status(401).json({error: "wrong value was typed on the status."})
    }

    if(req.body.id || req.body.createdAt || req.body.updatedAt){
        return res.status(401).json({error: "unauthorized access is detected"});
    }

    for(let property in req.body){
        console.log(req.body)
        console.log(property)
        if(property == 'company' || property == 'url' || property == 'status'){
            continue;
        } else {
            return res.status(401).json({error: "missing required parameters"});
        }
    } /** end of for loop */

    next();
} /** end of bodyChecker() */

/**************************************
 * dbChecker()
 * ====================================
 * @param {Object} req - 
 * @param {Object} res - 
 * @param {function} next - 
 * 
 * middleware to check the existence of the dbfile.
 * reference: https://nodejs.org/docs/latest/api/fs.html#fsaccesspath-mode-callback
 * 
 */
const dbChecker = (req, res, next) => {
    let errFlag = false;
    let errMsg = "";
    let errStatus = 500;
    fs.access(FILE, (err) => {
        if(err){
            errFlag = true;
            if(err.code === 'ENOENT'){
                errMsg = "db cannot be found";
                errStatus = 503;
                return;
            } /** ENOENT chk */
            else {
                errMsg = "something wrong in the db";
                errStatus = 500;
                return;
            }
        } /** end of 1st if */
    }) /** end of readFile */

    if(errFlag){
        return res.status(errStatus).json({error: errMsg});
    } else {
        next();
    }
} /** end of dbChecker */

/**************************************
 * crudChecker()
 * ====================================
 * @param {Object} req - 
 * @param {Object} res - 
 * @param {function} next - 
 * 
 * middleware to check CRUD functionality by create/read/delete a data to db.
 * 
 */
const crudChecker = async (req, res, next) => {
    /** test CREATE */
    const create = await createApplication({company: "test", status: "APPROVED"});
    if(!create){
        return res.status(500).json({error: "cannot POST to db"});
    }

    /** test UPDATE */
    const updatedApp = await updateApplication(parseInt(create.id), {company: "test", status: "REJECTED"});
    if(!updatedApp){
        return res.status(500).json({error: "cannot PUT to db"});
    }

    /** test READ */
    const application = await getApplicationById(parseInt(create.id));
    if(!application){
        return res.status(500).json({error: "cannot GET to db"});
    }

    /** test DELETE */
    const deletedApp = await deleteApplication(parseInt(application.id))
    if(!deletedApp){
        return res.status(500).json({error: "cannot DELETE to db"});
    }
    next();
} /** end of crudChecker() */

module.exports = {
    intChecker,
    bodyChecker,
    dbChecker,
    crudChecker,
}