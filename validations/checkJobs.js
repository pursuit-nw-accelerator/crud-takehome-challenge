const validateId = (req, res, next) => {
    const { id } = req.params
    if (!Number.isInteger(Number(id))) {
        console.log(id)
        // the id is not valid
        return res.status(400).json({ error: `Invalid id: ${id}` });
    }
    next()
}

const jobFields = ["company","url", "status"]
const validateJob = (req, res, next) => {
    const jobData = req.body
    var size = Object.keys(req.body).length;
    if(size > jobFields.length){
        return res.status(400).json({error: `The number of fields is 3 and not ${size}`})
    }
    for(const field in jobData ){
        if(!jobFields.includes(field)){
            return res.status(404).json({error: `Invalid Field Type: ${field}`})
        }
    }
    if(typeof jobData["company"] !== 'string'){
        return res.status(404).json({error: `Invalid Data Type of ${typeof jobData["company"]} for Company when String requried`})
    }
    try{
        new URL(`${jobData["url"]}`);
    } catch (err){
        if(err.message === 'Invalid URL'){
            console.log(`Invalid URL so ${jobData["url"]} was changed to null`)
            jobData["url"] = null
        }
    }
    if(typeof jobData["status"] !== 'string'){
        return res.status(404).json({error: `Invalid Data Type of ${typeof jobData["status"]} for Status when String requried`})
    }
    next()

}

module.exports = { validateId, validateJob };