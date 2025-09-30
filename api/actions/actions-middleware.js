// add middlewares here related to actions
const Projects = require('../projects/projects-model');

async function validateActionBody(req, res, next) {
  const { description, notes, project_id } = req.body;

  if (!description || !notes || !project_id) {
    return res.status(400).json({ message: 'Missing required fields: description, notes, project_id' });
  }

  try {
    const project = await Projects.get(project_id);
    if (!project) {
      return res.status(400).json({ message: 'Invalid project_id' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error validating project_id' });
  }
}


module.exports = { validateActionBody };
