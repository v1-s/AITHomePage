import React from "react";

const SkillsBarGraph = () => {
  const skills = [
    { label: "Basics", score: 25 },
    { label: "Development Workflow", score: 40 },
    { label: "React Components", score: 70 },
    { label: "Props", score: 60 },
    { label: "Rendering Lists", score: 50 },
    { label: "Component Lifecycle", score: 85 },
    { label: "Events", score: 75 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Skills Distribution</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Average score</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500"></div>
            <div className="w-5 h-5 bg-white rounded-full shadow absolute left-1 peer-checked:left-6 transition-all"></div>
          </label>
        </div>
      </div>

      {/* Bar Graph */}
      <div>
        {skills.map((skill, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">{skill.label}</span>
              <span className="text-sm text-gray-500">{skill.score}</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 bg-blue-500 rounded-full"
                style={{ width: `${skill.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">View all sub-skills</span>
        <div className="flex justify-between w-full text-sm text-gray-600">
          <span>Novice</span>
          <span>Expert</span>
          <span>Master</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsBarGraph;
