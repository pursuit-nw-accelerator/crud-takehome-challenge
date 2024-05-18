/*"id": 1,
            "company": "Google",
            "url": "https://cooljobs.com/google-swe",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "status": "APPLIED",
            "updatedAt":
*/
const propChecker = (req, res, next) => {
    if(!req.body["company"] || !req.body["status"]){
        return res.status(400).json({error:"missing parameters"});
    } else {
        next();
    }
}

const intChecker = (req, res, next) => {
    if(!/^[0-9]*$/.test(req.params.id)){
        return res.status(400).json({error : "id must be a valid numeric" });
    }
    next();
}

const bodyChecker = (req, res, next) => {
    if(!req.body){
        return res.status(400).json({error: "missing body"});
    }
    next();
}

module.exports = {
    propChecker,
    intChecker,
    bodyChecker,
}