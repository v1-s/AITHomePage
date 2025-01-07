"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const GlblBanner = dynamic(() => import('@/components/GlobalBanner'), { ssr: false });
const StaticHeroComponent = dynamic(() => import('@/components/StaticHeroComponent'), { ssr: false });
const StatsCounterComponent = dynamic(() => import('@/components/StatsCounterComponent'), { ssr: false });
const TrainingAdvisorForm = dynamic(() => import('@/components/MentorForm'), { ssr: false });
const DwnldAdvisorModalForm = dynamic(() => import('pages/forms/advisorfrm'), { ssr: false });

const MentorShip = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null); // Track which modal is active
  const [modalKey, setModalKey] = useState<number>(0);

  const openModal = (modalName: string) => {
    setActiveModal(null); // Reset the modal state
    setTimeout(() => {
      setActiveModal(modalName); // Set the active modal name
      setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
    }, 0); // Use a small delay to ensure React processes the state reset
  };
  

  const closeModal = () => {
    setActiveModal(null); // Close all modals
  };

  return (
    <>
      {/* Static Hero Component */}
      <StaticHeroComponent
        titleSubContext={
          <>
            Become{" "}
            <span className="glitter_text text-orange-500 ">Guide</span> at
            AchieversIT <br />
            Empower the Future with{" "}
            <span className="glitter_text text-mainblue">Your Knowledge</span>
          </>
        }
        onEnrollClick={() => openModal("advisorModal")}
        modalTitle="Enquire Now and Unlock Opportunities"
        modalText="Whether you’re looking for more information or personalized advice, our team is ready to assist you."
        modalform="becomementor/enroll"
      />

      {/* Section 1 */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Heading Section */}
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-4xl font-bold mb-4 text-gray-900">
                <span className="text-xl md:text-2xl">
                  Welcome to{" "}
                  <span className="glitter_text">AchieversIT</span>
                </span>
                <br />
                Cultivate Future Minds as an Instructor
              </h1>
              <p className="text-gray-600 mb-6">
                Join AchieversIT to share your wisdom, inspire learners globally,
                and shape the future of tech education. Be part of a network devoted to
                excellence and innovation.
              </p>
              <div className="flex justify-center md:justify-start mb-6">
                <button
                  className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10 tracking-widest uppercase"
                  onClick={() => openModal("guideModal")}
                >
                  <span>Mentor and Motivate as a Guide</span>
                </button>
                {activeModal === "guideModal" && (
                  <DwnldAdvisorModalForm
                    title={
                      <>
                        <h2 className="uppercase text-center">
                          Ready to Inspire? <br />
                          <span className="glitter_text uppercase text-xl md:text-2xl">
                            Connect With Us Now!!
                          </span>
                        </h2>
                      </>
                    }
                    text="Provide your information below to get your course syllabus delivered through WhatsApp and Email"
                    closeModal={closeModal}
                    formName="Advisor Form"
                    imageSrc="/assets/images/dwnldbrchrimg.png"
                    downloadPdf={false}
                  />
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center">
              <Image
                src="/assets/images/careereprtpartners.png"
                alt="Tech Professionals"
                className="w-full max-w-md"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounterComponent />

      {/* Form Section */}
      <div className="flex items-center justify-center h-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl p-8">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center relative elementl pb-2 glitter_text uppercase">
              <span>Join the Mentoring Community</span>
            </h2>
            <TrainingAdvisorForm/>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center md:text-left">
              {/* Content Sections */}
              <div className="mb-2">
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-orange-500 uppercase"> Who can Lead?</h3>
                <p className="text-gray-600 leading-relaxed text-md sm:text-xs">
                  Anyone who possesses profound expertise in a specific field and is
                  passionate about educating and imparting their knowledge to students
                  and professionals can lead at AchieversIT. Excellent communication skills
                  are essential.
                </p>
              </div>
              {/* Process Section */}
              <div>
                <h3 className="md:text-xl font-bold text-gray-800 mb-2 text-orange-500 uppercase"> How It Works</h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-md">
                  First step! Complete the application form. If you&apos;re selected, you will
                  undergo a comprehensive training program based on AchieversIT&apos;s teaching
                  approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Banner */}
      <GlblBanner
        bannerheading="JOIN US AS A MENTOR"
        bannertitle={
          <>
            <span className="glitter_text">AchieversIT</span> Mentorship Program
          </>
        }
        bannercontent="Share your expertise and inspire the next generation of tech professionals. Join our community of mentors and make a difference."
        bannerbtn={
          <button onClick={() => openModal("mentorModal")}>Apply Now</button>
        }
      />
      {activeModal === "mentorModal" && (
        <DwnldAdvisorModalForm
          imageSrc="/assets/images/advisor.png"
          key={modalKey}
          formName="mentor/enroll"
          title="Launch Your Career Today"
          text="Provide your information below to kick-start your journey toward a bright future."
          closeModal={closeModal}
          modalclassname="md:max-w-4xl"
          downloadPdf={false}
        />
      )}
    </>
  );
};

export default MentorShip;
