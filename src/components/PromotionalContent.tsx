"use client"; 

import React, { useState } from 'react';
import DwnldAdvisorModalForm from 'pages/forms/advisorfrm';

const SpecialOffer = () => {
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
    <div className="relative w-full md:w-auto bg-gradentBlue text-white py-10 shadow-card md:h-auto text-center lg:my-14 mb-20 shadow-inside">
      <p className="font-bold text-sm md:text-xl mx-5 mb-2">
        &quot;Dream, Learn, Achieve, Excel – Your journey to greatness starts here at AchieversIT.&quot;
      </p>
      <p className="text-xs md:text-xl mb-2 glitter-text p-0">Get 20% off on all courses!</p>
      <button
        className="btn-hover-bg-transition btn-hover-bg-transition-og px-14"
        onClick={openAdvisorModal}
        aria-label="Enroll Now"
      >
        <span className='text-md'>Enroll Now</span>
      </button>
      {isAdvisorModalOpen && (
        <DwnldAdvisorModalForm
          imageSrc="/assets/images/advisor.png"
          key={modalKey}
          formName="SpecialOffer"
          title="Unlock Your Discount!"
          text="Sign up today and get exclusive access to transformative courses with a 20% discount"
          closeModal={closeAdvisorModal}
        />
      )}
    </div>
  );
};

export default SpecialOffer;
