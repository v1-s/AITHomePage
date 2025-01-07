"use client";
import React, { useState, useEffect, useCallback } from "react";

function WorriedSection() {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const [isSmallMediumScreen, setIsSmallMediumScreen] = useState(false);
  const [trendCourses, setTrendCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleOptions, setVisibleOptions] = useState<
    { course_name: string; courseShortDesc: string; course_url: string }[]
  >([]);

  // Auto-scroll interval
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      setCurrentActiveIndex((prevIndex) =>
        prevIndex + 1 >= trendCourses.length ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(autoScrollInterval);
  }, [trendCourses]);

  // Screen size listener
  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallMediumScreen(window.innerWidth < 1024); // lg breakpoint
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Fetch trend courses data
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const response = await fetch(
          "http://13.232.95.229:3000/common/getCoursesPerCategory?region=global"
        );
        const data = await response.json();
        setTrendCourses(data || []);
        setLoading(false);
      } catch {
        setError("Failed to fetch courses.");
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, []);

  // Update visible options when trendCourses or currentActiveIndex changes
  const updateVisibleOptions = useCallback(() => {
    const pageSize = 5;
    const startIndex = Math.floor(currentActiveIndex / pageSize) * pageSize;
    const endIndex = startIndex + pageSize;
    setVisibleOptions(trendCourses.slice(startIndex, endIndex));
  }, [currentActiveIndex, trendCourses]);

  useEffect(() => {
    updateVisibleOptions();
  }, [currentActiveIndex, trendCourses, updateVisibleOptions]);

  // Scroll function
  const scroll = (direction: string) => {
    setCurrentActiveIndex((prev) => {
      const newIndex =
        direction === "up" || direction === "left" ? prev - 1 : prev + 1;
      return Math.max(0, Math.min(newIndex, trendCourses.length - 1));
    });
  };

  // Generate options for display
  const generateOptions = () => {
    const pageSize = 5;
    const startIndex = Math.floor(currentActiveIndex / pageSize) * pageSize;

    return visibleOptions.map((option, index) => {
      const globalIndex = startIndex + index; // Calculate global index
      const isActive = currentActiveIndex === globalIndex;

      return (
        <React.Fragment key={globalIndex}>
          <div
            id={`category-${globalIndex}`}
            className={`w-full p-2 py-4 option-item text-black cursor-pointer text-center relative ${
              isActive
                ? "bg-maincolor_1 text-white font-bold transform transition-transform duration-500 ease-in-out"
                : "transform transition-transform duration-300 ease-in-out text-black"
            }`}
            onClick={() => setCurrentActiveIndex(globalIndex)} // Update active index
          >
            {option?.course_name}
          </div>
          <hr className="w-full border-gray-300" />
        </React.Fragment>
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full pb-4 pt-5">
    {/* Section Heading */}
    <div className="w-full flex flex-col justify-center items-center pb-3 mb-10">
      <h3 className="text-2xl md:text-3xl font-bold text-center relative element pb-1">
        Are You Also Worried?
      </h3>
    </div>
  
    {/* Flex Row Layout */}
    <div className="flex flex-col lg:flex-row items-stretch mx-auto gap-0 w-full md:w-3/4 justify-center">
      {/* Options List and Scroll Buttons */}
      <div className="lg:shadow-glassShadow lg:rounded-md text-center flex flex-col items-center lg:w-1/3 border border-gray-300">
        {!isSmallMediumScreen && (
          <div className="flex flex-col justify-center items-center gap-6 mb-0 w-full bg-transparent md:bg-white">
            {/* Scroll Up Button */}
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={() => scroll("up")}
              disabled={currentActiveIndex === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-up hover:bg-maincolor_1 hover:text-white rounded-md"
                aria-label="Scroll Up"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
  
            {/* Options List */}
            <div
              id="options-list"
              className="mt-2 flex flex-col space-y-1 w-full justify-center items-center overflow-y-auto scroll-smooth capitalize text-black"
            >
              {generateOptions()}
            </div>
  
            {/* Scroll Down Button */}
            <button
              className="text-gray-700 hover:text-gray-900 p-1"
              onClick={() => scroll("down")}
              disabled={currentActiveIndex === trendCourses.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-down hover:bg-maincolor_1 hover:text-white rounded-md"
                aria-label="Scroll Down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
  
      {/* Card Content */}
      <div className="block relative lg:w-1/2 flex flex-col justify-between bg-cyan-950 shadow-glassShadow border border-cyan-950 rounded-md">
        <article className="relative bg-center p-4 flex items-center justify-center h-full">
          <div className="p-4 text-center h-full flex flex-col justify-center items-center gap-5">
            <p className="text-xl font-semibold text-red-600 card-title glitter_text uppercase">
              {trendCourses[currentActiveIndex]?.course_name}
            </p>
            <a
              className="text-white pb-0 job-card text-xs md:text-base line-clamp-7 ellipse capitalize"
              dangerouslySetInnerHTML={{
                __html: trendCourses[currentActiveIndex]?.courseShortDesc,
              }}
            />
  
            <a
              href={`./${trendCourses[currentActiveIndex]?.course_url}`}
              className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10 py-2 rounded"
            >
              <span>Read more</span>
            </a>
          </div>
        </article>
      </div>
      {isSmallMediumScreen && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => scroll("left")}
              disabled={currentActiveIndex === 0}
              className="p-2 bg-gray-200 rounded-full hover:bg-maincolor_1 hover:text-white disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={currentActiveIndex === trendCourses.length - 1}
              className="p-2 bg-gray-200 rounded-full hover:bg-maincolor_1 hover:text-white disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
    </div>
  </div>
  
  );
}

export default WorriedSection;