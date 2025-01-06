"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const DwnldAdvisorModalForm = dynamic(() => import("pages/forms/advisorfrm"), { ssr: false });

// Accepting dynamic content as props
interface GlblBannerProps {
  bannerheading: string;
  bannertitle: React.ReactNode;
  bannercontent: string;
  bannerbtn: React.ReactNode;
}

const GlblBanner: React.FC<GlblBannerProps> = ({ bannerheading, bannertitle, bannercontent, bannerbtn }) => {
  const [modalKey, setModalKey] = useState(0);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false); 

  const openAdvisorModal = () => {
    setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setIsAdvisorModalOpen(true);
  };


  const closeAdvisorModal = () => {
    setIsAdvisorModalOpen(false);
  };


  // Preload the modal component when the component mounts
  useEffect(() => {
    import("pages/forms/advisorfrm");
  }, []);

  return (
    <div className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-bannerBg5 shadow-inside bg-no-repeat"
      // Add a background image path here
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative  text-center text-white px-6 w-full">
        {/* Banner Heading */}
        <h3 className="text-white element relative pb-2 text-xl font-semibold mb-8">{bannerheading}</h3>

        {/* Banner Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {bannertitle}
        </h1>

        {/* Banner Content */}
        <p className="mb-6 font-semibold">{bannercontent}</p>

        {/* Button */}
        <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10 py-3 text-sm sm:text-base md:text-lg"
          onClick={openAdvisorModal} aria-label="Open Advisor Modal">
        <span> {bannerbtn}</span> 
        </button>
        {isAdvisorModalOpen && (
          <DwnldAdvisorModalForm
          key={modalKey}
            title="Join us on our journey! "
            text=" Whether you're looking for support, collaboration opportunities, or just want to stay updated, we're just a message away."
            closeModal={closeAdvisorModal} // Close the Advisor modal
            formName="advisorForm"
            imageSrc="/assets/images/dwnldbrchrimg.png"
            downloadPdf={false}
          />
        )}
      </div>
    </div>
  );
};

export default GlblBanner;
