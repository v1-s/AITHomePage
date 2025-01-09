"use client";

import React from 'react';

const WhoWeAre = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Content Column */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-6 text-maincolor_1">Who We Are?</h2>
          <p className="text-lg text-gray-700 mb-6">
            At AchieversIT, we are a global leader in digital upskilling, committed to empowering businesses and individuals to thrive in the digital age.
          </p>
          <p className="text-base text-gray-600 mb-6">
            Founded with a mission to provide cutting-edge technology solutions, AchieversIT offers world-class training programs to individuals and businesses worldwide. We strive to make digital transformation accessible to all by providing high-quality training designed to upskill professionals across industries.
          </p>
          <p className="text-base text-gray-600">
            With a focus on practical, role-based, and industry-relevant training, our programs are crafted with the latest industry insights and are backed by leading global corporations and universities. Whether you&apos;re a student, early-career professional, manager, or executive, AchieversIT offers the tools and knowledge you need to accelerate your career or business in the digital era.
          </p>
        </div>

        {/* Video Column */}
        <div className="flex justify-center items-center mt-6 lg:mt-0">
          <div className="w-full sm:w-96 md:w-3/4 lg:w-full p-5 bg-gray-50 rounded-md shadow-card">
            <iframe
              className="w-full h-64 sm:h-72 md:h-80 rounded-md"
              src="https://www.youtube.com/channel/UCgXhUR82NKEMd3_ZZbefrdA"
              title="Life at AchieversIT"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              aria-label="Life at AchieversIT video"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
