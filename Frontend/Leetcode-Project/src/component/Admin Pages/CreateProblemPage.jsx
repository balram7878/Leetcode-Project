import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

const schema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be at most 100 characters")
    .trim(),
  description: z
    .string()
    .min(20)
    .max(500, "Description can't exceed 500 characters")
    .trim(),
  difficulty: z
    .enum(["Easy", "Medium", "Hard"], {
      errorMap: () => ({ message: "Please select a difficulty level" }),
    })
    .default("Easy"),
  tags: z
    .array(
      z.enum([
        "Array",
        "Linked List",
        "Stack",
        "Queue",
        "Dynamic Programming",
        "Graph",
        "Tree",
      ])
    )
    .min(1, "Please select at least one tag")
    .max(5, "You can select up to 5 tags"),
});

const SUPPORTED_LANGUAGES = [
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "Rust",
  "C",
];

const TAGS = [
  "Array",
  "Linked List",
  "Stack",
  "Queue",
  "Dynamic Programming",
  "Graph",
  "Tree",
];

const tagOptions = TAGS.map((e) => ({ value: e, label: e }));

// Reusable Button Component for adding/removing items
// const IconButton = ({ children, onClick, className = "" }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`p-1 rounded-full hover:bg-gray-700 transition duration-150 ${className}`}
//   >
//     {children}
//   </button>
// );

// const renderTestCases = (type, title) => (
//   <div className="space-y-4 rounded-lg bg-gray-700/50 p-4 border border-gray-700">
//     <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>

//     <div className="border-t border-gray-700 pt-4 relative">
//       <h4 className="text-sm font-medium text-gray-300 mb-2">Test Case</h4>

//       <div className="flex gap-4">
//         {/* STDIN Input */}
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-400 mb-1">
//             STDIN
//           </label>
//           <textarea
//             rows="3"
//             className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="e.g., 5"
//           />
//         </div>

//         {/* Expected Output Input */}
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-400 mb-1">
//             Expected Output
//           </label>
//           <textarea
//             rows="3"
//             className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="e.g., 15"
//           />
//         </div>
//       </div>

//       <IconButton className="absolute top-2 right-2 text-red-400">
//         {/* X icon for removing test case */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </IconButton>
//     </div>

//     <button
//       type="button"
//       className="mt-4 text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium"
//     >
//       {/* Plus icon */}
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5 mr-1"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
//           clipRule="evenodd"
//         />
//       </svg>
//       Add Test Case
//     </button>
//   </div>
// );

// const renderCodeEditor = (language, code) => (
//   <textarea
//     key={language}
//     rows="10"
//     value={code}
//     className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-4 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-y"
//     placeholder={`Enter ${language} code here...`}
//   />
// );

const submitForm = (data) => {
  console.log(data);
};

export default function CreateProblemPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <>
      <div className="min-h-screen p-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-8 border-b border-gray-700 pb-3">
            Create New Coding Problem
          </h1>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">
                Core Details
              </h2>

              {/* title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Problem Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  {...register("title")}
                />
              </div>
              {errors.title ? (
                <span className="text-red-600 text-sm">
                  {errors.title.message}
                </span>
              ) : (
                ""
              )}

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Description (Markdown Supported)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-y"
                  placeholder="Write the full problem statement here (e.g., constraints, input format, output format)..."
                  required
                  {...register("description")}
                />
                {errors.description ? (
                  <span className="text-red-600 text-sm">
                    {errors.description.message}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Difficulty and tags */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    defaultValue="Easy"
                    name="difficulty"
                    className="select select-neutral outline-none border-none"
                    required
                    {...register("difficulty")}
                  >
                    <option disabled={true}>Select Problem Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  {errors.difficulty ? (
                    <span className="text-red-600 text-sm">
                      {errors.difficulty.message}
                    </span>
                  ) : (
                    "'"
                  )}
                </div>
                <div className="flex-2 w-full">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Tags (Max 5)
                  </label>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          isMulti
                          options={tagOptions}
                          className="text-black outline-none border-none"
                          classNamePrefix="select"
                          value={tagOptions.filter((option) =>
                            field.value?.includes(option.value)
                          )} // ✅ Convert strings -> {value,label}
                          onChange={(selected) =>
                            field.onChange(
                              selected.map((option) => option.value)
                            )
                          }
                          styles={{
                            control: (base) => ({
                              ...base,
                              backgroundColor: "#111827", // bg-gray-900
                              borderColor: "#374151", // border-gray-700
                              color: "#f9fafb",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#1f2937", // dropdown bg-gray-800
                              color: "#f9fafb",
                            }),
                            option: (base, { isFocused, isSelected }) => ({
                              ...base,
                              backgroundColor: isSelected
                                ? "#4f46e5"
                                : isFocused
                                ? "#374151"
                                : "transparent",
                              color: isSelected ? "white" : "#f9fafb",
                            }),
                            multiValue: (base) => ({
                              ...base,
                              backgroundColor: "#4f46e5", // chip bg (indigo-600)
                            }),
                            multiValueLabel: (base) => ({
                              ...base,
                              color: "white", // chip text
                            }),
                            multiValueRemove: (base) => ({
                              ...base,
                              color: "#cbd5e1",
                              ":hover": {
                                backgroundColor: "#1e3a8a",
                                color: "white",
                              },
                            }),
                          }}
                        />
                      </>
                    )}
                  />
                  {errors.tags && (
                    <span className="text-red-500 text-md">
                      {errors.tags.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-sm shadow-indigo-500/50 mt-10"
            >
              Submit Problem for Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
