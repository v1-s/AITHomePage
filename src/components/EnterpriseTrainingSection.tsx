"use client";

import React, { useState } from "react";
import Image from "next/image";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";

const companiesData = [
  { id: 1, name: "EY", logo: "/assets/images/company logo/Bosch.webp" },
  { id: 2, name: "Dell", logo: "/assets/images/company logo/Cisco.webp" },
  { id: 3, name: "BCG", logo: "/assets/images/company logo/DHL.webp" },
  { id: 4, name: "Vodafone", logo: "/assets/images/company logo/Genpact.webp" },
  { id: 5, name: "HP", logo: "/assets/images/company logo/Societe-General.webp" },
  { id: 6, name: "Bosch", logo: "/assets/images/company logo/EY.webp" },
  { id: 7, name: "Mphasis", logo: "/assets/images/company logo/Intuit.webp" },
  { id: 8, name: "Airbus", logo: "/assets/images/company logo/infinum.webp" },
  { id: 9, name: "The World Bank", logo: "/assets/images/company logo/Tech Mahindra.webp" },
];

const EnterpriseTrainingSection = () => {
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const openAdvisorModal = () => {
    setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setIsAdvisorModalOpen(true);
  };

  const closeAdvisorModal = () => {
    setIsAdvisorModalOpen(false);
  };

  return (
    <section className="w-full lg:w-4/5 mx-auto py-16 px-4 small:bg-BgWorldmap bg-none bg-no-repeat bg-contain bg-center my-0 lg:my-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-auto">
        {/* Left Section */}
        <div className="text-center md:text-left space-y-6">
          <h2 className="text-2xl  md:text-2xl lg:text-3xl  lg:text-4xl font-bold leading-tight glitter_text2">
            Corporate Training & Team Building Initiatives
          </h2>
          <p className="text-sm md:text-lg text-gray-600">
            Organization-specific curricula delivered with unmatched precision and comprehensive support.
          </p>
          <button
            className="btn-solid-bg-transition btn-solid-bg-transition-orange font-semibold py-3 px-6"
            onClick={openAdvisorModal}
          >
            <span>Enroll Now</span>
          </button>
          {isAdvisorModalOpen && (
            <DwnldAdvisorModalForm
              key={modalKey}
              imageSrc="/assets/images/advisor.png"
              formName="DemoForm"
              title="Request a Live Demo"
              text="Provide your information below to get your course syllabus delivered through WhatsApp and Email"
              closeModal={closeAdvisorModal} // Close modal function
              modalclassname=""
              downloadPdf={false} // Disable PDF download
            />
          )}
        </div>

        {/* Right Section */}
        <div className="">
          <h3 className="text-base md:text-xl font-semibold mb-6 text-center md:text-left">
            Delivering Solutions to Businesses Around the World
          </h3>
          <div className="grid grid-cols-3 gap-4 md:gap-6 small:bg-none">
            {companiesData.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-center shadow-card rounded-lg p-4 bg-transmedium"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  width={200}
                  height={200}
                  className="max-h-12 object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseTrainingSection;
