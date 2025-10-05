const axios = require("axios");
require("dotenv").config();

const getLanguageId = (lang) => {
  const languages = {
    "c++": 105,
    javascript: 102,
    java: 91,
    python: 109,
  };
  return languages[lang.toLowerCase()];
};

const createBatchedSubmission = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": process.env.RAPID_HOST,
      "Content-Type": "application/json",
    },
    data: {
      submissions,
    },
  };
  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};

const getBatchedSubmission = async (tokens) => {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens,
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": process.env.RAPID_HOST,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  while (true) {
    const result = await fetchData();
    const isResultObtained = result.submissions.every((e) => e.status_id > 2);
    if (isResultObtained) return result;
    await setTimeout(() => {
      console.log("");
    }, 1000);
  }
};

const statuses = {
  1: "In Queue",
  2: "Processing",
  3: "Accepted",
  4: "Wrong Answer",
  5: "Time Limit Exceeded",
  6: "Compilation Error",
  7: "Runtime Error (SIGSEGV)",
  8: "Runtime Error (SIGXFSZ)",
  9: "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error",
};
module.exports = {
  createBatchedSubmission,
  getBatchedSubmission,
  getLanguageId,
  statuses,
};
