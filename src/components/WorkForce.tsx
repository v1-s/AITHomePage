"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

const WorkforceSection = () => {
  const [selectedTab, setSelectedTab] = useState("Assess");

  const tabs = ["Assess", "Upskill", "Analyze", "Scale"];

  return (
    <div className="bg-white py-12 px-6 sm:px-12">
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase">
          GET FUTURE READY
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Transform your{" "}
          <span className="text-black font-black">
            workforce for the future
          </span>
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-8 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-sm font-medium rounded-lg ${
              selectedTab === tab
                ? "bg-maincolor_1 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedTab(tab)}
            aria-label={`Select ${tab} tab`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Left Section */}
        <div className="my-12">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-gray-700">
              Discover your team's strength and weaknesses
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Get visibility into what your teams know, where their skills stand
              today, and where they need to skill up.
            </p>
            <ul className="mt-4 text-gray-600 text-sm space-y-2">
              <li>• Measure your team’s skills</li>
              <li>• Do they have the skills to succeed in critical roles?</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-8">
          <SkillsBarGraph />
          <AssessmentChart />
        </div>
      </div>
    </div>
  );
};

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
    <div className="bg-white p-4 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800">Skills Distribution</h2>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">Average score</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-8 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500"></div>
            <div className="w-4 h-4 bg-white rounded-full shadow absolute left-1 peer-checked:left-5 transition-all"></div>
          </label>
        </div>
      </div>

      {/* Bar Graph */}
      <div>
        {skills.map((skill, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-700">{skill.label}</span>
              <span className="text-xs text-gray-500">{skill.score}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 bg-blue-500 rounded-full"
                style={{ width: `${skill.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-500">View all sub-skills</span>
        <div className="flex justify-between w-full text-xs text-gray-600">
          <span>Novice</span>
          <span>Expert</span>
          <span>Master</span>
        </div>
      </div>
    </div>
  );
};

const AssessmentChart = () => {
  const chartOptions = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
      data: ["Right answers", "Wrong answers", "Skipped questions"],
    },
    series: [
      {
        name: "Assessments",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "14",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 7, name: "Right answers", itemStyle: { color: "#34D399" } }, // Tailwind green
          { value: 2, name: "Wrong answers", itemStyle: { color: "#F87171" } }, // Tailwind red
          {
            value: 1,
            name: "Skipped questions",
            itemStyle: { color: "#FACC15" },
          }, // Tailwind yellow
        ],
      },
    ],
  };

  return (
    <div className="flex flex-wrap justify-center bg-white p-4 rounded-lg shadow-lg">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessments</h3>

      {/* ECharts Pie Chart */}
      <ReactECharts option={chartOptions} style={{ height: 200 }} />

      {/* Legend */}
      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li className="flex items-center">
          <span
            className="w-3 h-3 inline-block rounded-full mr-2"
            style={{ backgroundColor: "#34D399" }}
          ></span>
          Right answers
        </li>
        <li className="flex items-center">
          <span
            className="w-3 h-3 inline-block rounded-full mr-2"
            style={{ backgroundColor: "#F87171" }}
          ></span>
          Wrong answers
        </li>
        <li className="flex items-center">
          <span
            className="w-3 h-3 inline-block rounded-full mr-2"
            style={{ backgroundColor: "#FACC15" }}
          ></span>
          Skipped questions
        </li>
      </ul>

      {/* Summary */}
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>
          <p>7 Sub-skills assessed</p>
          <p>7 answered correctly</p>
          <p>2 answered wrong</p>
        </div>
      </div>
    </div>
  );
};

export default WorkforceSection;
