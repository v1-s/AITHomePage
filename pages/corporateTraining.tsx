"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import CorContactForm from "@/components/CorporateContactForm";
import HiringPartners from "@/components/HiringPartners";
import StaticHeroComponent from "@/components/StaticHeroComponent";
import CircularGraphSection from "@/components/graphs";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";

import ClientSlider from "@/components/ClientSlider";
import TrainingAdvisorForm from "@/components/MentorForm";


interface CorporateTrainingProps {
  title: string;
  description: string;
}

const CorporateTraining: React.FC<CorporateTrainingProps> = ({ title, description }) => {
  const [activeForm, setActiveForm] = useState<string | null>(null); // Track active form
  const [modalKey, setModalKey] = useState<number>(0); // Unique key to force re-render

  const toggleForm = (formName: string) => {
    if (activeForm === formName) {
      setActiveForm(null); // Close the currently active form
    } else {
      setActiveForm(null); // Reset the state first
      setTimeout(() => {
        setActiveForm(formName); // Open the clicked form
        setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
      }, 0); // Small delay ensures React processes state reset
    }
  };

  const handleModalClose = () => {
    setActiveForm(null); // Close all forms
  };


  const faq = [
    {
      question: "What is Professional Skill Development?",
      answer:
        "Professional skill development encompasses educational programs that help employees enhance their expertise, productivity, and performance in the workplace. These programs focus on leadership, technical knowledge, and soft skills, tailored to meet industry demands.",
    },
    {
      question: "What Does Our Training Cover?",
      answer:
        "Our corporate training covers a broad spectrum of topics, including communication strategies, leadership training, technical skills enhancement, and personalized courses for specific business needs. Delivered by industry experts, our training ensures employees gain practical, job-relevant insights.",
    },
    {
      question: "Why Is Training Essential for Organizations?",
      answer:
        "Training is crucial for boosting workforce efficiency and staying competitive in dynamic industries. Employees with updated skills contribute to innovation, improved workflows, and better client satisfaction, helping organizations achieve sustained success.",
    },
    {
      question: "How Does Employee Training Differ from Internships?",
      answer:
        "Employee training focuses on enhancing the skills of existing staff to meet specific business challenges, while internships primarily provide fresh graduates with practical experience and industry exposure. Training programs are more advanced and goal-driven.",
    },
    {
      question: "What Are the Costs Involved?",
      answer:
        "The cost of our corporate training depends on the program's scope, duration, and the number of participants. We customize programs to align with organizational budgets and objectives, ensuring maximum return on investment.",
    },
    {
      question: "How Does Training Contribute to Growth?",
      answer:
        "Our training programs empower companies to develop a skilled workforce, enhance leadership, and boost overall productivity. With tailored training solutions, businesses can foster innovation, collaboration, and long-term success.",
    },
    {
      question: "What Methods Are Used in Training Programs?",
      answer:
        "We employ diverse methods such as workshops, interactive e-learning sessions, and on-the-job coaching to deliver engaging and effective training. These approaches ensure employees apply newly acquired skills directly in their roles.",
    },
  ];
  function closeMenu(): void {
    // Implementation to close the menu
    const menu = document.querySelector('.menuclassName');
    if (menu) {
      menu.classList.remove('open');
    }
  }

  return (
    <>
      <div className="">
        <StaticHeroComponent
          titleSubContext={
            <>
              <span className="glitter_text">Transform</span> Your Goals into
              Reality: <br />
              Expert Services, Tailored for{" "}
              <span className="glitter_text">Your Success</span>
            </>
          }
          onEnrollClick={() => toggleForm("enrollForm")}
          modalTitle="Achieve Your Goals with Expert Guidance"
          modalText="Share your details to receive personalized solutions and insights from our experts"
          modalform="corporate/enroll"
        />

        <div className="max-w-7xl mx-auto my-10 bg-flowGradientTop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Left Column */}
            <div className="p-6 text-left mx-4 flex flex-col">
              <h1 className="text-2xl lg:text-2xl font-bold mb-4">
                Empower your team to excel in essential business skills and
                drive success.
              </h1>
              <p className="mb-4 text-xs md:text-md">In this demo, you’ll learn about:</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                {[
                  "Unlimited access to 28,000+ fresh courses across tech, business, leadership, and wellness",
                  "Robust platform features offering on-demand, immersive, and cohort-based learning for your team",
                  "Personalized learning and actionable learner insights to drive high usage and course completion rates",
                  "Access to expert instructors for live sessions and Q&A",
                  "Comprehensive learning paths to guide your team from beginner to expert",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCanadianMapleLeaf}
                      className="mr-2 text-maincolor_1"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center sm:space-x-4 gap-4 md:gap-0">
                <button
                  className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
                  onClick={() => toggleForm("advisorForm")}
                >
                  <span> Enroll Now</span>
                </button>

                {activeForm === "advisorForm"  && (
                  <DwnldAdvisorModalForm
                    imageSrc="/assets/images/advisor.png"
                    key={modalKey}
                    formName="corporate/enroll"
                    title="Get started on your journey to success!"
                    text="Provide your details below to enroll and let our experts guide you toward achieving your goals"
                    closeModal={handleModalClose} // Close modal using the same toggle function
                    downloadPdf={false}
                  />
                )}

                <span className="text-gray-600 hidden sm:block mx-3">or</span>
                <button
                  className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
                  onClick={() => toggleForm("brochureForm")}
                >
                  <span> Start 14-Day Free Trial</span>
                </button>
                {activeForm === "brochureForm" &&( // Prevent advisor modal from opening when brochure is active
                    <DwnldAdvisorModalForm
                      imageSrc="/assets/images/dwnldbrchrimg.png"
                      key={modalKey}
                      formName="start 14 day free trail"
                      title="Transform your goals into reality!"
                      text="Provide your information below to unlock a 15-day free trial of expert services today!"
                      closeModal={handleModalClose}
                      downloadPdf={false}
                    />
                  )}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="p-6 flex flex-col justify-center">
            <h2 className="text-lg md:text-xl md:text-2xl font-bold mb-6 glitter_text pb-3">Contact Us</h2>
              <TrainingAdvisorForm/>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Partners Section */}
      <HiringPartners
        title={
          <>
            <h2 className="text-sky-900 text-3xl uppercase ">
              Trusted by{" "}
              <span className=" glitter_text">
                digital leaders and practitioners
              </span>{" "}
              from 100+ Fortune 500 companies
            </h2>
          </>
        }
      />

      {/* Learning Banner with Tabbed Content */}
      <CircularGraphSection />
      {/* FAQ Section */}
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 my-10 ">
        <div className=" w-full md:w-4/5 mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Corporate Training
          </h1>
          <div className="space-y-8">
            {faq.map((item, index) => (
              <div key={index} className="bg-white shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {item.question}
                </h2>
                <p className="text-gray-600 text-xs md:text-md">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <ClientSlider/>
      

      </div>
     
    </>
  );
};

export default CorporateTraining;
