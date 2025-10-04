const axios = require("axios");
require("dotenv").config();

const getLanguageId = (lang) => {
  const languages = {
    "c++": 105,
    javascript: "102",
    java: 91,
    python: "109",
  };
  return languages[lang.toLowerCase()];
};

const batchSubmission = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "true",
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

module.exports = { batchSubmission, getLanguageId };
