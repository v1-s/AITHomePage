// components/Banner.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";

const Banner = () => {
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
    <div className="w-full lg:max-w-6xl mx-auto relative flex flex-col md:flex-row items-center justify-between bg-Bg2 bg-no-repeat bg-cover text-black p-4 md:px-8 overflow-hidden">
      {/* Text Section */}
      <div className="w-full md:w-3/4 text-center md:text-left mb-4 md:mb-0 text-white">
        <h2 className="text-black text-xl  md:text-2xl  font-semibold mb-8 relative elements after:translate-x-[100%]  md:after:bottom-N10 glitter_text text-wrap">
          Interested in Joining a Training Session?
        </h2> 
        <p className="text-black text-wrap text-sm md:text-lg mb-4">
          Reach out to AchieversIT for details about upcoming training programs, session schedules, and registration support.
        </p>
        <button
          className="inline-block btn-solid-bg-transition btn-solid-bg-transition-orange py-2 rounded text-sm md:text-base"
          aria-label="Contact us for training session details"
          onClick={openAdvisorModal}
        >
          <span>Contact us</span>
        </button>

        {isAdvisorModalOpen && (
          <DwnldAdvisorModalForm
            imageSrc="/assets/images/advisor.png"
            key={modalKey}
            formName="homepage/contactus"
            title="We&apos;re Here for You"
            text="Looking for answers or support? Drop us a message, and we’ll get back to you as soon as possible"
            closeModal={closeAdvisorModal}
            modalclassname="md:max-w-4xl"
            downloadPdf={false}
          />
        )}
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/4 relative">
        <div className="relative mx-auto overflow-hidden max-w-xs md:max-w-none">
          <Image
            src="/assets/images/carrers.png"
            alt="Microsoft Image"
            className="w-full h-full"
            width={200}
            height={200}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
