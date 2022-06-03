// Write your "actions" router here!
const { Router } = require("express");
const db = require("../../data/dbConfig.js");
const model = require("./actions-model");
const addMiddleware = require("./actions-middlware");
const { actionToBody } = require("../../data/helpers/mappers.js");

const router = new Router();

addMiddleware(router);

router.get("/", async (req, res) => {
  const actions = await db("actions");
  res.send(actions.map(actionToBody));
});
router.get("/:id", async (req, res) => {
  const action = await model.get(req.params.id);
  if (!action) {
    res.sendStatus(404);
    return;
  }
  res.send(action);
});
router.post("/", async (req, res) => {
  if (!req.body.description || !req.body.notes) {
    res.sendStatus(400);
    return;
  }

  const action = await model.insert(req.body);
  res.send(action);
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  if (
    !req.body.description &&
    req.body.completed === undefined &&
    !req.body.notes &&
    !req.project_id
  ) {
    res.sendStatus(400);
    return;
  }

  const action = await model.get(req.params.id);

  if (!action) {
    res.sendStatus(404);
    return;
  }
  const updatedAction = await model.update(req.params.id, req.body);
  res.send(updatedAction);
});

router.delete("/:id", async (req, res) => {
  const action = await model.get(req.params.id);
  if (!action) {
    res.sendStatus(404);
    return;
  }
  await model.remove(req.params.id);
  res.end();
});
module.exports = router;
