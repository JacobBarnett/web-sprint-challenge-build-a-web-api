// add middlewares here related to projects
const express = require("express");
 
function addMiddleware(server) {
 server.use(express.json());
 server.use(logReq);
 server.use(logErr);
}
 
function logReq(req, res, next) {
 console.log(req.method + ":" + req.url);
 next();
}
function logErr(req, res, next) {
 if (req.body && req.body.name && req.body.name.indexOf("Jacob") !== -1) {
   console.log("Someone mentioned me in the name!");
   req.body.name = req.body.name.replace("Jacob", "💙Jacob💙");
 }
 
 next();
}
module.exports = addMiddleware;
