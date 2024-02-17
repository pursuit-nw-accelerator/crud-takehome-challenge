const app = require("../app");
const { getApplicationById } = require("../queries/jobApplicationsQueries");

const idCheck = (req, res, next) => {
  const { id } = req.params;
  const idNum = Number(id);
  if (idNum < 0 || isNaN(idNum)) {
    return res.status(400).json({
      error: `The id you entered - ${id}, must be a number and greater than 0`,
    });
  } else {
    next();
  }
};

const applicationExist = async (req, res, next) => {
  const id = Number(req.params.id);
  const application = await getApplicationById(id);

  if (!application) {
    res
      .status(404)
      .json({ error: `An application with the id - ${id} does not exist` });
  } else {
    next();
  }
};
module.exports = { idCheck, applicationExist };
