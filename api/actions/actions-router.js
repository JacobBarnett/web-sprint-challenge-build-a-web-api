// Write your "actions" router here!
const { Router } = require("express");
const db = require("../../data/dbConfig.js");
const model = require("./actions-model");

const router = new Router();

router.get("/", async (req, res) => {
  const actions = await db("actions");
  res.send(actions);
});

module.exports = router;
