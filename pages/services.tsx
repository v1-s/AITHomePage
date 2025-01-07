"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import PlacementBanner from '@/components/PlacementBanner';
import Image from "next/image";
import BannerSplPromo from '@/components/splbannerpromo';
import StaticHeroComponent from './../src/components/StaticHeroComponent';
import Reviews from "@/components/Reviews";

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Career Enhancement Opportunities",
      description: [
        "Comprehensive guidance to help individuals excel in technical and non-technical domains.",
        "Focused training on life skills, communication, and problem-solving abilities.",
        "Mock interview simulations to prepare for real-world challenges.",
        "Personalized assistance in crafting impressive resumes and professional profiles.",
        "Exclusive access to job opportunities with industry leaders.",
      ],
      icon: "/icons/upskilling.svg",
      color: "#3B82F6", // Hex color for blue
      image: "/assets/images/upskillingncareerops.png",
    },
    {
      id: 2,
      title: "Professional Growth Programs",
      description: [
        "Practical workshops to bridge the gap between academic knowledge and practical application.",
        "Hands-on training for in-demand skills tailored to industry needs.",
        "Customized sessions to help learners meet competitive job market demands.",
      ],
      icon: "/icons/skill-development.svg",
      color: "#22C55E", // Hex color for green
      image: "/assets/images/skilldevelopement.png",
    },
    {
      id: 3,
      title: "Educator Empowerment Initiatives",
      description: [
        "Programs designed to enhance teaching methodologies and skillsets of educators.",
        "Cutting-edge resources and techniques to stay ahead of educational trends.",
        "Opportunities for ongoing learning and development in teaching practices.",
        "Encouraging collaboration and innovation among academic staff.",
        "Enhancing overall student outcomes through improved teaching quality.",
      ],
      icon: "/icons/faculty-awareness.svg",
      color: "#EAB308", // Hex color for yellow
      image: "/assets/images/awarenessprog.png",
    },
    {
      id: 4,
      title: "Real-World Internship Opportunities",
      description: [
        "Gain hands-on experience by working on real-world industry projects.",
        "Exposure to the professional work environment to boost confidence.",
        "Develop problem-solving skills through practical application of knowledge.",
        "Build an impressive portfolio of work experience for future opportunities.",
      ],
      icon: "/icons/internship.svg",
      color: "#06B6D4", // Hex color for cyan
      image: "/assets/images/startup_intrnshp.png",
    },
    {
      id: 5,
      title: "Hands-On Project Experiences",
      description: [
        "Opportunities to work on live projects across multiple domains.",
        "Guidance from industry mentors to refine project execution skills.",
        "Encouraging innovation and critical thinking through real challenges.",
        "Equipping participants with job-ready expertise.",
      ],
      icon: "/icons/projects.svg",
      color: "#F97316", // Hex color for orange
      image: "/assets/images/projxpernce.png",
    },
    {
      id: 6,
      title: "Guest Speakers and Expert Panels",
      description: [
        "Access to sessions by industry experts and thought leaders.",
        "Learn from the experiences and insights of seasoned professionals.",
        "Networking opportunities with influential personalities.",
        "Discover the latest trends and technologies in the field.",
      ],
      icon: "/icons/guest-lectures.svg",
      color: "#8B5CF6", // Hex color for violet
      image: "/assets/images/trainedxperts.png",
    },
    {
      id: 7,
      title: "Certified Learning Pathways",
      description: [
        "Courses designed to provide certification upon successful completion.",
        "Boost your resume with industry-recognized certifications.",
        "Validate your skills and knowledge for better career prospects.",
      ],
      icon: "/icons/certification.svg",
      color: "#10B981", // Hex color for emerald
      image: "/assets/images/updatedcurriculum.png",
    },
    {
      id: 8,
      title: "Workshops and Knowledge Sharing",
      description: [
        "Interactive workshops to enhance technical and soft skills.",
        "Focused sessions on trending topics and industry advancements.",
        "Collaborative learning environment to promote knowledge exchange.",
      ],
      icon: "/icons/workshops.svg",
      color: "#EC4899", // Hex color for pink
      image: "/assets/images/knldgesharing.png",
    },
    {
      id: 9,
      title: "Higher Education Guidance",
      description: [
        "One-on-one counseling to help students choose the right career path.",
        "Support in identifying suitable higher education opportunities.",
        "Guidance on application processes and required documentation.",
      ],
      icon: "/icons/higher-education.svg",
      color: "#14B8A6", // Hex color for teal
      image: "/assets/images/klndguidance.png",
    },
    {
      id: 10,
      title: "Industry-Driven Skill Programs",
      description: [
        "Skill-building programs aligned with current industry demands.",
        "Enhance your employability with value-added courses.",
        "Practical insights and training from industry professionals.",
      ],
      icon: "/icons/industry-programs.svg",
      color: "#06B6D4", // Hex color for cyan
      image: "/assets/images/indstryskllprog.png",
    },
    {
      id: 11,
      title: "Customized Solutions for Learners",
      description: [
        "Tailored programs to meet the unique needs of learners.",
        "Specialized content to focus on specific skill gaps.",
        "Flexible learning options to match your schedule and goals.",
      ],
      icon: "/icons/customized-services.svg",
      color: "#3B82F6", // Hex color for blue
      image: "/assets/images/learners.png",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <StaticHeroComponent
        titleContext={"Empowering Careers with Industry-Leading Training"}
        titleSubContext={
          <>
            <span className="glitter_text">Transform</span> Your Career with AchieversIT Institute: <br />
            Tailored Learning Solutions for <span className="glitter_text">Your Success</span>
          </>
        }
        modalTitle="Have an inquiry?"
        modalText="Our experts are available to guide you every step of the way. Let’s start the conversation now!"
        modalform="services/enroll"
      />
      <h2 className="text-3xl font-semibold text-center text-maincolor_1 uppercase glitter-text pb-1 my-10 mb-14 element relative">
        Our Services
      </h2>
      <div className="w-full md:w-4/5 lg:w-3/4 grid grid-cols-1 gap-12 mx-auto md:grid-cols-2 lg:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center gap-4 bg-white rounded-lg shadow-card hover:shadow-card hover:scale-105 transition-transform duration-300 p-4"
          >
            <Image
              src={service.image}
              alt={service.title}
              className="w-16 h-auto mb-4 md:mb-0 md:w-16 md:h-auto lg:w-16 lg:h-auto"
              width={200}
              height={300}
              priority
            />
            <div className="flex-1">
              <p
                className="font-semibold text-lg pl-5"
                style={{ color: service.color }}
              >
                {service.title}
              </p>
              <ul className="text-gray-700 text-sm list-disc pl-5">
                {service.description.map((point, index) => (
                <li key={index} className="flex items-start space-x-2" style={{ listStyleType: "none" }}>
                <FontAwesomeIcon
                  icon={faHandPointRight}
                  style={{ color: service.color }}
                  className="mt-1"
                />
                <span>{point}</span>
              </li>
              
                ))}
              </ul>
            </div>
            <span
              className="w-2 rounded-lg hidden"
              style={{
                height: "100%",
                backgroundColor: service.color,
              }}
            ></span>
          </div>
        ))}
      </div>
      <Reviews />
      <PlacementBanner />
      <BannerSplPromo />
    </>
  );
};

export default Services;
