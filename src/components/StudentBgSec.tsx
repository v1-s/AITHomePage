"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

// Dynamically import ApexCharts to disable SSR
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const StudentBackgrounds = () => {
  const labels = [
    { percentage: "42%", text: "Working IT Professionals", positions: { sm: { top: "-12%", left: "60%" }, md: { top: "-6%", left: "48%" }, lg: { top: "-8%", left: "45%" } } },
    { percentage: "27%", text: "Freshers / College Passout / Job Seekers", positions: { sm: { top: "40%", left: "120%" }, md: { top: "38%", left: "100%" }, lg: { top: "35%", left: "110%" } } },
    { percentage: "13%", text: "Non IT with ZERO Coding Skills", positions: { sm: { top: "100%", left: "10%" }, md: { top: "80%", left: "30%" }, lg: { top: "80%", left: "35%" } } },
    { percentage: "9%", text: "Dropouts", positions: { sm: { top: "-10%", left: "25%" }, md: { top: "-8%", left: "30%" }, lg: { top: "0%", left: "30%" } } },
    { percentage: "5%", text: "Housewives", positions: { sm: { top: "12%", left: "5%" }, md: { top: "8%", left: "10%" }, lg: { top: "10%", left: "10%" } } },
    { percentage: "4%", text: "Service Workers", positions: { sm: { top: "52%", left: "-25%" }, md: { top: "40%", left: "0%" }, lg: { top: "30%", left: "2%" } } },
  ];

  const [windowWidth, setWindowWidth] = useState<number>(0);

  const getScreenSize = (): "sm" | "md" | "lg" => {
    if (windowWidth >= 1024) return "lg"; // Large screens
    if (windowWidth >= 768) return "md"; // Medium screens
    return "sm"; // Small screens
  };

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);
    updateWindowWidth(); // Initialize on mount
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "pie", // Use the correct type
      height: "100%",
    },
    labels: labels.map((label) => label.text),
    colors: ["#3B82F6", "#6366F1", "#22D3EE", "#A78BFA", "#F472B6", "#FACC15"],
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "70%",
        },
      },
    },
  };

  const series = [42, 27, 13, 9, 5, 4];

  return (
    <section className="bg-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-sm font-semibold tracking-wide text-gray-800">STUDENT BACKGROUNDS</h3>
        <h2 className="text-3xl font-bold text-gray-800 mt-2 glitter_text">
          Our Students Thrive Across Diverse <br /> Backgrounds and Opportunities
        </h2>
        <p className="text-gray-600 mt-4">
          At AchieversIT, our diverse students transform into skilled professionals from various backgrounds. With industry-relevant training, we empower individuals to excel in their chosen fields and achieve career success.
        </p>

        <div className="relative flex justify-center mt-[100px] w-[180px] h-[180px] sm:w-[400px] sm:h-[400px] lg:w-[400px] lg:h-[400px] mx-auto">
          <ApexCharts options={options} series={series} type="pie" height="100%" width="100%" />
          {labels.map((label, index) => {
            const screenSize = getScreenSize();
            const { top, left } = label.positions[screenSize];

            return (
              <div
                key={index}
                className="absolute text-gray-700 text-xs md:text-md lg:text-nowrap text-wrap "
                style={{
                  top,
                  left,
                  transform: "translate(-50%, -50%)",
                  maxWidth: "150px",
                  textAlign: "center",
                }}
              >
                <p className="md:text-sm text-gray-800 text-xs">{label.text}</p>
                <p className="font-bold md:text-lg text-xs">{label.percentage}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudentBackgrounds;


