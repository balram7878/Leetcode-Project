const validateProblem = require("../../utils/validate.problem");
const {
  getLanguageId,
  createBatchedSubmission,
  getBatchedSubmission,
  statuses,
} = require("../../utils/judge.0");
const problem_model = require("../../models/Problem.model");


const createProblem = async (req, res) => {
  try {
    validateProblem(req.body);
    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      boilerplateCode,
      referenceSolution,
      problemCreator,
    } = req.body;



    const submissions = [];

    for (const { language, source_code } of referenceSolution) {
      const language_id = getLanguageId(language);
      for (const { stdin, expected_output } of visibleTestCases) {
        submissions.push({
          language_id,
          source_code:source_code.trim(),
          stdin,
          expected_output,
        });
      }
    }

    const submissionTokens = await createBatchedSubmission(submissions);
    const tokensArray = submissionTokens.map((e) => e.token);
    const tokensString = tokensArray.join(",");
    const finalSubmissionResult = await getBatchedSubmission(tokensString);
    console.log(finalSubmissionResult);
    for (let { status_id } of finalSubmissionResult.submissions) {
      if (status_id != 3) {
        return res.status(400).json({ error: statuses[status_id] || "reference solution failed validation"});
      }
    }

    //store in database
    await problem_model.create({ ...req.body,boilerplateCode,referenceSolution, problemCreator: req.user._id });
    res.status(201).json("Problem created successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProblem = (req, res) => {};

const getAllProblems = (req, res) => {};

const getProblem = (req, res) => {};

const solvedProblems = (req, res) => {};

const updateProblem = (req, res) => {};

module.exports = {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblem,
  solvedProblems,
  updateProblem,
};

/*
{
source_code:{},
language_id:int,
stdin:[],
expected_output:[]
}

*/
