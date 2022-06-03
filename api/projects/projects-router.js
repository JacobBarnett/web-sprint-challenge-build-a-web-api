// Write your "projects" router here!
const { Router } = require("express");
const db = require("../../data/dbConfig.js");
const model = require("./projects-model");
const addMiddleware = require("./projects-middleware");
const { projectToBody } = require("../../data/helpers/mappers.js");
const router = new Router();

addMiddleware(router);
// Write your "projects" router here!

router.get("/", async (req, res) => {
  const projects = await db("projects");
  res.send(projects.map(projectToBody));
});
router.get("/:id", async (req, res) => {
  const project = await model.get(req.params.id);
  if (!project) {
    res.sendStatus(404);
    return;
  }
  res.send(project);
});

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.sendStatus(400);
    return;
  }

  const project = await model.insert(req.body);
  res.send(project);
});

router.put("/:id", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    req.body.completed === undefined
  ) {
    res.sendStatus(400);
    return;
  }

  const project = await model.get(req.params.id);

  if (!project) {
    res.sendStatus(404);
    return;
  }
  const updatedProject = await model.update(req.params.id, req.body);
  res.send(updatedProject);
});

router.delete("/:id", async (req, res) => {
  const project = await model.get(req.params.id);
  if (!project) {
    res.sendStatus(404);
    return;
  }
  await model.remove(req.params.id);
  res.end();
});

router.get("/:id/actions", async (req, res) => {
  const project = await model.get(req.params.id);

  if (!project) {
    res.sendStatus(404);
    return;
  }
  res.send(project.actions);
});

module.exports = router;
