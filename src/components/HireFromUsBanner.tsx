"use client"; 

import React from 'react';
import Link from 'next/link';
const HireFromUsBanner = () => {
  return (
    <div className="relative w-full md:w-auto bg-blue-700 shadow-inside text-white p-8 shadow-glassShadow md:h-auto flex items-center justify-center">
      <div className="w-full md:w-3/4 flex flex-col items-center justify-center">
        {/* Left Column */}
        <div className="text-center mb-4">
          <h3 className="font-bold text-xl lg:text-2xl mb-2 glitter_text">
            Your Next Great Opportunity is Waiting at AchieversIT
          </h3>
          <p className="text-sm lg:text-base mb-4">
            Join us for unparalleled support and guidance every step of the way.  
            Achieve success with our expert team and resources designed to help you grow.
          </p>
        </div>
        
        {/* Right Column */}
        <div className="flex justify-center">
          <Link href="/careers" className="btn-hover-bg-transition btn-hover-bg-transition-og" aria-label="Explore Careers">
            <span>Explore Careers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HireFromUsBanner;
