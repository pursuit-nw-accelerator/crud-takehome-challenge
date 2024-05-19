/*"id": 1,
            "company": "Google",
            "url": "https://cooljobs.com/google-swe",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "status": "APPLIED",
            "updatedAt":
*/
const fs = require('node:fs');
const FILE = '../db/data/jobApplicationsData.json';

const propChecker = (req, res, next) => {
    if(!req.body["company"] || !req.body["status"]){
        return res.status(401).json({error:"missing parameters"});
    } else {
        next();
    }
}

const intChecker = (req, res, next) => {
    if(!/^[0-9]*$/.test(req.params.id)){
        return res.status(401).json({error : "id must be a valid numeric" });
    }
    next();
}

const bodyChecker = (req, res, next) => {
    if(!req.body){
        return res.status(401).json({error: "missing body"});
    }
    next();
}

const dbChecker = (req, res, next) => {
    let errFlag = false;
    let errMsg = "";

    fs.access(FILE, (err) => {
        if(err){
            if(err.code === 'ENOENT'){
                errFlag = true;
                errMsg = "db cannot be found";
                return;
            } /** ENOENT chk */
        } /** end of 1st if */
    }) /** end of readFile */

    if(errFlag){
        return res.status(500).json({error: errMsg});
    } else {
        next();
    }
} /** end of dbChecker */

module.exports = {
    propChecker,
    intChecker,
    bodyChecker,
    dbChecker,
}