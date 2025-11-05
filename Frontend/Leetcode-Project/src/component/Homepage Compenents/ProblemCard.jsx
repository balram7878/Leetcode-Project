import React, { useState, useEffect } from "react";
// MOCKING: Replacing external imports with mocked versions for standalone execution
// import { useDispatch, useSelector } from "react-redux";
// import { getSolvedProblems, getAllProblems } from "../../utils/problemSlice"; 

// --- MOCKED DATA AND HOOKS for the isolated environment ---

// Mock data structure matching expected Redux state
const MOCKED_PROBLEMS = [
  { _id: "p101", title: "Two Sum", difficulty: "easy", tags: ["Array", "Hashing"] },
  { _id: "p102", title: "Longest Substring Without Repeating Characters", difficulty: "medium", tags: ["String", "Sliding Window", "Pointer"] },
  { _id: "p103", title: "Median of Two Sorted Arrays", difficulty: "hard", tags: ["Array", "Binary Search"] },
  { _id: "p104", title: "Merge Two Sorted Lists", difficulty: "easy", tags: ["Linked List", "Recursion"] },
  { _id: "p105", title: "Maximum Subarray Sum", difficulty: "medium", tags: ["Array", "Dynamic Programming"] },
];

const MOCKED_SOLVED_IDS = ["p101", "p104"]; // Problem 101 and 104 are solved

// Mock useSelector hook
const useSelector = (selector) => {
  // Simulate Redux state structure
  const mockState = {
    auth: { user: { id: "mockUser123" } },
    problemSlice: {
      allProblems: MOCKED_PROBLEMS,
      solvedProblems: MOCKED_SOLVED_IDS.map(id => ({ problemId: id })),
      loading: false, // Start with loading false for UI demo
    },
  };
  return selector(mockState);
};

// Mock useDispatch hook
const useDispatch = () => () => { /* Mock dispatch function */ };

// --- Helper Components for Elegance ---

// Reusable Tag component
const Tag = ({ children, colorClass, size = 'sm' }) => (
  <span
    className={`px-3 py-0.5 text-xs font-medium rounded-full ${colorClass} ${size === 'lg' ? 'text-sm' : 'text-xs'}`}
  >
    {children}
  </span>
);

// Single Card Component for one problem
const SingleProblemCard = ({ problem, solvedProblemIds }) => {
  // We check problemId against the Set for O(1) complexity
  const isSolved = solvedProblemIds.has(problem._id); 
  const difficulty = problem.difficulty || 'easy';
  const tags = problem.tags || [];

  // Logic to determine color based on difficulty
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'bg-green-600 text-green-50 border border-green-700';
      case 'medium':
        return 'bg-yellow-600 text-yellow-50 border border-yellow-700';
      case 'hard':
        return 'bg-red-600 text-red-50 border border-red-700';
      default:
        return 'bg-gray-500 text-gray-50 border border-gray-600';
    }
  };

  const solvedColor = isSolved ? 'bg-indigo-700 text-white' : 'bg-gray-500 text-gray-200';
  const solvedText = isSolved ? 'Solved' : 'Unsolved';

  return (
    <div className="
      p-5 
      bg-gray-800 
      rounded-xl 
      shadow-lg 
      hover:shadow-indigo-500/20 
      hover:bg-gray-700 
      transition 
      duration-300 
      transform 
      hover:scale-[1.01]
      flex flex-col space-y-3
    ">
      
      {/* Top Row: Title and Solved Status */}
      <div className="flex justify-between items-start">
        <h2 className="font-extrabold text-xl text-white truncate pr-4">
          {problem.title || "Untitled Problem"}
        </h2>
        
        <Tag colorClass={solvedColor}>
          {solvedText}
        </Tag>
      </div>

      {/* Tags Row: Difficulty and Topics */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        
        {/* Difficulty Tag */}
        <Tag colorClass={getDifficultyColor(difficulty)}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Tag>
        
        {/* Topic Tags */}
        {tags.slice(0, 3).map((tag, index) => ( // Show max 3 tags for visual cleanliness
          <Tag key={index} colorClass="bg-gray-600 text-gray-200">
            {tag}
          </Tag>
        ))}
        {tags.length > 3 && <span className="text-xs text-gray-400">+{tags.length - 3} more</span>}
      </div>
      
      {/* Action/Description Area (You can add description or link here) */}
      <div className="pt-2">
        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition duration-150">
          View Problem &rarr;
        </button>
      </div>
    </div>
  );
};


// Main Component (Handling List, Fetching, and Loading)
function ProblemList() {
  const { user } = useSelector((state) => state.auth);
  // Using useState to demonstrate the loading state change
  const [demoLoading, setDemoLoading] = useState(true);
  
  // Use the mocked Redux state data
  const { allProblems, solvedProblems } = useSelector((state) => state.problemSlice);
  const dispatch = useDispatch();

  // Simulate data fetching delay and then set loading to false
  useEffect(() => {
    // We mock the dispatch calls since they rely on external utilities
    // dispatch(getSolvedProblems());
    // dispatch(getAllProblems());
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setDemoLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, [user, dispatch]);
  
  // Create a Set for quick O(1) lookup of solved problem status
  // We use the actual structure from the mock selector results
  const solvedProblemIds = new Set(solvedProblems.map(p => p.problemId)); 

  // Elegant Loading State (Enhanced Spinner)
  if (demoLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white">
        <div className="flex space-x-2 p-5">
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div> 
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-150"></div> 
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-300"></div> 
        </div>
        <p className="mt-4 text-gray-400">Loading problems list...</p>
      </div>
    );
  }

  // Handle case where problems are fetched but list is empty
  if (!allProblems || allProblems.length === 0) {
    return (
      <div className="p-10 text-center bg-gray-900 min-h-screen">
        <p className="text-xl text-gray-400">No coding problems are available right now.</p>
      </div>
    );
  }

  // Main Problem List View
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-white mb-8 border-b border-gray-700 pb-3">
        Code Challenge Board
      </h1>
      
      {/* Elegant Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProblems.map((problem) => (
          <SingleProblemCard
            key={problem._id} 
            problem={problem} 
            solvedProblemIds={solvedProblemIds} 
          />
        ))}
      </div>
    </div>
  );
}

// Export the main component
export default ProblemList;