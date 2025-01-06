"use client";

import React, { useEffect, useRef } from "react";
import GlobalReach from './GlobalSpread';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faGlobe, faGem, faUsers } from '@fortawesome/free-solid-svg-icons';

const Global = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Function to animate the counter
  const animateCounter = (element: HTMLElement) => {
    const targetValue = parseInt(element.getAttribute("data-target") || "0", 10);
    let currentValue = 0;
    const increment = targetValue / 100;

    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }
      element.textContent = Math.floor(currentValue) + "+";
    }, 10);
  };

  useEffect(() => {
    // Intersection Observer callback function
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const growthValues = entry.target.querySelectorAll<HTMLElement>(".growth-value");
          growthValues.forEach((growthValue: HTMLElement) => {
            animateCounter(growthValue);
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when 50% of the section is in view
    });

    const section = sectionRef.current;
    if (section) observer.observe(section);

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full lg:w-[60%] py-0 mx-auto container flex justify-center flex-col items-center"
        id="drive-growth"
      >
        <div className="container mx-auto">
          <div className="flex flex-col items-center w-full">
            {/* Heading */}
            <div className="text-center mb-3 elementl relative after:bottom-N10 mb-10">
              <h3 className="text-2xl font-bold text-maincolor_1 glitter_text pb-2">
              Join Our Growing Worldwide Education Community
              </h3>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap justify-center lg:justify-between w-full my-8">
              {/* Statistic 1 */}
              <div className="flex flex-col items-center text-center space-y-2 mb-6 md:mb-0 w-full md:w-auto">
                <div className="bg-maincolor_1 rounded-full p-4 w-16 h-16 text-center">
                  <FontAwesomeIcon icon={faAward} className="text-3xl text-white" />
                </div>
                <h4
                  className="text-3xl font-semibold growth-value bg-gradientRed bg-clip-text text-transparent"
                  data-target="450000"
                >
                  0+
                </h4>
                <p className="text-lg text-gray-700 font-semibold">
                  Professionals Trained
                </p>
              </div>

              {/* Statistic 2 */}
              <div className="flex flex-col items-center text-center space-y-2 mb-6 md:mb-0 w-full md:w-auto">
                <div className="bg-green-600 rounded-full p-4 w-16 h-16 text-center">
                  <FontAwesomeIcon icon={faGlobe} className="text-3xl text-white" />
                </div>
                <h4
                  className="text-3xl font-semibold growth-value bg-gradientGreen bg-clip-text text-transparent"
                  data-target="450000"
                >
                  0+
                </h4>
                <p className="text-lg text-gray-700 font-semibold">
                  Enterprise Clients
                </p>
              </div>

              {/* Statistic 3 */}
              <div className="flex flex-col items-center text-center space-y-2 mb-6 md:mb-0 w-full md:w-auto">
                <div className="bg-purple-600 rounded-full p-4 w-16 h-16 text-center">
                  <FontAwesomeIcon icon={faGem} className="text-3xl text-white" />
                </div>
                <h4
                  className="text-3xl font-semibold growth-value bg-gradientPurple bg-clip-text text-transparent"
                  data-target="100"
                >
                  0+
                </h4>
                <p className="text-lg text-gray-700 font-semibold">
                  Countries and Counting
                </p>
              </div>

              {/* Statistic 4 */}
              <div className="flex flex-col items-center text-center space-y-2 mb-6 md:mb-0 w-full md:w-auto">
                <div className="bg-blue-600 rounded-full p-4 w-16 h-16 text-center">
                  <FontAwesomeIcon icon={faUsers} className="text-3xl text-white" />
                </div>
                <h4
                  className="text-3xl font-semibold growth-value bg-gradientBlue bg-clip-text text-transparent"
                  data-target="5000"
                >
                  0+
                </h4>
                <p className="text-lg text-gray-700 font-semibold">
                  Active Users
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GlobalReach />
    </>
  );
};

export default Global;
