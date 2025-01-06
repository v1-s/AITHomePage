"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


import DwnldAdvisorModalForm from "pages/forms/advisorfrm";

const BannerSplPromo = () => {
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
    <div className="md:w-4/5 md:mx-auto flex flex-col sm:flex-row items-center justify-between p-6 lg:pb-0 mx-4 shadow-glassShadow gap-8 bg-Bg2 bg-no-repeat bg-cover rounded-lg mb-20">
      {/* Image background on the left side */}
      <div
        className="w-full sm:w-1/3 bg-contain bg-no-repeat"
        style={{ backgroundImage: "url(./assets/images/bannerfaq.png)", height: "200px", borderRadius: "8px" }}
        aria-label="FAQ Banner Image"
      ></div>

      {/* Content on the right side */}
      <div className="w-full sm:w-1/2 pl-4 sm:pl-8">
        <h2 className="text-base md:text-lg sm:text-xl font-semibold text-gray-900 mb-4">Have More Questions?</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-4">
          Don&apos;t hesitate to ask! <br />
          <strong className="text-black text-bold text-xs md:text-xl">
            Book a free consultation with us today and get the clarity you&apos;re looking for.
          </strong>
        </p>
      </div>

      {/* Contact button on the right side */}
      <div className="w-full sm:w-1/4 flex justify-center sm:justify-start pl-4 sm:pl-8">
        <button
          className="btn-solid-bg-transition btn-solid-bg-transition-orange font-semibold py-3 px-2 flex items-center"
          onClick={openAdvisorModal}
          aria-label="Reach Out Now"
        >
          <span className="flex items-center">
            Reach Out Now
            <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </span>
        </button>
        {isAdvisorModalOpen && (
          <DwnldAdvisorModalForm
            imageSrc="/assets/images/advisor.png"
            key={modalKey}
            formName="contcatus"
            title="Start the conversation today"
            text="Provide your details below to get instant access to your course syllabus via WhatsApp and Email"
            closeModal={closeAdvisorModal}
            downloadPdf={false}
          />
        )}
      </div>
    </div>
  );
};

export default BannerSplPromo;
