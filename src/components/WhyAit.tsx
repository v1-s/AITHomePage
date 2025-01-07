"use client";

import React, { useState, useRef, useEffect } from "react";
import phases from "@/utils/phases";
import Image from "next/image";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollSections: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % phases.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetAutoSlide = () => {
    stopAutoSlide();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      startAutoSlide();
    }, 6000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      stopAutoSlide();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % phases.length);
    resetAutoSlide();
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + phases.length) % phases.length);
    resetAutoSlide();
  };

  return (
    <div className="w-full md:w-4/5 mx-auto ">
      <div className="z-10 p-4 text-center relative">
        <h1 className="text-2xl md:text-3xl text-maincolor_1 font-bold glitter_text inline-block elementl relative after:bottom-N20">
          Experience the AchieversIT Advantage
        </h1>

      </div>

      <div className="relative h-[500px] md:h-[500px] my-14">
        {phases.map((phase, idx) => (
          <div
            key={phase.id}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ${idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 overflow-hidden">
              <div className={`w-full lg:w-1/2 ${idx === currentSlide ? "animate-fade-in-left" : ""}`}>
                <ImageComponent imagePath={phase.image} />
              </div>
              <div className={`w-full lg:w-1/2 ${idx === currentSlide ? "animate-fade-in-right" : ""}`}>
                <p className="text-base md:text-2xl text-darkBlue mb-4 text-left text-wrap">{phase.title}</p>
                <p className="text-justify text-wrap text-sm md:text-base">{phase.description}</p>
                <div className="mt-5 justify-end hidden md:flex space-x-2">
                  <button
                    className="border-2 border-maincolor_1 text-maincolor_1 font-bold px-5 text-2xl"
                    onClick={handlePrev}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button
                    className="border-2 border-maincolor_1  text-maincolor_1 font-bold px-5 text-2xl"
                    onClick={handleNext}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative justify-center flex space-x-2">
        {phases.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === currentSlide ? "bg-maincolor_1" : "bg-gray-400"}`}
            onClick={() => {
              setCurrentSlide(idx);
              resetAutoSlide();
            }}
          />
        ))}
      </div>

      <div className="flex md:hidden justify-center space-x-2 mt-4">
        <button
          className="border-2 border-mainBlue text-maincolor_1 font-bold px-5 text-3xl"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="border-2 border-mainBlue text-maincolor_1 font-bold px-5 text-3xl"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

const ImageComponent = ({ imagePath }: { imagePath: string }) => {
  return (
    <Image
      width={500}
      height={500}
      src={imagePath.startsWith("/") ? imagePath : `/${imagePath}`}
      alt="Slide"
      loading="lazy"
      className="w-full h-auto object-contain"
    />
  );
};

export default ScrollSections;
