"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const TrainingEducationGraphs = () => {
  const [workExperienceOptions, setWorkExperienceOptions] = useState({});
  const [educationQualificationOptions, setEducationQualificationOptions] = useState({});

  // Function to update chart options based on screen size
  const updateChartOptions = () => {
    const isSmallScreen = window.innerWidth < 768;

    // Work Experience Donut Chart Data
    setWorkExperienceOptions({
      title: {
        text: "Work Experience Distribution",
        left: "center",
        textStyle: {
          fontWeight: "bold",
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}%",
      },
      legend: {
        bottom: 0,
        left: "center",
      },
      series: [
        {
          name: "Work Experience",
          type: "pie", // Donut chart type
          radius: ["50%", "70%"], // Donut style
          label: {
            show: true,
            formatter: isSmallScreen ? "{b}\n{d}%" : "{b}: {d}%", // Adjust label format
            fontWeight: "bold",
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          data: [
            { value: 40, name: "Freshers" },
            { value: 25, name: "0-2 Years" },
            { value: 20, name: "2-5 Years" },
            { value: 15, name: "More than 5 Years" },
          ],
        },
      ],
    });

    // Educational Qualification 3D Pie Chart Data
    setEducationQualificationOptions({
      title: {
        text: "Education Qualification Distribution",
        left: "center",
        textStyle: {
          fontWeight: "bold",
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}%",
      },
      legend: {
        type: "scroll",
        bottom: 0,
        left: "center",
        textStyle: {
          fontSize: 12,
        },
        itemGap: 10,
      },
      series: [
        {
          name: "Education Qualification",
          type: "pie", // 3D pie chart
          radius: ["40%", "70%"], // Donut style
          avoidLabelOverlap: true,
          label: {
            show: true,
            formatter: isSmallScreen ? "{b}\n{d}%" : "{b}: {d}%", // Adjust label format
            fontWeight: "bold",
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
          data: [
            { value: 60, name: "B.E./B.Tech/M.Tech" },
            { value: 30, name: "MBA" },
            { value: 10, name: "B.Sc./BCA/MCA" },
          ],
        },
      ],
    });
  };

  // Handle screen size changes
  useEffect(() => {
    updateChartOptions(); // Initial call

    // Update on window resize
    const handleResize = () => {
      updateChartOptions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="py-12 px-4">
      <h2 className="text-xl md:text-3xl font-bold text-center glitter_text pb-2 relative elementl mb-12">
        Satisfy your multiple hiring needs with our broad learners base
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Work Experience Donut Chart */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-lg">
          <ReactEcharts
            option={workExperienceOptions}
            style={{ height: "400px", width: "100%" }}
            opts={{ renderer: "svg" }}
            className="w-[500px]"

          />
        </div>
        {/* Education Qualification 3D Pie Chart */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-lg text-wrap">
          <ReactEcharts
            option={educationQualificationOptions}
            style={{ height: "400px", width: "100%" }}
            opts={{ renderer: "svg" }}
            className="text-wrap"
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingEducationGraphs;
