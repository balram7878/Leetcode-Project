const solutionRouter = require("express").Router();
const { submit, run, totalSubmissions } = require("./solution.controller");
const authValidation = require("../../middleware/authValidation");

solutionRouter.post("/submit/:id", authValidation, submit);
solutionRouter.post("/run/:id", authValidation, run);
solutionRouter.get("/submissions/:id", authValidation, totalSubmissions);

module.exports = solutionRouter;
