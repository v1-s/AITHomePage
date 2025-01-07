"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Image from "next/image";

// Type definitions for the API response
interface CourseData {
  course: string;
  salaries: number[];
  image: string[];
}

interface ApiResponse {
  status: number;
  data: {
    popular: CourseData[];
  };
}

const PayScale = ({ courseUrl }: { courseUrl: string }) => {
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [popularCourses, setPopularCourses] = useState<CourseData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const salaryChartRef = useRef<Chart | null>(null);

  // Fetch the course data from the API
  useEffect(() => {
    fetch(
      `http://13.232.95.229:3000/course/courseProjects?courseUrl=${courseUrl}`
    )
      .then((response) => response.json())
      .then((responseArray: ApiResponse[]) => {
        const data = responseArray[0]; // Access the first object in the response array
        if (data.status === 200 && data.data?.popular) {
          setPopularCourses(data.data.popular);
          if (data.data.popular.length > 0) {
            setSelectedDesignation(data.data.popular[0].course); // Set first course as default if available
          }
        } else {
          setError("Failed to fetch valid data.");
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError("Error fetching course projects.");
      });
  }, [courseUrl]);

  // Initialize the chart with salary data
  useEffect(() => {
    const initializeChart = (salaries: number[]) => {
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;

      if (salaryChartRef.current) {
        salaryChartRef.current.destroy();
      }

      salaryChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Min", "Average", "Max"],
          datasets: [
            {
              label: "Annual Salary (₹ in LPA)",
              data: salaries,
              backgroundColor: "rgba(24, 144, 255, 0.7)",
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw as number;
                  return `₹${value}L`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 14,
                },
                color: "#333",
              },
            },
            y: {
              beginAtZero: true,
              max: 30,
              grid: {
                display: false,
              },
              ticks: {
                callback: (tickValue) => `₹${tickValue}L`,
                font: {
                  size: 14,
                },
                color: "#333",
              },
            },
          },
        },
      });
    };

    if (popularCourses.length > 0 && selectedDesignation) {
      const selectedCourse = popularCourses.find(
        (course) => course.course === selectedDesignation
      );
      if (selectedCourse) {
        initializeChart(selectedCourse.salaries);
      }
    }

    return () => {
      if (salaryChartRef.current) {
        salaryChartRef.current.destroy();
      }
    };
  }, [selectedDesignation, popularCourses]);

  // Autoplay logic to cycle through designations
  useEffect(() => {
    if (popularCourses.length > 0) {
      const intervalId = setInterval(() => {
        setSelectedDesignation((prevDesignation) => {
          const currentIndex = popularCourses.findIndex(
            (course) => course.course === prevDesignation
          );
          const nextIndex =
            (currentIndex + 1) % popularCourses.length; // Loop back to the first designation
          return popularCourses[nextIndex].course;
        });
      }, 5000); // Change every 5 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [popularCourses]);

  // Render
  if (error) {
    return (
      <div className="text-center my-10">
        <h2 className="text-2xl text-maincolor_1">{error}</h2>
      </div>
    );
  }

  if (popularCourses.length === 0) {
    return (
      <div className="text-center my-10">
        <h2 className="text-2xl text-gray-600">Loading data...</h2>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-6xl mx-auto my-20 mt-10 p-6 lg:p-0">
      <h2 className="text-2xl font-bold text-center ">
        In-Demand Roles - Salaries - Top Employers
      </h2>
      <p className="text-gray-600 mb-10 text-center relative element after:bottom-N15 glitter_text">
        Explore the most popular courses, their salaries, and top employers.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start shadow-card p-4 rounded-lg bg-white">
        <div className="col-span-1 lg:border-r border-gray-200 pr-4">
          <h3 className="text-xl font-semibold mb-4">Designation</h3>
          <div className="flex flex-col h-full">
            {popularCourses.map((designation) => (
              <button
                key={designation.course}
                className={`block w-full text-left p-4 rounded-md mb-2 ${
                  selectedDesignation === designation.course
                    ? "bg-maincolor_1 text-white"
                    : "bg-Bg1 text-black"
                }`}
                onClick={() => setSelectedDesignation(designation.course)}
                aria-label={`Select ${designation.course}`}
              >
                {designation.course}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-1 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Annual Salary</h3>
          <div className="w-full">
            <canvas
              ref={chartRef}
              height="256"
              style={{ height: "256px" }}
              aria-label="Annual Salary Chart"
            ></canvas>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Hiring Companies</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 md:gap-6">
            {popularCourses
              .find((course) => course.course === selectedDesignation)
              ?.image.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt="Hiring Company"
                  width={100}
                  height={100}
                  className="object-contain mx-auto h-16 mx-auto  p-2 w-100 shadow bg-Bg1 bg-cover"
                  aria-label="Hiring Company Logo"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayScale;

