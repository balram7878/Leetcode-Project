const validateProblem = require("../../utils/validate.problem");
const { getLanguageId, batchSubmission } = require("../../utils/judge.0");

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
          source_code,
          stdin,
          expected_output,
        });
      }
    }
    const submissionTokens=await batchSubmission(submissions);
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
