const validateProblem = (problem) => {

  const mandatoryFields = [
    "title",
    "description",
    "difficulty",
    "tags",
    "visibleTestCases",
    "hiddenTestCases",
    "boilerplateCode",
    "referenceSolution",
  ];
  const allRequired = mandatoryFields.every((e) => Object.keys(problem).includes(e));
  if (!allRequired) throw new Error("mandatory fields are missing");
};

module.exports=validateProblem;