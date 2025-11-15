function Person(name){
    this.name=name;
}

Person.prototype.whoIAM=function(){
    console.log(`Hey, I am ${this.name}`);
}

const p=new Person("Balram");
p.whoIAM();

const obj={};
obj.__proto__=p.__proto__;
console.log(p.__proto__)


//  {/* Test cases */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
//               {renderTestCases(
//                 "visibleTestCases",
//                 "Visible Test Cases (Shown to User)"
//               )}
//               {renderTestCases(
//                 "hiddenTestCases",
//                 "Hidden Test Cases (For Grading)"
//               )}
//             </div>

//             {/* Section 3: Boilerplate Code */}
//             <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
//               <h2 className="text-2xl font-bold text-indigo-400 mb-4">
//                 Boilerplate Code (Per Language)
//               </h2>

//               {/* Language Tabs */}
//               <div className="flex space-x-1 mb-4 border-b border-gray-700">
//                 <button
//                   type="button"
//                   className={`py-2 px-4 text-sm font-medium transition duration-150`}
//                 >
//                   English
//                 </button>
//               </div>

//               {/* Code Editor */}
//               {renderCodeEditor()}
//             </div>

//             {/* Reference Solution */}
//             <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
//               <h2 className="text-2xl font-bold text-indigo-400 mb-4">
//                 Reference Solution (Optimal)
//               </h2>

//               {/* Language Selection */}
//               <div className="w-64 mb-4">
//                 <label
//                   htmlFor="ref-lang"
//                   className="block text-sm font-medium text-gray-400 mb-2"
//                 >
//                   Solution Language
//                 </label>
//                 <select
//                   id="ref-lang"
//                   defaultValue="none"
//                   className="select select-neutral outline-none border-none"
//                 >
//                   <option disabled={true}>Select Solution Language</option>

//                   {SUPPORTED_LANGUAGES.map((lang) => (
//                     <option key={lang} value={lang}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Solution Editor */}
//               {renderCodeEditor()}
//               <p className="text-xs text-gray-500 mt-2">
//                 This solution is used by the system to verify test cases.
//               </p>
//             </div>