const validateId = (req, res, next) => {
    const { id } = req.params
    if (!Number.isInteger(Number(id))) {
        console.log(id)
        // the id is not valid
        return res.status(400).json({ error: `Invalid id: ${id}` });
    }
    next()
}

const validateJob = (req, res, next) => {
    console.log(req.body)
    next()

}

module.exports = { validateId, validateJob };