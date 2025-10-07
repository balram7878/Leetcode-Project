const { Router } = require("express");
const { submit, run } = require("./solution.controller");
const authValidation = require("../../middleware/authValidation");

const solutionRouter = Router();

solutionRouter.post("/submit/:id", authValidation, submit);
solutionRouter.post("/run/:id", authValidation, run);

module.exports = solutionRouter;
