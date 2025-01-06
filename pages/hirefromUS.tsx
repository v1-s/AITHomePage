
"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StatsCounterComponent = dynamic(() => import("@/components/StatsCounterComponent"), { ssr: false });
const StaticHeroComponent = dynamic(() => import("@/components/StaticHeroComponent"), { ssr: false });
const TrendingCoursesInIT = dynamic(() => import("@/components/TrendingCoursesInIT"), { ssr: false });
const AlumniSection = dynamic(() => import("@/components/AchvrAlumini"), { ssr: false });
const PieChartSection = dynamic(() => import("@/components/HirePiechart"), { ssr: false });
const GlblBanner = dynamic(() => import("@/components/GlobalBanner"), { ssr: false });
const ClientSlider = dynamic(() => import("@/components/ClientSlider"), { ssr: false });
const SliderTestimonial = dynamic(() => import("@/components/ResponsiveHire"), { ssr: false });
const DwnldAdvisorModalForm = dynamic(() => import("./forms/advisorfrm"), { ssr: false });

const HireFromUs = () => {
  const router = useRouter();
  const [modalKey, setModalKey] = useState(0); // Key to force re-render
  const [activeModal, setActiveModal] = useState<string | null>(null); // Manage active modal state

  // Handlers to open specific modals
  const openModal = (modalType: string) => {
    setModalKey((prevKey) => prevKey + 1); // Increment key for re-render
    setActiveModal(modalType); // Set the active modal
  };

  const closeModal = () => {
    setActiveModal(null); // Close any active modal
  };

  const handleAboutUS = () => {
    router.push("/AboutUsSection");
  };

  return (
    <>
      <StaticHeroComponent
        titleSubContext={
          <>
            <span className="glitter_text text-orange-500">Hire</span> from AchieversIT <br />
            Empower Your Team with <span className="glitter_text text-mainblue">Expert Talent</span>
          </>
        }
        onEnrollClick={() => openModal("advisor")} // Open advisor modal
        modalTitle="Unlock Expert Talent with AchieversIT"
        modalText="Share your requirements, and our experts will help you connect with the right talent effortlessly."
        modalform="hire/enroll"
      />

      <section className="w-full py-16 bg-flowGradientBottom">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-12 mb-14">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug">
              Access the Finest <span className="glitter_text"> Tech Talent</span> at <span className="glitter_text">Zero Cost</span>
            </h1>
            <p className="mt-4 text-gray-600 text-base font-semibold">
              Connect with AchieversIT industry-ready professionals to drive your projects forward and achieve exceptional results effortlessly.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start">
              <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10" onClick={() => openModal("brochure")}>
                <span>Start Hiring Now</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <Image
              src="/assets/images/hirefromusa.png"
              alt="Tech Partners"
              className="max-w-full h-auto"
              width={800}
              height={800}
            />
          </div>
        </div>
        <SliderTestimonial />
      </section>

      <ClientSlider />
      <TrendingCoursesInIT text="Equip Yourself with Industry-Ready IT Expertise" />
      <StatsCounterComponent />
      <AlumniSection />
      <PieChartSection />

      <GlblBanner
        bannerheading="AchieversIT Talent Acquisition"
        bannertitle={
          <>
            Start Hiring from <span className="text-mainblue glitter_text">AchieversIT</span> Today!
          </>
        }
        bannercontent="Gain access to skilled professionals from diverse backgrounds who are ready to contribute to your company's success."
        bannerbtn={<button onClick={() => openModal("advisor")}>Start Hiring Now</button>}
      />

      {/* Render Modals */}
      {activeModal === "brochure" && (
        <DwnldAdvisorModalForm
          key={modalKey}
          title={
            <>
              <h2 className="uppercase text-center">
                Hire the Best-<br />
                <span className="glitter_text uppercase text-2xl"> get started now!</span>
              </h2>
            </>
          }
          text="Provide your information below to get your course syllabus delivered through WhatsApp and Email"
          closeModal={closeModal}
          formName=""
          imageSrc="/assets/images/dwnldbrchrimg.png"
          downloadPdf={false}
        />
      )}

      {activeModal === "enroll" && (
        <DwnldAdvisorModalForm
          key={modalKey}
          title="Unlock Your Discount!"
          text="Sign up today and get exclusive access to transformative courses with a 20% discount"
          closeModal={closeModal}
          formName="SpecialOffer"
          imageSrc="/assets/images/advisor.png"
        />
      )}
    </>
  );
};

export default HireFromUs;
