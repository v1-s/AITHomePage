"use client";

import { useState, useEffect,useCallback } from "react";

const CircularGraphSection = () => {
  const data = {
    "Integrated Solutions": {
      text: "Discover our holistic approach to learning through Integrated Solutions, designed to seamlessly blend diverse learning methodologies for cohesive and impactful team development.",
      colors: ["#4CAF50", "#FF9800", "#2196F3", "#FFC107"],
      labels: ["Integrated Solutions","Cohort Learning", "Immersive Learning", "On-Demand Learning"],
    },
    "On-Demand Learning": {
      text: "Unlock the power of flexibility with On-Demand Learning, empowering individuals and teams to access tailored learning resources anytime, anywhere, to meet their specific needs.",
      colors: ["#2196F3", "#4CAF50", "#FF9800", "#FFC107"],
      labels: ["Immersive Learning","On-Demand Learning", "Cohort Learning", "Integrated Solutions"],
    },
    "Immersive Learning": {
      text: "Dive deep into hands-on, engaging learning experiences with Immersive Learning, fostering collaboration and real-world application to maximize knowledge retention and skill development.",
      colors: ["#FF9800", "#4CAF50", "#2196F3", "#FFC107"],
      labels: ["On-Demand Learning", "Cohort Learning","Immersive Learning", "Integrated Solutions"],
    },
    "Cohort Learning": {
      text: "Transform learning into a collaborative journey with Cohort Learning, where individuals progress together through structured programs, enhancing peer-to-peer engagement and collective growth.",
      colors: ["#4CAF50", "#2196F3", "#FF9800", "#FFC107"],
      labels: [ "Immersive Learning", "Integrated Solutions", "On-Demand Learning","Cohort Learning"],
    },
  };

  const [activeOption, setActiveOption] = useState<keyof typeof data>("Integrated Solutions");
  const [progress, setProgress] = useState<number[]>([23, 23, 23, 23]);
  const [intervalPaused, setIntervalPaused] = useState(false);

  const options = Object.keys(data) as Array<keyof typeof data>;
  const handleOptionChange = useCallback((option: keyof typeof data) => {
    setActiveOption(option);
    setIntervalPaused(true);

    // Resume interval after 4 seconds
    setTimeout(() => {
      setIntervalPaused(false);
    }, 2500);

    const selectedLength = 30; // Selected bar length
    const totalGaps = 9; // Total gap percentage
    const remainingLength = 100 - selectedLength - totalGaps; // Length left for other bars
    const otherLength = remainingLength / 3; // Distribute equally among the other bars

    const newProgress = Array(4).fill(otherLength);
    const selectedIndex = options.indexOf(option);
    newProgress[selectedIndex] = selectedLength; // Assign the selected bar its length
    setProgress(newProgress);
  }, [options]);

  useEffect(() => {
    if (!intervalPaused) {
      const interval = setInterval(() => {
        const currentIndex = options.indexOf(activeOption);
        const nextIndex = (currentIndex + 1) % options.length;
        handleOptionChange(options[nextIndex]);
      },1000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [activeOption, intervalPaused,handleOptionChange,options]);

  const activeData = data[activeOption];

  return (
    <div className="relative flex flex-col items-center justify-center w-full md:w-4/5 lg:w-3/5 mx-auto">
      <h2 className="text-2xl font-bold text-maincolor_1 mb-4">
        A Customized Learning Experience
      </h2>
      <p className="text-center text-gray-700 mb-8 text-xs md:text-md">
        Deliver the right learning experience to the right people in the right
        format. With AchieversIT, you&apos;ve got options for everyone.
      </p>

      {/* Buttons */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-md text-white font-bold transition-colors text-xs md:text-md ${
              activeOption === option
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Circular Graph */}
      <div className="relative w-[180px]  h-[180px] md:w-[300px] md: h-[300px] ">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 35 37"
          className="transform -rotate-90 scale-100 w-full h-auto sm:w-1/2 md:w-1/3 lg:w-full"
        >
          {activeData.colors.map((color: string, index: number) => {
            const dashOffset =
              index === 0
                ? 0
                : progress.slice(0, index).reduce((a, b) => a + b, 0) +
                  index * 2.25;

            return (
              <circle
              key={index}
              cx="18"
              cy="18"
              r="15.8155"
              fill="transparent"
              stroke={color}
              strokeWidth="2"
              strokeDasharray={`${progress[index]} ${(100 - progress[index])}`}
              strokeDashoffset={`-${dashOffset}`}
              className={`transition-all duration-700 ease-in-out ${
                activeOption === options[index] ? 'scale-[1.1]' : 'scale-100'
              }`}
              style={{
                transformOrigin: 'center', // Ensures scaling is centered
              }}
            />
            
            );
          })}
        </svg>

        {/* Central Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center -top-[45%] md:top-0">
          <h2 className="text-maincolor_1 text-sm font-bold transition-transform duration-700 ease-in-out transform  md:text-lg">
            Your Learning
          </h2>
          <h3 className="text-maincolor_1 text-sm font-bold transition-transform duration-700 ease-in-out transform  md:text-lg">
            Eco System
          </h3>
        </div>

        {/* External Labels */}
        <div
          className={`absolute top-[3%] md:-right-[50%] -right-[20%] text-center transition-all duration-700 max-w-10 md:w-full  ${
    activeOption === options[0] ? 'font-bold uppercase' : 'font-normal'
  }`}
          style={{ color: activeData.colors[0] }}
        >
          <p className="font-bold transition-transform duration-700 ease-in-out transform translate-x-0 text-wrap text-xs md:text-md">
            {activeData.labels[0]}
          </p>
        </div>
        <div
  className={`absolute  bottom-[20%] -right-[10%]  md:bottom-[10%] md:-right-[40%]  text-center transition-all duration-700 max-w-10 md:w-full  ${
    activeOption === options[1] ? 'font-bold uppercase' : 'font-normal'
  }`}
  style={{ color: activeData.colors[1] }}
>
          <p className="font-bold transition-transform duration-700 ease-in-out transform translate-y-0 text-xs md:text-md">
            {activeData.labels[1]}
          </p>
        </div>
        <div
  className={`absolute  bottom-[20%]  -left-[20%] md:bottom-[20%] md:-left-[50%] text-center transition-all duration-700 max-w-10 md:w-full ${
    activeOption === options[2] ? 'font-bold uppercase' : 'font-normal'
  }`}
  style={{ color: activeData.colors[2] }}
>
          <p className="font-bold transition-transform duration-700 ease-in-out transform translate-y-0 text-xs md:text-md">
            {activeData.labels[2]}
          </p>
        </div>
        <div
  className={`absolute     bottom-0  -left-[30%] md: bottom-[80%] md:-left-[50%]  text-center transition-all duration-700 max-w-10 md:w-full ${
    activeOption === options[3] ? 'font-bold uppercase' : 'font-normal'
  }`}
  style={{ color: activeData.colors[3] }}
>
          <p className="font-bold transition-transform duration-700 ease-in-out transform translate-y-0 text-wrap text-xs md:text-md">
            {activeData.labels[3]}
          </p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center transition-opacity duration-700 ease-in-out opacity-100">
        <h3 className="text-xl font-bold text-maincolor_1 mb-2 transition-transform duration-700 ease-in-out transform translate-x-0 uppercase">
          {activeOption}
        </h3>
        <p className="text-gray-700 transition-transform duration-700 ease-in-out transform translate-x-0 text-xs md:text-md">
          {activeData.text}
        </p>
      </div>
    </div>
  );
};

export default CircularGraphSection;
