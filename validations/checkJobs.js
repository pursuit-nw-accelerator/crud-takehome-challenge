const checkId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))){
        res.status(400).json({error: 'id is not valid'})
    }
    next();
}