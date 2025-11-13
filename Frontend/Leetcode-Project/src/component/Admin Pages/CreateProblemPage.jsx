const SUPPORTED_LANGUAGES = [
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "Rust",
  "C",
];

// Reusable Button Component for adding/removing items
const IconButton = ({ children, onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-1 rounded-full hover:bg-gray-700 transition duration-150 ${className}`}
  >
    {children}
  </button>
);

const renderTestCases = (type, title) => (
  <div className="space-y-4 rounded-lg bg-gray-700/50 p-4 border border-gray-700">
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>

    <div className="border-t border-gray-700 pt-4 relative">
      <h4 className="text-sm font-medium text-gray-300 mb-2">Test Case</h4>

      <div className="flex gap-4">
        {/* STDIN Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            STDIN
          </label>
          <textarea
            rows="3"
            className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 5"
          />
        </div>

        {/* Expected Output Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Expected Output
          </label>
          <textarea
            rows="3"
            className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 15"
          />
        </div>
      </div>

      <IconButton className="absolute top-2 right-2 text-red-400">
        {/* X icon for removing test case */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      </IconButton>
    </div>

    <button
      type="button"
      className="mt-4 text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium"
    >
      {/* Plus icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        />
      </svg>
      Add Test Case
    </button>
  </div>
);

const renderCodeEditor = (language, code) => (
  <textarea
    key={language}
    rows="10"
    value={code}
    className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-4 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-y"
    placeholder={`Enter ${language} code here...`}
  />
);

export default function CreateProblemPage() {
  return (
    <>
      <div className="min-h-screen p-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-8 border-b border-gray-700 pb-3">
            Create New Coding Problem
          </h1>
          <form action="">
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
                />
              </div>
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
                />
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
                    defaultValue="all"
                    className="select select-neutral outline-none border-none"
                  >
                    <option disabled={true}>Select Problem Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div className="flex-2 w-full">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Tags (Max 5)
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
              {renderTestCases(
                "visibleTestCases",
                "Visible Test Cases (Shown to User)"
              )}
              {renderTestCases(
                "hiddenTestCases",
                "Hidden Test Cases (For Grading)"
              )}
            </div>
            {/* Section 3: Boilerplate Code */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">
                Boilerplate Code (Per Language)
              </h2>

              {/* Language Tabs */}
              <div className="flex space-x-1 mb-4 border-b border-gray-700">
                <button
                  type="button"
                  className={`py-2 px-4 text-sm font-medium transition duration-150`}
                >
                  English
                </button>
              </div>

              {/* Code Editor */}
              {renderCodeEditor()}
            </div>
            {/* Reference Solution */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">
                Reference Solution (Optimal)
              </h2>

              {/* Language Selection */}
              <div className="w-64 mb-4">
                <label
                  htmlFor="ref-lang"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Solution Language
                </label>
                <select
                  id="difficulty"
                  defaultValue="all"
                  className="select select-neutral outline-none border-none"
                >
                  <option disabled={true}>Select Solution Language</option>

                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Solution Editor */}
              {renderCodeEditor()}
              <p className="text-xs text-gray-500 mt-2">
                This solution is used by the system to verify test cases.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg shadow-indigo-500/50 mt-10"
            >
              Submit Problem for Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
