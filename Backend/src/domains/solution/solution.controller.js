const submission_model = require("../../models/Submission.model");
const problem_model = require("../../models/Problem.model");
const {
  createBatchedSubmission,
  getBatchedSubmission,
  getLanguageId,
} = require("../../utils/judge.0");
const submit = async (req, res) => {
  try {
    const userId = req.payload.sub;
    const problemId = req.params.id;

    if (!userId) return res.status(404).json({ message: "user not exist" });
    if (!problemId)
      return res.status(404).json({ message: "problem not exist" });

    const { code, language } = req.body;

    if (!code || !language)
      return res.status(404).json({ message: "incorrect solution" });

    const problem = await problem_model.findById(problemId);
    if (!problem) return res.status(404).json({ message: "problem not found" });

    const { hiddenTestCases } = problem;

    const solution = submission_model.create({
      userId,
      problemId,
      code,
      language,
      status: "Pending",
      totalTestCases: problem.hiddenTestCases.length,
    });

    const language_id = getLanguageId(language);
    const submissions = [];
    for (let { stdin, expected_output } of hiddenTestCases) {
      submissions.push({
        language_id,
        source_code: code.trim(),
        stdin,
        expected_output,
      });
    }

    const submissionTokens = await createBatchedSubmission(submissions);
    const tokens = submissionTokens.map((e) => e.token);
    const tokenString = tokens.json(",");
    const finalResult = await getBatchedSubmission(tokenString);

    let totalTime = 0;
    let totalMemory = 0;
    let status = "";
    let count = 0;
    let err = "";

    finalResult.submissions.map(({ status_id, memory, time, stderr }) => {
      if (status_id == 3) {
        status = "Accepted";
        totalMemory = Math.max(totalMemory, memory);
        totalTime = time + totalTime;
        err = null;
        count++;
      } else {
        status = "Error";
        err = stderr;
      }
    });

    (await solution).status = status;
    (await solution).memory = totalMemory;
    (await solution).runtime = totalTime;
    (await solution).totalTestCasesPassed = count;
    (await solution).errorMessage=err;
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const run = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.export = { submit, run };
