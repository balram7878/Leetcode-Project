const { Router } = require("express");
const adminValidation=require("../../middleware/adminValidation");

const {
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
  getAllProblems,
  solvedProblems,
} = require("./problem.controller");

const problemRouter = Router();

problemRouter.get("/:id", getProblem);
problemRouter.get("/", getAllProblems);
problemRouter.get("/user", solvedProblems);


//-->
problemRouter.post("/create",adminValidation, createProblem);  //create problem
//-->

problemRouter.put("/:id", updateProblem);     //update problem
problemRouter.delete("/:id", deleteProblem);  //delete problem

module.exports = problemRouter;
