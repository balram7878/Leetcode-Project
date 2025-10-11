const submission_model = require("../../models/Submission.model");
const problem_model = require("../../models/Problem.model");
const user_model = require("../../models/User.model");
const { statuses } = require("../../utils/judge.0");
const {
  createBatchedSubmission,
  getBatchedSubmission,
  getLanguageId,
} = require("../../utils/judge.0");

// Helper function to decode Base64 code snippets (MUST BE AVAILABLE)
// const decodeBase64 = (base64String) => {
//     if (!base64String || typeof base64String !== 'string') return '';
//     try {
//         // Assuming Buffer is available in your Node.js environment
//         return Buffer.from(base64String, 'base64').toString('utf8');
//     } catch (e) {
//         console.error("Base64 decoding failed:", e);
//         return '';
//     }
// };

const submit = async (req, res) => {
  try {
    // Standard practice: check for authenticated user
    const userId = req.user.sub;
    const problemId = req.params.id;

    if (!userId)
      return res.status(401).json({ message: "User not authenticated." });
    if (!problemId)
      return res.status(400).json({ message: "Problem ID not provided." });

    const { code, language } = req.body;

    // CRITICAL FIX 1: Decode the code
    // const code = decodeBase64(encodedCode);

    if (!code || !language)
      return res
        .status(400)
        .json({ message: "Code or language missing in solution." });

    const problem = await problem_model.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const { hiddenTestCases } = problem;
    const totalTestCases = hiddenTestCases.length;

    const submission = await submission_model.create({
      userId,
      problemId,
      code, // Store the DECODED code
      language,
      status: "Pending",
      totalTestCases: totalTestCases,
    });

    // --- Prepare Judge0 Submission ---
    const language_id = getLanguageId(language);
    const submissions = [];
    for (let { stdin, expected_output } of hiddenTestCases) {
      submissions.push({
        language_id,
        source_code: code.trim(), // Use the DECODED code for Judge0
        stdin,
        expected_output,
      });
    }

    // ... Judge0 Submission Flow (Tokens, Result) ...
    const submissionTokens = await createBatchedSubmission(submissions);
    const tokens = submissionTokens.map((e) => e.token);
    const tokenString = tokens.join(",");
    const finalResult = await getBatchedSubmission(tokenString);

    // --- Process Judge0 Results ---
    let totalTime = 0;
    let totalMemory = 0;
    let overallStatus = "Accepted"; // Assume accepted until proven otherwise
    let passedCount = 0;
    let overallErrorMessage = null;
    let firstErrorStatusId = null;

    for (let subResult of finalResult.submissions) {
      const { status_id, time, memory, stderr } = subResult;

      if (status_id !== 3) {
        // Status ID 3 is "Accepted"
        if (overallStatus === "Accepted") {
          // CRITICAL FIX 3: Set status to the descriptive error string
          overallStatus = statuses[status_id] || "Error";
          overallErrorMessage = stderr || statuses[status_id];
          firstErrorStatusId = status_id;
        }
        continue;
      }

      passedCount++;
      // Clean and accumulate metrics, handling potential null/invalid strings
      totalTime += time && parseFloat(time) ? parseFloat(time) : 0;
      totalMemory = Math.max(
        totalMemory,
        memory && parseInt(memory) ? parseInt(memory) : 0
      );
    }

    // --- Save Final Submission Result ---
    submission.status = overallStatus;
    submission.memory = totalMemory;
    submission.runtime = totalTime;
    submission.totalTestCasesPassed = passedCount;
    submission.errorMessage = overallErrorMessage;
    await submission.save(); // Save the fully updated document

    const user = await user_model.findById(userId);

    if (overallStatus === "Accepted") {
      if (!user.problemSolved.includes(problemId)) {
        user.problemSolved.push(problemId);
      }
      await user.save();

      return res.status(200).json({
        message: "Submission accepted!",
        status: overallStatus,
        passed: passedCount,
        runtime: totalTime,
        memory: totalMemory,
      });
    } else {
      return res.status(200).json({
        message: "Submission failed",
        status: overallStatus,
        passed: passedCount,
        error: overallErrorMessage,
        status_description: statuses[firstErrorStatusId] || "Unknown Error",
      });
    }
  } catch (err) {
    console.error("Submit Controller Error:", err);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
};

const run = async (req, res) => {
  try {
    const userId = req.user.sub;
    const problemId = req.params.id;

    if (!userId)
      return res.status(401).json({ message: "User not authenticated." });
    if (!problemId)
      return res.status(400).json({ message: "Problem ID not provided." });

    const { code, language } = req.body;

    // CRITICAL FIX 1: Decode the code
    // const code = decodeBase64(encodedCode);

    if (!code || !language)
      return res
        .status(400)
        .json({ message: "Code or language missing in solution." });

    const problem = await problem_model.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const { visibleTestCases } = problem;
    const totalTestCases = visibleTestCases.length;

    // --- Prepare Judge0 Submission ---
    const language_id = getLanguageId(language);
    const submissions = [];
    for (let { stdin, expected_output } of visibleTestCases) {
      submissions.push({
        language_id,
        source_code: code.trim(), // Use the DECODED code for Judge0
        stdin,
        expected_output,
      });
    }

    // ... Judge0 Submission Flow (Tokens, Result) ...
    const submissionTokens = await createBatchedSubmission(submissions);
    const tokens = submissionTokens.map((e) => e.token);
    const tokenString = tokens.join(",");
    const finalResult = await getBatchedSubmission(tokenString);

    // --- Process Judge0 Results ---
    let totalTime = 0;
    let totalMemory = 0;
    let overallStatus = "Accepted"; // Assume accepted until proven otherwise
    let passedCount = 0;
    let overallErrorMessage = null;
    let firstErrorStatusId = null;

    for (let subResult of finalResult.submissions) {
      const { status_id, time, memory, stderr } = subResult;

      if (status_id !== 3) {
        // Status ID 3 is "Accepted"
        if (overallStatus === "Accepted") {
          // CRITICAL FIX 3: Set status to the descriptive error string
          overallStatus = statuses[status_id] || "Error";
          overallErrorMessage = stderr || statuses[status_id];
          firstErrorStatusId = status_id;
        }
        continue;
      }

      passedCount++;
      // Clean and accumulate metrics, handling potential null/invalid strings
      totalTime += time && parseFloat(time) ? parseFloat(time) : 0;
      totalMemory = Math.max(
        totalMemory,
        memory && parseInt(memory) ? parseInt(memory) : 0
      );
    }

    if (overallStatus === "Accepted") {
      return res.status(200).json({
        message: "Solution accepted!",
        status: overallStatus,
        passed: `${passedCount}/${totalTestCases}`,
        runtime: totalTime,
        memory: totalMemory,
      });
    } else {
      return res.status(200).json({
        message: "Incorrect Solution",
        status: overallStatus,
        passed: `${passedCount}/${totalTestCases}`,
        error: overallErrorMessage,
        status_description: statuses[firstErrorStatusId] || "Unknown Error",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" + err.message });
  }
};

const totalSubmissions = async (req, res) => {
  try {
    const userId = req.user.sub;
    const problemId = req.params.id;

    if (!userId)
      return res.status(401).json({ message: "User not authenticated." });
    if (!problemId)
      return res.status(400).json({ message: "Problem ID not provided." });

    const submissions =await submission_model.find({
      userId,
      problemId,
    }).select("_id userId problemId status totalTestCasesPassed");
    res.status(200).json(submissions || []);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error " + err.message,
    });
  }
};

module.exports = { submit, run,totalSubmissions };
