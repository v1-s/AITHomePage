



"use client"; 

import React from 'react';
import { useState } from 'react';
import DwnldAdvisorModalForm from 'pages/forms/advisorfrm';
const SpecialOffer = () => {
    const [modalKey, setModalKey] = useState(0);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false); 
  const toggleAdvisorModal = () => {
    setIsAdvisorModalOpen((prevState) => !prevState);
    if (!isAdvisorModalOpen) {
      setModalKey((prevKey) => prevKey + 1);
    }
  };


  const handleModalClose = () => {
    setIsAdvisorModalOpen(false);

  };
  
  return (
    <div className="relative w-full md:w-auto bg-gradentBlue text-white py-10 transform origin-top-right shadow-card md:h-auto text-center lg:my-14 mb-20 shadow-inside z-[30]">
      <p className="font-bold text-sm md:text-xl mx-5 mb-2">&quot;Dream, Learn, Achieve, Excel – Your journey to greatness starts here at AchieversIT.&quot;</p>
      <p className="text-xs md:text-xl mb-2 glitter-text p-0">Get 20% off on all courses!</p>
      <button  className="btn-hover-bg-transition btn-hover-bg-transition-og px-14"
       onClick={toggleAdvisorModal}>
        <span>Enroll Now</span>
      </button>
          {isAdvisorModalOpen && (
                 <DwnldAdvisorModalForm
                 text=" Sign up today and get exclusive access to transformative courses with a 20% discount"


                 imageSrc="/assets/images/advisor.png"
                 key={modalKey}
                   formName="SpecialOffer"
                   title="Unlock Your Discount! Join AcheiversIT today"
                   closeModal={handleModalClose} // Close modal using the same toggle function
                   downloadPdf={false}
                 />
         )}
    </div>
  );
};

export default SpecialOffer;
