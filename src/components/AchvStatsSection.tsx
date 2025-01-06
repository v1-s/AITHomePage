"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faUsers, faHandshake, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";

const StatsSection: React.FC = () => {
  const statsData = [
    {
      id: 1,
      icon: faCoins,
      value: 72,
      suffix: "%",
      description: "Avg. Salary Hike",
      colorClass: "#F43F5E", // Progress and counter color
    },
    {
      id: 2,
      icon: faUsers,
      value: 5000,
      suffix: "+",
      description: "Careers Transformed",
      colorClass: "#F97316", // Progress and counter color
    },
    {
      id: 3,
      icon: faHandshake,
      value: 400,
      suffix: "+",
      description: "Industry Partners",
      colorClass: "#22C55E", // Progress and counter color
    },
    {
      id: 4,
      icon: faChartLine,
      value: 100,
      suffix: "%",
      description: "Job Success Rate",
      colorClass: "#3B82F6", // Progress and counter color
    },
  ];

  const { ref, inView } = useInView({ triggerOnce: false }); // Trigger animation each time in view
  const [progress, setProgress] = useState(0); // Track overall progress (0 to 100)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (inView) {
      setProgress(0); // Reset progress when entering the viewport
      const animationDuration = 2000; // Total animation duration (in ms)
      const step = 75 / (animationDuration / 20); // Increment per step (75% progress)

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev + step >= 75) {
            clearInterval(interval);
            return 75; // Cap progress at 75%
          }
          return prev + step;
        });
      }, 20); // Step interval (in ms)
    }

    return () => {
      clearInterval(interval); // Cleanup interval when out of view or unmounting
    };
  }, [inView]);

  return (
    <div className="container mx-auto pb-5 text-center my-10 p-3" id="stats-section">
      <h1 className="stat-heading text-center text-2xl md:text-3xl font-bold my-8 mb-10 leading-snug inline-block element relative after:bottom-N20 mx-auto">
        Achieve success with industry-driven learning
      </h1>
      <div
        ref={ref}
        className="flex flex-wrap justify-center lg:justify-between gap-10 py-10 max-w-screen-lg mx-auto md:px-4"
      >
        {statsData.map((stat) => {
          const currentValue = Math.floor((stat.value * progress) / 75); // Counter value proportional to progress (up to 75%)

          return (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center w-36 md:w-48"
            >
              {/* Progress Circle */}
              <div
                className="relative w-40 h-40 lg:w-52 lg:h-52 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(${stat.colorClass} ${
                    progress * 3.6 // Map progress (0-75) to degrees (0-270)
                  }deg, #f3f3f3 0deg)`, // Show only 75% of the circle
                }}
              >
                {/* Inner White Circle */}
                <div className="absolute w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-hard">
                  {/* Counter and Description */}
                  <div className="text-center p-2">
                    <div
                      className="text-xl sm:text-2xl md:text-3xl font-bold"
                      style={{ color: stat.colorClass }} // Counter color dynamically set
                    >
                      {currentValue}
                      <span>{stat.suffix}</span>
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-gray-500">
                      {stat.description}
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className="absolute top-0 left-0 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: stat.colorClass }}
                >
                  <FontAwesomeIcon icon={stat.icon} className="text-white text-2xl sm:text-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSection;


