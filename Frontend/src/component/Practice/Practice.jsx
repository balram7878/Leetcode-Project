import { useState } from "react";

export default function Practice() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(
    `// Write your solution here\nint getSecondLargest(vector<int>& arr) {\n    // Your code here\n    return -1;\n}\n`,
  );
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("case1");
  const [problemTab, setProblemTab] = useState("description");
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    setRunning(true);
    setOutput("");
    setTimeout(() => {
      setRunning(false);
      setOutput("Sample output:\nHello, world!\n(Replace with real runner)");
    }, 700);
  };

  const maximizeEditor = () => {
    setIsMaximized(!isMaximized);
  };

  const autoFormatCode = () => {
    // Simple format - you can integrate Prettier or similar here
    const formatted = code
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
    setCode(formatted);
    alert("Code formatted!");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    if (confirm("Are you sure you want to reset the code to boilerplate?")) {
      setCode(
        `// Write your solution here\nint getSecondLargest(vector<int>& arr) {\n    // Your code here\n    return -1;\n}\n`,
      );
    }
  };

  return (
    <div
      className="fixed inset-0 text-gray-200 bg-[#121212] overflow-hidden flex flex-col"
      style={{
        fontFamily:
          "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
      }}
    >
      {/* Top Navigation Header */}
      <header className="bg-[#0b0b0b] border-b border-gray-800 px-6 h-16 flex items-center justify-between flex-shrink-0">
        <div
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          CodeTree
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={runCode}
            className={`px-4 py-1.5 rounded-lg text-md font-semibold transition-colors ${running ? "bg-gray-700 text-gray-300 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
            disabled={running}
          >
            {running ? "Running…" : "Run Code"}
          </button>
          <button className="px-4 py-1.5 rounded-lg text-md font-semibold border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors">
            Submit
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-base text-gray-300 hover:text-white transition font-medium">
            Problems
          </button>
          <button className="text-base text-gray-300 hover:text-white transition font-medium">
            Dashboard
          </button>
          <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold hover:bg-blue-700 transition text-xs">
            U
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left: Problem description (50%) */}
        <div className="w-1/2 flex flex-col border-r border-gray-800">
          {/* Problem Tabs */}
          <div className="flex border-b border-gray-800 flex-shrink-0">
            <button
              onClick={() => setProblemTab("description")}
              className={`px-4 py-3 text-lg font-medium border-b-2 transition ${
                problemTab === "description"
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setProblemTab("solution")}
              className={`px-4 py-3 text-lg font-medium border-b-2 transition ${
                problemTab === "solution"
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              Solution
            </button>
            <button
              onClick={() => setProblemTab("submissions")}
              className={`px-4 py-3 text-lg font-medium border-b-2 transition ${
                problemTab === "submissions"
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              Submissions
            </button>
          </div>

          {/* Problem Content */}
          <section className="flex-1 bg-[#0b0b0b] p-6 overflow-y-auto">
            {problemTab === "description" && (
              <div>
                <div className="flex items-start justify-between gap-4 mb-10">
                  <div className="flex justify-between w-full items-center">
                    <h1
                      className="text-4xl font-bold"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      295. Second Largest Element
                    </h1>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="px-2 py-1 rounded-lg text-sm text-white  bg-green-500 font-semibold">
                        EASY
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-green-500 text-white text-sm font-semibold">
                        SOLVED
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-gray-300 space-y-4 border border-gray-800 rounded-lg p-6 bg-[#0a0a0a]">
                  <div className="text-lg leading-relaxed">
                    Given an array of integers <code>arr</code>, return the
                    second largest distinct element from the array. If the
                    second largest element does not exist, return -1.
                  </div>

                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-lg">Example 1</h3>
                    <div className="bg-[#080808] border border-gray-800 rounded-md p-3 text-lg text-gray-300">
                      <div className="mb-2">
                        <strong>Input:</strong> arr = [12, 35, 1, 10, 34, 1]
                      </div>
                      <div>
                        <strong>Output:</strong> 34
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-lg">Example 2</h3>
                    <div className="bg-[#080808] border border-gray-800 rounded-md p-3 text-base text-gray-300">
                      <div className="mb-2">
                        <strong>Input:</strong> arr = [10, 10, 10]
                      </div>
                      <div>
                        <strong>Output:</strong> -1
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {["array", "sorting", "math"].map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 rounded-lg text-sm bg-gray-800 text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-4">
                    <h4 className="font-semibold mb-3 text-lg">Constraints</h4>
                    <ul className="text-md text-gray-300 space-y-1 list-disc list-inside">
                      <li>
                        2 ≤ arr.length ≤ 10<sup>5</sup>
                      </li>
                      <li>
                        1 ≤ arr[i] ≤ 10<sup>5</sup>
                      </li>
                      <li>All elements are unique</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {problemTab === "solution" && (
              <div className="text-gray-300">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Solution
                </h2>
                <p className="text-lg">Solutions will appear here.</p>
              </div>
            )}
            {problemTab === "submissions" && (
              <div className="text-gray-300">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Submissions
                </h2>
                <p className="text-lg">Your submissions will appear here.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right: Editor & Test Cases (50%) */}
        <div className="w-1/2 flex flex-col border-l border-gray-800">
          {/* Top Bar: Language Selector */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 flex-shrink-0 bg-[#0b0b0b]">
            {/* <label className="text-lg text-gray-400 mr-3">Language:</label> */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#080808] border border-gray-700 rounded-lg px-3 py-1.5 text-lg text-gray-200 outline-none hover:border-gray-600 transition"
            >
              <option value="cpp">C++</option>
              <option value="py">Python</option>
              <option value="js">JavaScript</option>
            </select>
            
          </div>

          {/* Code Editor - Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#080808] px-6 py-4">
            <div className="flex-1 flex flex-col overflow-hidden rounded-lg border border-gray-700">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full bg-[#0a0a0a] text-md text-gray-200 font-mono p-4 outline-none resize-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                spellCheck="false"
              />
              <style>{`textarea::-webkit-scrollbar { display: none; }`}</style>
            </div>
          </div>

          {/* Test Cases Panel */}
          <div className="flex-1 flex flex-col bg-[#0b0b0b] border-t border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-3 flex-shrink-0">
              <span className="text-xl">🧪</span>
              <div className="text-lg font-semibold">Test Cases</div>
            </div>

            {/* Test Case Tabs */}
            <div className="flex border-b border-gray-700 px-6 flex-shrink-0">
              <button
                onClick={() => setActiveTab("case1")}
                className={`px-4 py-2 text-md border-b-2 transition font-medium ${
                  activeTab === "case1"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Case 1
              </button>
              <button
                onClick={() => setActiveTab("case2")}
                className={`px-4 py-2 text-md border-b-2 transition font-medium ${
                  activeTab === "case2"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Case 2
              </button>
            </div>

            {/* Test Case Content */}
            <div
              className="flex-1 overflow-auto px-6 py-3"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`.testcases-scroll::-webkit-scrollbar { display: none; }`}</style>

              {activeTab === "case1" && (
                <div className="p-3 bg-[#080808] rounded-lg border border-gray-700 space-y-3">
                  <div>
                    <div className="text-md text-gray-500  font-semibold mb-1">
                      Input
                    </div>
                    <pre className="text-md text-gray-300 font-mono bg-[#0a0a0a] p-2 rounded border border-gray-800">
                      arr = [12, 35, 1, 10, 34, 1]
                    </pre>
                  </div>
                  <div>
                    <div className="text-md text-gray-500 font-semibold mb-1">
                      Expected Output
                    </div>
                    <pre className="text-md text-gray-300 font-mono bg-[#0a0a0a] p-2 rounded border border-gray-800">
                      34
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === "case2" && (
                <div className="p-3 bg-[#080808] rounded border border-gray-700 space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Input
                    </div>
                    <pre className="text-xs text-gray-300 font-mono bg-[#0a0a0a] p-2 rounded border border-gray-800">
                      arr = [10, 10, 10]
                    </pre>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Expected Output
                    </div>
                    <pre className="text-xs text-gray-300 font-mono bg-[#0a0a0a] p-2 rounded border border-gray-800">
                      -1
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Bar */}
          </div>
        </div>
      </main>
    </div>
  );
}
