"use client";

import React from "react";
// import StaticHeroComponent from "@/components/StaticHeroComponent";
import StatsSection from "@/components/AchvStatsSection";
import Image from "next/image";
import TrainingAdvisorForm from "@/components/MentorForm";
import { useRouter } from 'next/navigation';
import AlumniSection from "@/components/AchvrAlumini";
import Link from "next/link";
import { useState } from "react";
import DwnldAdvisorModalForm from "./forms/advisorfrm";
interface InclusiveEnvironmentCard {
  bgColor: string;
  title: string;
  description: string;
}

interface CareerBenefitsCard {
  image: string;
  title: string;
  description: string;
}

interface DynamicCards {
  section: string;
  cards: InclusiveEnvironmentCard[] | CareerBenefitsCard[];
}

const dynamicCards: DynamicCards[] = [
  {
    section: "inclusiveEnvironment",
    cards: [
      {
        bgColor: "bg-cyan-500",
        title: "Diversity at the Core",
        description:
          "We celebrate the uniqueness of every individual and promote a culture where diverse voices are heard and valued. Our team thrives on bringing together perspectives from different walks of life to drive creativity and collaboration.",
      },
      {
        bgColor: "bg-violet-500",
        title: "Innovation Mindset",
        description:
          "We are future-focused, constantly exploring new ideas and solutions to stay ahead. Our passion for innovation fuels everything we do, ensuring we remain at the forefront of technological advancements.",
      },
      {
        bgColor: "bg-rose-500",
        title: "Empowering People",
        description:
          "Our organization is built around our people. We are committed to fostering a supportive environment that prioritizes employee growth, wellness, and inclusivity, making sure every team member feels valued and empowered.",
      },
      {
        bgColor: "bg-indigo-500",
        title: "Make a Difference",
        description:
          "Join us in creating meaningful change by equipping professionals worldwide with critical digital skills. Together, we can drive transformation, enabling individuals to achieve their goals and reshape their futures.",
      },
    ] as InclusiveEnvironmentCard[],
  },
  {
    section: "careerBenefits",
    cards: [
      {
        image: "./assets/images/2.png",
        title: "Craft Your Career Path",
        description:
          "Take charge of your career with abundant opportunities for advancement and skill development. At OurCompany, you’ll find a space to grow, explore diverse roles, and shape your professional journey.",
      },
      {
        image: "./assets/images/3.png",
        title: "Supportive Work Environment",
        description:
          "Become part of a culture that values teamwork, transparency, and innovation. Our workplace encourages collaboration and ensures that everyone feels connected, inspired, and supported to achieve their best.",
      },
      {
        image: "./assets/images/4.png",
        title: "Grow with Real-World Learning",
        description:
          "Learning never stops here. From hands-on projects to structured training programs, we equip you with the tools and resources to expand your expertise and excel in your field.",
      },
      {
        image: "./assets/images/1.png",
        title: "Well-Being Comes First",
        description:
          "We care deeply about our employees’ health, happiness, and work-life balance. Enjoy benefits like comprehensive health coverage, flexible schedules, and generous leave policies designed to support you both professionally and personally.",
      },
    ] as CareerBenefitsCard[],
  },
];


const Careers = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle the button click
  const handleExploreClick = () => {
    router.push('/JobListingPage'); // Navigate to the jobListing page
  };
  const inclusiveEnvironment = dynamicCards.find(
    (card) => card.section === "inclusiveEnvironment"
  )?.cards as InclusiveEnvironmentCard[];
 
  const [activeForm, setActiveForm] = useState<string | null>(null); // Track the currently open form
  const [modalKey, setModalKey] = useState(0);

  const toggleForm = (formName: string) => {
    setActiveForm(formName);
    setModalKey((prevKey) => prevKey + 1); // Ensure the modal always re-renders
  };

  const handleModalClose = () => {
    setActiveForm(null); // Close the active form
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full py-10 md:py-16 flex items-center justify-center bg-bannerBg bg-cover bg-center shadow-inside">
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-auto text-center px-4">
          <p className="text-white text-sm md:text-lg font-semibold tracking-wider uppercase mb-4">
          <span className="glitter_text">Enhance </span> Your Career Prospects with AchieversIT<br />
          </p>
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold !leading-snug mb-6">
          Discover New Pathways with   <span className="glitter_text">Professional Guidance</span> and <span className="glitter_text">Education</span>
          </h1>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
                 onClick={() => toggleForm("advisorForm")}
              className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
            >
              <span>Enquire Now</span>
            </button>
            {activeForm === "advisorForm" && (
                    <DwnldAdvisorModalForm
                    imageSrc="/assets/images/advisor.png"
                    key={modalKey}
                      formName="career"
                      title="Enquire Now to Start Your Learning Journey"
                      text="Want to know more about our courses and training programs? Contact us today, and our team will guide you toward achieving your goals."
                      closeModal={handleModalClose} // Close modal using the same toggle function
                      modalclassname=""
                      downloadPdf={false}
                    />
            )}
            <button
                onClick={() => toggleForm("brochureForm")}// Use Link for page navigation
              className="btn-hover-bg-transition btn-hover-bg-transition-og px-14"
            >
              <span>Discover Your Career</span>
            </button>
              {activeForm === "brochureForm" && (  // Prevent advisor modal from opening when brochure is active
                            <DwnldAdvisorModalForm
                              imageSrc="/assets/images/dwnldbrchrimg.png"
                              key={modalKey}
                              formName="career"
                              title="Discover Your Dream Career"
                              text="Take the first step toward achieving your professional goals. Explore opportunities, develop your skills, and transform your career."
                              closeModal={handleModalClose}
                              downloadPdf={false}
                            />
                          )}
          </div>
        </div>
     </div>
      < div className="py-10 px-45 bg-flowGradientTop">
        <div className="w-full md:4/5 mx-auto">
          {/* <h1 className="elementl text-3xl text-center relative ">
            <span className="glitter_text">Careers</span>

          </h1> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch px-6 py-12">

            {/* Image Section */}
            <div className="flex justify-center h-full">
              <Image
                src="/assets/images/careers.png" // Replace with your image path
                width={500}
                height={200}
                alt="Team working"
                className=" h-full object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold relative elements pb-1 mb-8">
                Join a World of Opportunities and Growth
              </h2>
              <p className="text-gray-600 mb-4 text-sm md:tetx-base">
                Step into an environment where innovation meets ambition. Our organization is more than a workplace – it&apos;s a platform where your ideas are valued, your efforts are celebrated, and your career aspirations are nurtured. With a global footprint and a dynamic approach to problem-solving, we offer you the chance to work on impactful projects, expand your skillset across multiple domains, and collaborate with industry pioneers.
              </p>
              <p className="text-gray-600 mb-4 text-sm md:tetx-base">
                Here, every team member is an integral part of our journey. We are committed to fostering an inclusive, supportive, and growth-oriented culture that empowers you to excel. With access to continuous learning, mentorship, and cutting-edge resources, you can carve a path toward unparalleled professional development.
              </p>
              <p className="text-gray-600 mb-4 text-sm md:tetx-base">
                As we grow and redefine possibilities in our industry, we invite you to join a team that inspires innovation, fuels passion, and drives meaningful change. Be part of something bigger – be part of our success story. Together, we can achieve greatness!
              </p>
            </div>

            {/* Button Section */}

          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center items-center">
            <button  className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10 tracking-widest uppercase" onClick={() => toggleForm("opportunityForm")}>
              <span>  Explore Job Openings</span>
            </button>
            
             {activeForm ==="opportunityForm" && (
                     <DwnldAdvisorModalForm
                     imageSrc="/assets/images/advisor.png"
                     key={modalKey}
                       formName="homepage/enroll"
                       title="Launch Your Career Today"
                       text="Provide your information below to get Kick-start your journey toward a bright future."
                       closeModal={handleModalClose} // Close modal using the same toggle function
                       modalclassname=" md:max-w-4xl"
                       downloadPdf={false}
                     />
             )}
          </div>
        </div>

      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Inclusive Environment Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-12 glitter_text relative element pb-4">
          The Value of Being with AchieversIT
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {inclusiveEnvironment.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} p-6 rounded-lg shadow-card transform transition-transform duration-300 hover:scale-105`}
            >
              <h3 className="text-md md:text-xl text-white font-bold mb-4 relative elementl pb-4 mb-6">
                {card.title}
              </h3>
              <p className="text-sm font-bold text-white">{card.description}</p>
            </div>
          ))}
        </div>
      </section>



       <div className="relative bg-bannerBg3 bg-fixed bg-no-repeat bg-cover py-12">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content Section */}
        <div className="relative max-w-7xl mx-auto px-6 ">
          {/* Title Section */}
          <h2 className="text-3xl font-bold text-center text-white element relative pb-2 mb-8">
            <span className="text-white">What Awaits You Here?</span>
          </h2>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row  items-center gap-8">
              <Image
                  src="/assets/images/own_Career.png"
                  alt="Career Icon"
                  className="w-24 h-24"
                  width={100}
                  height={100}
                />
                <div>
                  <h1 className="font-bold text-2xl text-mainBlue mb-2 text-left glitter_text">
                    Chart Your Own Career
                  </h1>
                  <p className="text-gray-600 text-left font-semibold">
                    Take control of your professional journey. We provide the tools,
                    support, and opportunities to help you shape your career path,
                    explore new possibilities, and define your role within a dynamic
                    environment. The future of your career is yours to design.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row  items-center gap-8">
                <Image
                  src="/assets/images/work_culture.png"
                  alt="Work Culture Icon"
                  className="w-24 h-24"
                  width={100}
                  height={100}
                />
                <div>
                  <h1 className="font-bold text-2xl text-mainBlue mb-2 text-left glitter_text">
                    Collaborative Work Culture
                  </h1>
                  <p className="text-gray-600 text-left font-semibold">
                    Experience the freedom to grow and innovate in a culture that
                    values openness and collaboration. Our team fosters inclusivity,
                    encourages diverse ideas, and ensures every voice is heard,
                    making it the perfect environment to thrive professionally.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Image
                  src="/assets/images/upskill_evolve.png"
                  alt="Upskill Icon"
                  className="w-24 h-24"
                  width={100}
                  height={100}
                />
                <div>
                  <h1 className="font-bold text-2xl text-mainBlue mb-2 text-left glitter_text">
                    Upskill and Evolve
                  </h1>
                  <p className="text-gray-600 text-left font-semibold">
                    Enhance your expertise and grow continuously with access to
                    cutting-edge learning opportunities. From specialized training to
                    hands-on projects, we support your journey toward skill mastery
                    and career excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row  items-center gap-8">
                <Image
                  src="/assets/images/world_class.png"
                  alt="World-Class Facilities Icon"
                  className="w-24 h-24"
                  width={100}
                  height={100}
                />
                <div>
                  <h1 className="font-bold text-2xl text-mainBlue mb-2 text-left glitter_text">
                    World-Class Facilities
                  </h1>
                  <p className="text-gray-600 text-left font-semibold">
                    Work in a space designed to inspire and empower. Our top-tier
                    facilities are crafted to provide comfort, convenience, and
                    productivity, ensuring you have everything you need to excel at
                    what you do best.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="text-center mt-8">
            <button  className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10 tracking-widest uppercase "  onClick={() => toggleForm("jobopprForm")}>
             
              <span>Explore Opportunities</span>
            </button>
            {activeForm === "jobopprForm"  && (
                     <DwnldAdvisorModalForm
                     imageSrc="/assets/images/advisor.png"
                     key={modalKey}
                       formName="homepage/enroll"
                       title="Launch Your Career Today"
                       text="Provide your information below to get Kick-start your journey toward a bright future."
                       closeModal={handleModalClose} // Close modal using the same toggle function
                       modalclassname=" md:max-w-4xl"
                       downloadPdf={false}
                     />
             )}
          </div>
        </div>
      </div> 


      {/* Life at AchieversIT Section */}
      < section className=" text-center bg-flowGradientTop py-10" >
        <div className="w-full md:w-3/4 mx-auto">
          <div className="p-8">
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-semibold text-maincolor_1 uppercase glitter_text relative elementl pb-2 mb-8">
                Our Culture at AchieversIT
              </h3>
              <div className="w-full p-5 bg-gray-50 rounded-md shadow-card">
                <iframe
                  className="w-full h-64 sm:h-72 md:h-80 rounded-md"
                  src="https://www.youtube.com/embed/your-video-id"
                  title="Life at AchieversIT"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Employee Reviews Section */}
      {/* < Reviews /> */}

<AlumniSection/>
     


      <div className="relative bg-bannerBg4 bg-fixed bg-no-repeat bg-cover py-12 mt-20">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content Section */}
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Title Section */}
          <div className="w-full w-4/5 mx-auto bg-white p-8">
            <h2 className="text-3xl font-bold text-center text-white element relative pb-2 mb-8">
              <span className="text-black">Talk to our training advisor</span>
            </h2>

            {/* Grid Section */}
            <TrainingAdvisorForm />
          </div>

          {/* Button Section */}
          <div className="text-center mt-8">
            <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10 tracking-widest uppercase"
      onClick={() => toggleForm("jobForm")}>
              <span>Explore Opportunities</span>
            </button>
            { activeForm === "jobForm" && (
                     <DwnldAdvisorModalForm
                     imageSrc="/assets/images/advisor.png"
                     key={modalKey}
                       formName="homepage/enroll"
                       title="Launch Your Career Today"
                       text="Provide your information below to get Kick-start your journey toward a bright future."
                       closeModal={handleModalClose} // Close modal using the same toggle function
                       modalclassname=" md:max-w-4xl"
                       downloadPdf={false}
                     />
             )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;

