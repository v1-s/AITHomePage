"use client";
import React, { useState, useEffect, useRef } from "react";

const StatsCounterComponent = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const counters = [
    { value: 73000, displayValue: "73k+", label: "Students" },
    { value: 75, displayValue: "75", label: "Languages" },
    { value: 10000, displayValue: "10k+", label: "Enrollments" },
    { value: 180, displayValue: "180", label: "Countries" },
    { value: 16000, displayValue: "16k+", label: "Enterprise customers" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-10 bg-gardientCertificate shadow-insideSoft my-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {counters.map((counter, index) => (
            <StatCard
              key={index}
              value={counter.value}
              displayValue={counter.displayValue}
              label={counter.label}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  value,
  displayValue,
  label,
  isInView,
}: {
  value: number;
  displayValue: string;
  label: string;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const interval = setInterval(() => {
        start += increment;
        if (start >= value) {
          clearInterval(interval);
          setCount(value);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(interval);
    } else {
      setCount(0);
    }
  }, [isInView, value]);

  return (
    <div className="w-1/2 sm:w-auto text-center p-4">
      <h3 className="text-4xl font-bold glitter_text mb-2">
        {count >= value ? displayValue : formatNumber(count)}
      </h3>
      <p className="text-white text-xl uppercase font-bold">{label}</p>
    </div>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}k`;
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  return num.toString();
};

export default StatsCounterComponent;
