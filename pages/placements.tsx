"use client";

import Reviews from "@/components/Reviews";
import StudentBackgrounds from "@/components/StudentBgSec";
import dynamic from "next/dynamic";
import faqData from "@/utils/faq";
import Image from "next/image";
import React, { useState } from "react";

// Dynamically import components to reduce initial load time
// const HiringPartners = dynamic(() => import('@/components/HiringPartners'), { ssr: false }); // Removed unused import
const FAQComponent = dynamic(() => import("@/components/Faq"), { ssr: false });
const DwnldAdvisorModalForm = dynamic(() => import("./forms/advisorfrm"), {
  ssr: false,
});
const CarouselContainer = dynamic(
  () => import("@/components/ClientCompanies"),
  { ssr: false }
);
const Search = dynamic(() => import("@/components/Search"), { ssr: false });

const PlacementPage = () => {
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleBrochureModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const openAdvisorModal = () => {
    setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setIsAdvisorModalOpen(true);
  };

  const closeAdvisorModal = () => {
    setIsAdvisorModalOpen(false);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 via-white to-white py-12">
        {/* Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
              Empower Your Future <br />
              <span className="text-mainblue glitter_text">
                with AchieversIT
              </span>
            </h1>
            <p className="text-gray-600 mt-4 text-sm md:text-lg">
              AchieversIT is your gateway to a successful career in IT. With
              expert-led training programs, hands-on projects, and
              industry-recognized certifications, we prepare you for high-paying
              roles in top companies. Join us today to unlock your potential and
              achieve your career goals!
            </p>
            <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start md:space-x-4 gap-4">
              <button
                className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
                onClick={openAdvisorModal}
              >
                <span className="text-sm md:text-base"> Enroll Now</span>
              </button>
              {isAdvisorModalOpen && (
                <DwnldAdvisorModalForm
                  imageSrc="/assets/images/advisor.png"
                  key={modalKey}
                  formName="Course"
                  title="Join Us Today"
                  text="Take the first step toward achieving your professional goals. Explore opportunities, develop your skills, and transform your career"
                  closeModal={closeAdvisorModal} // Close modal using the same toggle function
                  modalclassname=""
                  downloadPdf={false}
                />
              )}

              <button
                className="btn-hover-bg-transition btn-hover-bg-transition-og px-14 text-black border border-orange-500 b-5 shadow-glassShadow border-12"
                onClick={toggleBrochureModal}
              >
                <span className="text-sm md:text-base">Explore Opportunities</span>
              </button>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 mt-10">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 rounded-full w-6 h-6 bg-black text-white border border-gray-500"
                  onClick={toggleBrochureModal} // Close the modal
                >
                  &times;
                </button>
                {/* Search Component */}
                <Search /> {/* Your Search component */}
              </div>
            </div>
          )}
      

        {/* Right Illustration */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
          <Image
            src="/assets/images/placementsbg3.png" // Replace with your actual image path
            alt="Student Illustration"
            className="w-64 lg:w-full"
            width={200}
            height={300}
          />
        </div>
        </div>
        {/* Stats Section */}
        <div className="flex items-center justify-center py-16"></div>
        <div className="max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mx-auto">
          {[
            {
              label: "Placement rates over the years.",
              value: "95%",
              bg: "bg-cyan-950",
            },
            {
              label: "Avg Salary hike for students here.",
              value: "40%",
              bg: "bg-fuchsia-950",
            },
            {
              label: "Avg salary for students here.",
              value: "9",
              currency: "LPA",
              bg: "bg-lime-800",
            },
            {
              label: "Hiring Brands here Globally.",
              value: "2K+",
              bg: "bg-orange-800",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start justify-center p-4 rounded-lg shadow-lg text-left hover:shadow-lg cursor-pointer ${stat.bg} hover:scale-105 transition-transform duration-300 ease-in-out`}
            >
              <h4 className="text-xl md:text-3xl font-bold text-white">
                {stat.value} <span className="text-sm">{stat.currency}</span>
              </h4>{" "}
              {/* Increased font size for the value */}
              <p className="text-slate-300 text-xs md:text-sm mt-1">{stat.label}</p>{" "}
              {/* Smaller font size for the label */}
            </div>
          ))}
        </div>
      </section>

      {/* Student Backgrounds Section */}
      <StudentBackgrounds />

      {/* Client Companies Carousel */}
      <CarouselContainer />

      {/* Reviews Section */}
      <div className="bg-gray-50 py-16 px-4 md:px-16">
        <div className="container mx-auto text-center">
          <Reviews />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQComponent faqData={faqData} />
    </>
  );
};

export default PlacementPage;
