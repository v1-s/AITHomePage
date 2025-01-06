"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const ImpactSection = () => {
  const [careersAdvanced, setCareersAdvanced] = useState(0);
  const [qualifiedTrainers, setQualifiedTrainers] = useState(0);
  const [liveClasses, setLiveClasses] = useState(0);
  const [courses, setCourses] = useState(0);
  const [globalAccreditations, setGlobalAccreditations] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const startCounting = () => {
    const duration = 2000; // Animation duration in ms
    const increment = (
      start: number,
      end: number,
      setter: (value: number) => void
    ) => {
      const step = Math.ceil((end - start) / (duration / 100));
      let current = start;
      const interval = setInterval(() => {
        current += step;
        if (current >= end) {
          current = end;
          clearInterval(interval);
        }
        setter(current);
      }, 100);
    };

    increment(0, 50, setCareersAdvanced);
    increment(0, 2000, setQualifiedTrainers);
    increment(0, 2500, setLiveClasses);
    increment(0, 400, setCourses);
    increment(0, 40, setGlobalAccreditations);
  };

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      startCounting();
    }
  }, []); 

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // 50% of the section should be in view
    });

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [handleIntersection]); 

  return (
    <section className="py-16 relative bg-Bg2 bg-cover bg-no-repeat" ref={sectionRef}>
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="max-w-7xl mx-auto text-center relative z-20">
        <h2 className="text-3xl font-semibold text-maincolor_1 mb-12 glitter_text">Our Impact</h2>
        <div className="lg:grid gap-8 px-6 flex flex-col sm:flex-row ">
          {/* Card 1 - Careers Advanced */}
          <div className="bg-white p-6 rounded-lg text-center shadow-hard h-full">
            <h3 className="text-3xl sm:text-4xl font-bold text-maincolor_1 break-words">
              {careersAdvanced.toLocaleString()}+
            </h3>
            <p className="text-lg text-gray-700">Careers Advanced</p>
          </div>

          {/* Card 2 - Qualified Trainers */}
          <div className="bg-white shadow-hard p-6 rounded-lg text-center h-full">
            <h3 className="text-3xl sm:text-4xl font-bold text-maincolor_1 break-words">
              {qualifiedTrainers.toLocaleString()}+
            </h3>
            <p className="text-lg text-gray-700">Qualified Trainers</p>
          </div>

          {/* Card 3 - Live Classes per Month */}
          <div className="bg-white shadow-hard p-6 rounded-lg text-center h-full">
            <h3 className="text-3xl sm:text-4xl font-bold text-maincolor_1 break-words">
              {liveClasses.toLocaleString()}+
            </h3>
            <p className="text-lg text-gray-700">Live Classes per Month</p>
          </div>

          {/* Flex Container to Center Cards 4 and 5 */}
          <div className="col-span-3 sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row justify-center gap-8">
            {/* Card 4 - Courses */}
            <div className="bg-white shadow-hard p-6 rounded-lg text-center w-full sm:w-[300px] md:w-[300px] h-full">
              <h3 className="text-3xl sm:text-4xl font-bold text-maincolor_1 break-words">
                {courses.toLocaleString()}+
              </h3>
              <p className="text-lg text-gray-700">Courses</p>
            </div>

            {/* Card 5 - Global Accreditations */}
            <div className="bg-white shadow-hard p-6 rounded-lg text-center w-full sm:w-[300px] md:w-[300px] h-full">
              <h3 className="text-3xl sm:text-4xl font-bold text-maincolor_1 break-words">
                {globalAccreditations.toLocaleString()}+
              </h3>
              <p className="text-lg text-gray-700">Global Accreditations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
