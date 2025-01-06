"use client"; 

import React from 'react';
import Link from 'next/link';

const CorporateBanner = () => {
  return (
    <div className="relative w-full md:w-auto bg-blue-700 shadow-inside text-white p-8 shadow-glassShadow md:h-auto flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col items-center justify-center">
        {/* Left Column */}
        <div className="text-center mb-4">
          <h3 className="font-bold text-xl lg:text-2xl mb-2">Learning for all Organisations of all sizes</h3>
        </div>
        
        {/* Right Column */}
        <div className="flex justify-center">
          <Link href="/coursecurriculum" className="btn-hover-bg-transition btn-hover-bg-transition-og" aria-label="Enroll Now">
            <span>Enroll Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CorporateBanner;
