"use client";
import React from 'react';
import Image from 'next/image';

const CoursesSection = () => {
  return (
    <section className="section-padding mt-5 pt-0 pb-5 lg:mx-45">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="md:text-2xl text-center text-xl text-maincolor_1 font-semibold leading-tight">
              Learn Software Courses from the Expert Trainers
            </h3>
            <div className="text-xl lg:text-lg mt-2">
              Explore new and trending free online courses.
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-5 container">
          {/* Online Classes Box */}
          <div
            className="relative rounded-lg text-center shadow-lg group"
            data-aos="flip-left"
            data-aos-delay="100"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold w-16 h-full -ml-4 rounded-md opacity-100 group-hover:w-full group-hover:-ml-0 transition-opacity duration-300">
              <span className="transform group-hover:rotate-0 -rotate-90 transition-all duration-300 group-hover:text-maincolor_1">
                Online Classes
              </span>
            </div>
            <Image
              width={200}
              height={200}
              src="/assets/images/Trainers2.jpg"
              alt="Smiling woman working on laptop"
              className="w-full h-auto rounded-md"
              loading="lazy"
            />
          </div>

          {/* Image Box */}
          <div
            className="relative rounded-lg text-center shadow-lg"
            data-aos="flip-left"
            data-aos-delay="100"
          >
            <Image
              width={200}
              height={200}
              src="/assets/images/Trainers3.jpg"
              alt="Young Indian man with laptop"
              className="w-full h-auto rounded-md"
              loading="lazy"
            />
          </div>

          {/* Smart Learning Box */}
          <div className="relative rounded-lg text-center bg-gradient-to-b from-blue-400 to-orange-400 text-white shadow-md p-6 lg:row-span-2 flex justify-center items-center order-first md:order-none">
            <h1 className="text-3xl font-bold">Smart Learning in the Digital Era</h1>
          </div>

          {/* Offline Classes Box */}
          <div
            className="relative rounded-lg text-center shadow-lg lg:col-span-2 group"
            data-aos="flip-right"
            data-aos-delay="100"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold w-16 h-full -ml-4 rounded-md opacity-100 group-hover:w-full group-hover:-ml-0 transition-all duration-300">
              <span className="transform group-hover:rotate-0 group-hover:text-maincolor_1 -rotate-90 transition-all duration-300">
                Offline Classes
              </span>
            </div>
            <Image
              width={200}
              height={200}
              src="/assets/images/Trianers1.jpg"
              alt="Group of men in a business meeting"
              className="w-full h-64 rounded-md group-hover:w-full transition-all duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* Shimmer Button */}
        <a href="#enrollNow">
          <button
            type="button"
            className='btn-hover-bg-transition btn-hover-bg-transition-og relative left-1/2 transform -translate-x-1/2 bg-maincolor_1'
            aria-label="Join Our Experts To Learn"
          >
            <span>Join Our Experts To Learn</span>
          </button>
        </a>
      </div>
    </section>
  );
};

export default CoursesSection;
