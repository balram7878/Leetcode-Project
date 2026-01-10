import React, { useState } from 'react';

// Configuration for supported languages
const SUPPORTED_LANGUAGES = ["C++", "Java", "Python", "JavaScript", "Rust", "C"];
const DEFAULT_LANGUAGE_CODE = SUPPORTED_LANGUAGES[0];

// Initial state structure for a new problem
const initialProblemState = {
  title: '',
  description: '',
  difficulty: 'Easy',
  tags: ['Array'],
  visibleTestCases: [{ stdin: '1,2\n', expectedOutput: '3\n' }],
  hiddenTestCases: [{ stdin: '10,20\n', expectedOutput: '30\n' }],
  // Dynamic map to store code for each language
  boilerplate: SUPPORTED_LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: `// Write your ${lang} solution here` }), {}),
  referenceSolution: {
    language: DEFAULT_LANGUAGE_CODE,
    sourceCode: `// Optimal solution in ${DEFAULT_LANGUAGE_CODE}`
  }
};

// Reusable Button Component for adding/removing items
const IconButton = ({ children, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-1 rounded-full hover:bg-gray-700 transition duration-150 ${className}`}
  >
    {children}
  </button>
);

const CreateProblemPage = () => {
  const [problem, setProblem] = useState(initialProblemState);
  const [activeBoilerplateTab, setActiveBoilerplateTab] = useState(DEFAULT_LANGUAGE_CODE);
  
  // State for the reference solution tab, tracked separately from problem state
  const [activeSolutionLanguage, setActiveSolutionLanguage] = useState(DEFAULT_LANGUAGE_CODE); 

  // --- Generic Change Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProblem(prev => ({ ...prev, [name]: value }));
  };

  const handleDifficultyChange = (e) => {
    setProblem(prev => ({ ...prev, difficulty: e.target.value }));
  };

  // --- Test Case Handlers ---
  const handleTestCaseChange = (type, index, field, value) => {
    const updatedCases = problem[type].map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setProblem(prev => ({ ...prev, [type]: updatedCases }));
  };

  const addTestCase = (type) => {
    setProblem(prev => ({ ...prev, [type]: [...prev[type], { stdin: '', expectedOutput: '' }] }));
  };

  const removeTestCase = (type, index) => {
    setProblem(prev => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
  };

  // --- Tag Handlers ---
  const handleTagChange = (index, value) => {
    const newTags = problem.tags.map((tag, i) => (i === index ? value : tag));
    setProblem(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setProblem(prev => ({ ...prev, tags: [...prev.tags, 'new-tag'] }));
  };

  const removeTag = (index) => {
    setProblem(prev => ({ ...prev, tags: problem.tags.filter((_, i) => i !== index) }));
  };
  
  // --- Code Handlers ---
  const handleBoilerplateChange = (language, code) => {
    setProblem(prev => ({
      ...prev,
      boilerplate: { ...prev.boilerplate, [language]: code }
    }));
  };

  const handleReferenceSolutionChange = (language, code) => {
    setProblem(prev => ({
      ...prev,
      referenceSolution: {
        language: language,
        sourceCode: code
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Problem Data:", problem);
    // In a real application, you would send 'problem' data to your server here.
    // Display submission successful message (replace with modal)
    alert("Problem submitted successfully! Check console for data structure.");
  };

  // --- Component Render Helpers ---
  const renderTestCases = (type, title) => (
    <div className="space-y-4 rounded-lg bg-gray-700/50 p-4 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      {problem[type].map((testCase, index) => (
        <div key={index} className="border-t border-gray-700 pt-4 relative">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Test Case {index + 1}</h4>
          
          <div className="flex gap-4">
            {/* STDIN Input */}
            <div className="flex-1">
              <label htmlFor={`${type}-stdin-${index}`} className="block text-sm font-medium text-gray-400 mb-1">STDIN</label>
              <textarea
                id={`${type}-stdin-${index}`}
                rows="3"
                value={testCase.stdin}
                onChange={(e) => handleTestCaseChange(type, index, 'stdin', e.target.value)}
                className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 5"
              />
            </div>
            
            {/* Expected Output Input */}
            <div className="flex-1">
              <label htmlFor={`${type}-output-${index}`} className="block text-sm font-medium text-gray-400 mb-1">Expected Output</label>
              <textarea
                id={`${type}-output-${index}`}
                rows="3"
                value={testCase.expectedOutput}
                onChange={(e) => handleTestCaseChange(type, index, 'expectedOutput', e.target.value)}
                className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 15"
              />
            </div>
          </div>
          
          <IconButton 
            onClick={() => removeTestCase(type, index)} 
            className="absolute top-2 right-2 text-red-400"
          >
            {/* X icon for removing test case */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
          </IconButton>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addTestCase(type)}
        className="mt-4 text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium"
      >
        {/* Plus icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
        Add Test Case
      </button>
    </div>
  );

  const renderCodeEditor = (language, code, onChangeHandler) => (
    <textarea
      key={language}
      rows="10"
      value={code}
      onChange={(e) => onChangeHandler(language, e.target.value)}
      className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-4 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-y"
      placeholder={`Enter ${language} code here...`}
    />
  );
  
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-extrabold text-white mb-8 border-b border-gray-700 pb-3">
          Create New Coding Problem
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Core Problem Details */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Core Details</h2>
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Problem Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={problem.title}
                onChange={handleInputChange}
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Description (Markdown Supported)</label>
              <textarea
                id="description"
                name="description"
                rows="8"
                value={problem.description}
                onChange={handleInputChange}
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-y"
                placeholder="Write the full problem statement here (e.g., constraints, input format, output format)..."
                required
              />
            </div>
            
            {/* Difficulty & Tags */}
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Difficulty */}
              <div className="flex-1">
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-400 mb-1">Difficulty</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={problem.difficulty}
                  onChange={handleDifficultyChange}
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Tags */}
              <div className="flex-2 w-full">
                <label className="block text-sm font-medium text-gray-400 mb-1">Tags (Max 5)</label>
                <div className="flex flex-wrap gap-2 items-center">
                  {problem.tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-gray-700 rounded-full px-3 py-1">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        className="bg-transparent text-gray-200 text-sm focus:outline-none w-20"
                      />
                      <IconButton onClick={() => removeTag(index)} className="text-gray-400 hover:text-red-400 ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </IconButton>
                    </div>
                  ))}
                  {problem.tags.length < 5 && (
                    <IconButton onClick={addTag} className="text-indigo-400 hover:bg-indigo-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: Test Cases */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderTestCases('visibleTestCases', 'Visible Test Cases (Shown to User)')}
            {renderTestCases('hiddenTestCases', 'Hidden Test Cases (For Grading)')}
          </div>

          {/* Section 3: Boilerplate Code */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Boilerplate Code (Per Language)</h2>
            
            {/* Language Tabs */}
            <div className="flex space-x-1 mb-4 border-b border-gray-700">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveBoilerplateTab(lang)}
                  className={`py-2 px-4 text-sm font-medium transition duration-150 ${
                    activeBoilerplateTab === lang
                      ? 'border-b-2 border-indigo-500 text-indigo-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            
            {/* Code Editor */}
            {renderCodeEditor(
              activeBoilerplateTab, 
              problem.boilerplate[activeBoilerplateTab], 
              handleBoilerplateChange
            )}
          </div>

          {/* Section 4: Reference Solution */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Reference Solution (Optimal)</h2>
            
            {/* Language Selection */}
            <div className="w-64 mb-4">
              <label htmlFor="ref-lang" className="block text-sm font-medium text-gray-400 mb-1">Solution Language</label>
              <select
                id="ref-lang"
                value={activeSolutionLanguage}
                onChange={(e) => setActiveSolutionLanguage(e.target.value)}
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            {/* Solution Editor */}
            {renderCodeEditor(
              activeSolutionLanguage,
              problem.referenceSolution.sourceCode,
              (lang, code) => handleReferenceSolutionChange(lang, code)
            )}
            <p className="text-xs text-gray-500 mt-2">This solution is used by the system to verify test cases.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg shadow-indigo-500/50"
          >
            Submit Problem for Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProblemPage;