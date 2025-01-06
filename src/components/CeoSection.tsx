"use client";
import React from "react";
import Image from "next/image";

const CEOSection = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Card Column */}
        <div className="relative w-full h-80 rounded-lg overflow-hidden ">
          <Image
            src="/assets/images/muraliimg.jpeg" 
            alt="CEO Image" 
            width={500}
            height={500}
            loading="lazy"
          />
        </div>

        {/* CEO Content Column */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 glitter_text">Meet Our CEO</h2>
          <p className="text-lg text-gray-600">
            Our CEO is passionate about driving innovation and leading the company towards a brighter future. With years of experience in the industry, they have successfully guided the company through various challenges and milestones.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
