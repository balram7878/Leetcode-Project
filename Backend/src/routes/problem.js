const { Router } = require("express");
const getProblem = require("../controller/problem/getProblem");
const createProblem = require("../controller/problem/createProblem");
const updateProblem = require("../controller/problem/updateProblem");
const deleteProblem = require("../controller/problem/deleteProblem");
const getAllProblems = require("../controller/problem/getAllProblems");
const solvedProblems = require("../controller/problem/solvedProblems");

const problemRouter = Router();

problemRouter.get("/:id", getProblem);
problemRouter.get("/", getAllProblems);
problemRouter.get("/user", solvedProblems);

problemRouter.post("/create", createProblem);           //create problem
problemRouter.put("/:id", updateProblem);              //update problem
problemRouter.delete("/:id", deleteProblem);           //delete problem


module.exports = problemRouter;
