"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarGraph: React.FC = () => {
  const [activeOption, setActiveOption] = useState("averageSalary");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const options = useMemo(() => ["averageSalary", "highestSalary", "fresherSalary", "opportunities"], []);

  const data: Record<
    string,
    { series: { name: string; data: number[]; color: string }[]; categories: string[] }
  > = {
    "averageSalary": {
      "series": [
        { "name": "2020", "data": [400000, 420000, 430000, 440000], "color": "#f8c5d0" },
        { "name": "2021", "data": [450000, 460000, 470000, 480000], "color": "#fbbd89" },
        { "name": "2022", "data": [490000, 500000, 510000, 520000], "color": "#87C9FF" },
        { "name": "2023", "data": [530000, 540000, 550000, 560000], "color": "#8AE79F" },
        { "name": "2024", "data": [570000, 580000, 590000, 600000], "color": "#FFE597" }
      ],
      "categories": ["Q1", "Q2", "Q3", "Q4"]
    },
    "highestSalary": {
      "series": [
        { "name": "2020", "data": [800000, 820000, 830000, 840000], "color": "#f8c5d0" },
        { "name": "2021", "data": [850000, 860000, 870000, 880000], "color": "#fbbd89" },
        { "name": "2022", "data": [890000, 900000, 910000, 920000], "color": "#87C9FF" },
        { "name": "2023", "data": [930000, 940000, 950000, 960000], "color": "#8AE79F" },
        { "name": "2024", "data": [970000, 980000, 990000, 1000000], "color": "#FFE597" }
      ],
      "categories": ["Q1", "Q2", "Q3", "Q4"]
    },
    "fresherSalary": {
      "series": [
        { "name": "2020", "data": [300000, 310000, 320000, 330000], "color": "#f8c5d0" },
        { "name": "2021", "data": [340000, 350000, 360000, 370000], "color": "#fbbd89" },
        { "name": "2022", "data": [380000, 390000, 400000, 410000], "color": "#87C9FF" },
        { "name": "2023", "data": [420000, 430000, 440000, 450000], "color": "#8AE79F" },
        { "name": "2024", "data": [460000, 470000, 480000, 490000], "color": "#FFE597" }
      ],
      "categories": ["Q1", "Q2", "Q3", "Q4"]
    },
    "opportunities": {
      "series": [
        { "name": "2020", "data": [100000, 120000, 130000, 140000], "color": "#f8c5d0" },
        { "name": "2021", "data": [150000, 160000, 170000, 180000], "color": "#fbbd89" },
        { "name": "2022", "data": [190000, 200000, 210000, 220000], "color": "#87C9FF" },
        { "name": "2023", "data": [230000, 240000, 250000, 260000], "color": "#8AE79F" },
        { "name": "2024", "data": [270000, 280000, 290000, 300000], "color": "#FFE597" }
      ],
      "categories": ["Q1", "Q2", "Q3", "Q4"]
    }
  };

  const darkenColor = (color: string) => {
    const amount = -50;
    return `#${color.replace(/^#/, '').replace(/../g, (color) =>
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    )}`;
  };

  const chartOptions = {
    chart: {
      type: "bar" as const,
      height: 400,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data[activeOption]?.categories || [],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Amount (INR)",
      },
      labels: {
        formatter: (val: number) => {
          if (val >= 10000000) return `${(val / 10000000).toFixed(1)}Cr`;
          if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
          if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
          return val.toString();
        },
      },
    },
    legend: {
      position: "bottom" as const,
      markers: {
        size: 10,
        fillColors: ["#f43f5e", "#f97316", "#1E90FF", "#32CD32", "#FFD700"],
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
          if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
          if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k`;
          return `₹${val}`;
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.9,
        },
      },
    },
  };

  const handleOptionChange = (option: string) => {
    setActiveOption(option);

    // Clear interval on manual interaction
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoRotation();
    }
  };

  const startAutoRotation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveOption((prevOption) => {
        const currentIndex = options.indexOf(prevOption);
        const nextIndex = (currentIndex + 1) % options.length;
        return options[nextIndex];
      });
    }, 5000); // Rotate every 5 seconds
  }, [options]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      startAutoRotation();

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [startAutoRotation]);

  return (
    <div className="mx-auto w-full lg:w-4/5 px-2 my-20 text-center">
      <h3 className="text-xl md:text-3xl font-bold text-center mb-6 font-bold text-center relative element inline-block mx-auto after:bottom-N15">IT Industry Trends (2020-2024)</h3>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-5">
        {/* Left Options */}
        <div className="flex lg:flex-col flex-wrap gap-4 justify-center items-center lg:items-start mb-6 lg:mb-0">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionChange(option)}
              className={`w-40 lg:w-48 p-2 text-sm font-medium rounded-md uppercase ${activeOption === option ? "bg-maincolor_1 text-white" : "bg-gray-300 text-black hover:bg-maincolor_1 hover:text-white"
                }`}
              aria-label={`Show data for ${option}`}
            >
              {option.replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>

        {/* Bar Graph */}
        <div className="w-full">
          <Chart
            options={{
              ...chartOptions,
              plotOptions: {
                ...chartOptions.plotOptions,
                bar: {
                  ...chartOptions.plotOptions.bar,
                  colors: {
                    ranges: data[activeOption]?.series?.map((year) => ({
                      from: year.data[0],
                      to: year.data[year.data.length - 1],
                      color: year.color,
                      hover: {
                        color: darkenColor(year.color),
                      },
                    })) || [],
                  },
                },
              },
            }}
            series={data[activeOption]?.series?.map((year) => ({
              name: year.name,
              data: year.data,
              color: year.color,
            })) || []}
            type="bar"
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
