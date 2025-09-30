// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const { validateProjectId, validateProjectBody } = require('./projects-middleware');

// GET all projects
router.get('/', async (req, res) => {
  const projects = await Projects.get();
  res.json(projects);
});

// GET project by ID
router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project);
});

// POST new project
router.post('/', validateProjectBody, async (req, res) => {
  const newProject = await Projects.insert(req.body);
  res.status(201).json(newProject);
});

// PUT update project
router.put('/:id', validateProjectId, validateProjectBody, async (req, res) => {
  const updated = await Projects.update(req.params.id, req.body);
  res.json(updated);
});

// DELETE project
router.delete('/:id', validateProjectId, async (req, res) => {
  await Projects.remove(req.params.id);
  res.status(204).end();
});

// GET actions for a project
router.get('/:id/actions', validateProjectId, async (req, res) => {
  const actions = await Projects.getProjectActions(req.params.id);
  res.json(actions);
});

module.exports = router;
