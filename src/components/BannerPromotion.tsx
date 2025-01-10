"use client"; 

import React, { useState } from 'react';
import DwnldAdvisorModalForm from 'pages/forms/advisorfrm';

const BannerPromo = () => {
  const [modalKey, setModalKey] = useState(0);
   const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false); 
 
   const openAdvisorModal = () => {
     setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
     setIsAdvisorModalOpen(true);
   };
 
 
   const closeAdvisorModal = () => {
     setIsAdvisorModalOpen(false);
   };
 
  return (
    <div className="relative w-full md:w-auto bg-gradient-to-r from-[#ec2F4B] to-[#009FFF] text-white p-8 shadow-glassShadow md:h-auto flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col md:flex-row items-center justify-center">
        {/* Left Column */}
        <div className="text-center md:text-left mb-4 md:mb-0 md:w-1/2">
          <h3 className="font-bold text-xl lg:text-2xl mb-2">Special Offer</h3>
          <p className="text-xl mb-4">Get 20% off on all courses!</p>
        </div>
        
        {/* Right Column */}
        <div className="md:w-1/2 flex justify-center">
          <button 
            className="btn-hover-bg-transition btn-hover-bg-transition-og" 
            aria-label="Enroll now and get 20% off on all courses"
            onClick={openAdvisorModal}
          >
            <span className='text-md'>Enroll Now</span>
          </button>
    
          {isAdvisorModalOpen && (
            <DwnldAdvisorModalForm
              imageSrc="/assets/images/advisor.png"
              key={modalKey}
              formName="blog/enroll"
              title="Launch Your Career Today"
              text="Provide your information below to get Kick-start your journey toward a bright future."
              closeModal={closeAdvisorModal}
              modalclassname="md:max-w-4xl"
              downloadPdf={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerPromo;


