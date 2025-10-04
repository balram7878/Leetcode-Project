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
    "problemCreator",
  ];
  const allRequired = mandatoryFields.every((e) => problem.keys().includes(e));
  if (!allRequired) throw new Error("mandatory fields are missing");
};

module.exports=validateProblem;