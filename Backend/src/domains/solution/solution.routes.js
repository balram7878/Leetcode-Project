const solutionRouter = require("express").Router();
const { submit,run } = require("./solution.controller");
const authValidation = require("../../middleware/authValidation");

solutionRouter.post("/submit/:id", authValidation, submit);
solutionRouter.post("/run/:id", authValidation, run);

module.exports = solutionRouter;
