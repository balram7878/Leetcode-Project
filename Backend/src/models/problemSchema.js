const { Schema,model } = require("mongoose");

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Hard", "Medium", "Easy"],
      required: true,
    },
    tags: {
      type: String,
      enum: [
        "Array",
        "String",
        "Linked List",
        "Stack",
        "Tree",
        "Graph",
        "Heap",
        "Queue",
        "Dynamic Programming",
      ],
      required: true,
    },
    visibleTestCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],
    hiddenTestCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],
    boilerplateCode: [
      {
        language: {
          type: String,
          required: true,
          enum: ["C++", "Java", "Python", "JavaScript", "Rust", "C"],
        },
        code: {
          type: String,
          required: true,
        },
      },
    ],
    problemCreator: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true
    },
  },
  { timestamps: true }
);

const problem=model("problem",problemSchema);

module.exports = problem;
