"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";

// Lazy load components
const CEOSection = dynamic(() => import('@/components/CeoSection'), { ssr: false });
const DynamicTeam = dynamic(() => import('@/components/AchvrTeam'), { ssr: false });
const HowItStarted = dynamic(() => import('@/components/HowItStarted'), { ssr: false });
const AboutAchieversIT = dynamic(() => import('@/components/AbtAchvrAIT'), { ssr: false });
const GlblBanner = dynamic(() => import('@/components/GlobalBanner'), { ssr: false });
const TrainingAdvisorForm = dynamic(() => import('@/components/MentorForm'), { ssr: false });
const PieChartSection = dynamic(() => import('@/components/HirePiechart'), { ssr: false });
const DwnldAdvisorModalForm = dynamic(() => import('./forms/advisorfrm'), { ssr: false });

const AboutUsSection = () => {

 const [activeForm, setActiveForm] = useState<string | null>(null); // Track the currently open form
  const [modalKey, setModalKey] = useState(0);

  const toggleForm = (formName: string) => {
    setActiveForm(formName);
    setModalKey((prevKey) => prevKey + 1); // Ensure the modal always re-renders
  };

  const handleModalClose = () => {
    setActiveForm(null); // Close the active form
  };

  const scrollToFeaturedAlumini = () => {
    if (typeof window !== "undefined") {
      const section = document.getElementById("alumini");
      if (!section) return;

      const headerOffset = 70;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      const duration = 3000;
      let startTime: number | null = null;

      const smoothScroll = (currentTime: DOMHighResTimeStamp) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        const run = ease(timeElapsed, window.pageYOffset, offsetPosition - window.pageYOffset, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
          requestAnimationFrame(smoothScroll);
        }
      };

      const ease = (t: number, b: number, c: number, d: number): number => {
        const tNorm = t / d;
        return (
          b +
          c *
            (tNorm < 0.5
              ? 4 * tNorm * tNorm * tNorm
              : 1 - Math.pow(-2 * tNorm + 2, 3) / 2)
        );
      };

      requestAnimationFrame(smoothScroll);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-6">
        {/* Left Content */}
        <div>
          <span className="text-mainblue font-semibold  text-xs md:text-sm uppercase mb-2">
            LET&apos;S CONNECT
          </span>
          <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-4">
            AchieversIT
          </h1>
          <p className="text-xs md:text-lg text-gray-700 mb-6">
            AchieversIT stands as India&apos;s Foremost and Most Esteemed Software Training Institution. We offer unparalleled and globally esteemed software education and professional development programs tailored for aspiring learners.
          </p>
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, idx) => (
                <svg
                  key={idx}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-700 font-semibold ml-2">
              4.9 out of 5 based on 20,839 Reviews
            </span>
          </div>
          <div className="flex space-x-4">
            <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10" onClick={scrollToFeaturedAlumini}>
              <span> Meet Our Team</span>
            </button>
            <button className="btn-hover-bg-transition btn-hover-bg-transition-og px-14 text-black border border-gray-500 px-10" onClick={() => toggleForm("advisorForm")}>
              <span>Join AchieversIT</span>
            </button>
            {activeForm ==="advisorForm" && (
              <DwnldAdvisorModalForm
                imageSrc="/assets/images/advisor.png"
                key={modalKey}
                formName="blog/enroll"
                title="Achieve Your Career Goals with AchieversIT"
                text="Provide your information below to get Kick-start your journey toward a bright future."
                closeModal={handleModalClose}
                modalclassname="md:max-w-4xl text-black"
                downloadPdf={false}
              />
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center items-center mt-8 lg:mt-0">
          <Image
            src="/assets/images/abtus4.png"
            alt="Trainer"
            className="w-full z-10"
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* Why AIT Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Why <span className="text-mainblue glitter_text">AchieversIT</span> is the Leading Choice?
          </h2>
          <p className="text-xs md:text-md text-gray-600 mt-4">
            AchieversIT is the premier destination in India for outstanding training and career enhancement.
          </p>
          <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mx-auto mt-8">
            {[
              {
                title: "Experienced Expert Instructors",
                icon: "/assets/images/trainedxperts.png"
              },
              {
                title: "Assured 100% Placement Support",
                icon: "/assets/images/100placement.png",
              },
              {
                title: "Industry-focused Updated Curriculum",
                icon: "/assets/images/updatedcurriculum.png",
              },
              {
                title: "Dedicated Mentor Connect",
                icon: "/assets/images/mentorsupport.png",
              },
              {
                title: "Best Industry Specific Projects",
                icon: "/assets/images/industryoriented.png",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-flowGradientBottom flex flex-col items-center text-center p-6 shadow-md cursor-pointer hover:scale-105 hover:shadow-glassShadow transition-transform duration-300 rounded-md"
              >
                <div className="mb-2 w-14" style={{ lineHeight: "1" }}>
                  <Image src={item.icon} alt={item.title} width={48} height={48} />
                </div>
                <h3 className="text-sm md:text-md font-semibold text-gray-600">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <CEOSection />
      <DynamicTeam />
      <HowItStarted />
      <PieChartSection />

      <h2 className="text-sm md:text-xl font-bold text-mainblue text-center">
        Discover AchieversIT<br />
        <span className="text-mainblue glitter_text text-lg md:text-3xl">
          Empowering Careers with Industry-Ready Skills
        </span>
      </h2>

      <AboutAchieversIT />

      <div className="relative bg-bannerBg4 bg-fixed bg-no-repeat bg-cover py-12 mt-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="w-full w-4/5 mx-auto bg-white p-8">
            <h2 className="text-xl md:text-3xl font-bold text-center text-white element relative pb-2 mb-8">
              <span className="text-black">Reach Out to Us – We&apos;re Ready to Assist!</span>
            </h2>
            <TrainingAdvisorForm />
          </div>
          <div className="text-center mt-8">
            <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10 tracking-widest uppercase" onClick={() => toggleForm("brochureForm")}>
              <span>Explore Opportunities</span>
            </button>
            {activeForm ==="brochureForm" && (
              <DwnldAdvisorModalForm
                imageSrc="/assets/images/advisor.png"
                key={modalKey}
                formName="blog/enroll"
                title="Achieve Your Career Goals with AchieversIT"
                text="Provide your information below to get Kick-start your journey toward a bright future."
                closeModal={handleModalClose}
                modalclassname="md:max-w-4xl text-black"
                downloadPdf={false}
              />
            )}
          </div>
        </div>
      </div>

      <GlblBanner
        bannerheading="Want To Know About AchieversIT"
        bannertitle={
          <>
            Join <span className="text-mainblue glitter_text">AchieversIT</span> Today!
          </>
        }
        bannercontent="Explore a world of opportunities with AchieversIT. Learn from industry experts, enhance your skills, and embark on a journey to success in the IT world."
        bannerbtn={<span>Join Us Now</span>}
      />
    </section>
  );
};

export default AboutUsSection;
