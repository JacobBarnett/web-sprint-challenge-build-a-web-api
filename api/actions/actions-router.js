// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateActionBody } = require('./actions-middleware');

// GET all actions
router.get('/', async (req, res) => {
  const actions = await Actions.get();
  res.json(actions);
});

// GET action by ID
router.get('/:id', async (req, res) => {
  const action = await Actions.get(req.params.id);
  if (!action) return res.status(404).json({ message: 'Action not found' });
  res.json(action);
});

// POST new action
router.post('/', validateActionBody, async (req, res) => {
  const newAction = await Actions.insert(req.body);
  res.status(201).json(newAction);
});

// PUT update action
router.put('/:id', validateActionBody, async (req, res) => {
  const updated = await Actions.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Action not found' });
  res.json(updated);
});

// DELETE action
router.delete('/:id', async (req, res) => {
  const deleted = await Actions.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Action not found' });
  res.status(204).end();
});

module.exports = router;
