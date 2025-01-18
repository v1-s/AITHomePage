"use client";
import React, { useEffect, useState } from "react";
import { countriesSet1, countriesSet2 } from "../utils/globalData"; // Import the split data
import Image from "next/image";
const GlobalReach = () => {
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0); // 0 for Set 1, 1 for Set 2

  // Switch between Set 1 and Set 2 every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSetIndex((prevIndex) => (prevIndex + 1) % 2); // Toggle between 0 and 1
    }, 4000); // Switch set every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Determine which set to use based on currentSetIndex
  const visibleCountries = currentSetIndex === 0 ? countriesSet1 : countriesSet2;

  return (
    <div id="map-container" className="relative w-screen md:w-full overflow-hidden mb-0 hidden md:block">
      <Image
        src="/assets/images/worldmapbase.svg"
        alt="Global map"
        width={500}
        height={200}
        className="object-cover pt-10 w-full sm:w-[100vw] md:w-[70vw] lg:w-[70vw]  mx-auto"
      />

      <div id="locations" className="inset-0 absolute">
        {visibleCountries.map((country, index) => (
          <div
            key={index}
            className={`absolute flex flex-col items-center transition-opacity duration-500 opacity-100 ${country.positionClasses}`}
          >
            <div className="flex flex-col items-center gap-0 py-1">
              <Image
                src={country.imgSrc}
                alt={country.name}
                width={350}
                height={400}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
              />
              <div className="flex items-center gap-0 bg-white py-0 px-4 rounded shadow-md flex-col">
                <h6 className="text-sm font-bold sm:text-base">{country.learners}</h6>
                <p className="text-xs text-gray-500 sm:text-sm">Learners</p>
              </div>
            </div>
            <div className="mt-1 animate-blink">
              <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                <circle opacity="0.16" cx="20.028" cy="20.0508" r="20" fill="#EE2C3C"></circle>
                <circle cx="20.028" cy="20.0507" r="10" fill="#EE2C3C"></circle>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* New Section */}
      <div className="mt-10 p-4 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Our Global Impact</h2>
        <p className="text-gray-600 mt-2">
          We are proud to have a presence in over 100 countries, empowering learners worldwide.
        </p>
      </div>
    </div>
  );
};

export default GlobalReach;
