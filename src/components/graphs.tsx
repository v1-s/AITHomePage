"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const CircularGraphSection = () => {
  const data = [
    {
      label: "Integrated Solutions",
      value: 25,
      color: "#4CAF50",
      text: "Discover our holistic approach to learning through Integrated Solutions, designed to seamlessly blend diverse learning methodologies for cohesive and impactful team development.",
    },
    {
      label: "On-Demand Learning",
      value: 25,
      color: "#2196F3",
      text: "Unlock the power of flexibility with On-Demand Learning, empowering individuals and teams to access tailored learning resources anytime, anywhere, to meet their specific needs.",
    },
    {
      label: "Immersive Learning",
      value: 25,
      color: "#FF9800",
      text: "Dive deep into hands-on, engaging learning experiences with Immersive Learning, fostering collaboration and real-world application to maximize knowledge retention and skill development.",
    },
    {
      label: "Cohort Learning",
      value: 25,
      color: "#FFC107",
      text: "Transform learning into a collaborative journey with Cohort Learning, where individuals progress together through structured programs, enhancing peer-to-peer engagement and collective growth.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // Change active bar every 3 seconds
    return () => clearInterval(interval);
  }, [data.length]);

  const chartOptions = {
    title: {
      text: "Your Learning Ecosystem",
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
        name: "Learning Methods",
        type: "pie",
        radius: "70%",
        label: {
          show: true,
          formatter: "{b}: {d}%",
          fontWeight: "bold",
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.label,
          itemStyle: { color: item.color },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full md:w-4/5 lg:w-3/4 mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-maincolor_1 mb-4 text-center">
        A Customized Learning Experience
      </h2>
     

     
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {data.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md text-white font-bold transition-colors text-xs md:text-md ${
              activeIndex === index
                ? "bg-mainBlue"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="w-full">
        <ReactEcharts option={chartOptions} style={{ height: "400px", width: "100%" }} />
      </div>
      
      <div className="mt-4 text-center text-gray-700">
        <p className="text-lg font-bold text-maincolor_1">
          {data[activeIndex]?.label}
        </p>
        <p className="text-sm  md:text-md mt-2">
          {data[activeIndex]?.text}
        </p>
      </div>
    </div>
  );
};

export default CircularGraphSection;
