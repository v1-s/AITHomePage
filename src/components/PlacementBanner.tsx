"use client";

import React, { useState } from "react";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";

const PlacementBanner: React.FC = () => {
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
    <section className="bg-yellow-400 py-8 md:py-14 my-20 text-center inside flex flex-col md:flex-row justify-around items-center">
      <div className="px-4">
        <h1 className="text-base md:text-2xl md:text-3xl font-extrabold text-white">
          100% Job Placement Assistance & Interview Preparation
        </h1>
        <p className="text-sm lg:text-lg text-black mt-4 glitter_text">
          Hurry!! Give a kick-start for your sparking future!
        </p>
      </div>
      <div className="my-4">
        <button
          className="btn-hover-bg-transition btn-hover-bg-transition-og px-14 bg-white text-maincolor_1"
          onClick={openAdvisorModal}
          aria-label="Enroll Now"
        >
          <span>Enroll Now</span>
        </button>
        {isAdvisorModalOpen && (
          <DwnldAdvisorModalForm
            imageSrc="/assets/images/advisor.png"
            key={modalKey}
            formName="homepage/enroll"
            title="Launch Your Career Today"
            text="Provide your information below to get Kick-start your journey toward a bright future."
            closeModal={closeAdvisorModal}
            modalclassname="md:max-w-4xl"
            downloadPdf={false}
          />
        )}
      </div>
    </section>
  );
};

export default PlacementBanner;
