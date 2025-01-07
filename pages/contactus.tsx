"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faHeadset,
  faBuilding,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons"; 
import dynamic from 'next/dynamic';
import Image from "next/image";

// Dynamically import components to reduce initial load time
const HiringPartners = dynamic(() => import('@/components/HiringPartners'), { ssr: false });
const StatsCounterComponent = dynamic(() => import('@/components/StatsCounterComponent'), { ssr: false });
const Global = dynamic(() => import('@/components/GlobalReach'), { ssr: false });

const GetInTouch = () => {
  const options = [
    {
      icon: <FontAwesomeIcon icon={faComments} className="text-orange-400 h-12 w-12" />, // Chat icon
      title: "Chat",
      description: "Average Time Less than 1 minute",
    },
    {
      icon: <FontAwesomeIcon icon={faHeadset} className="text-orange-400 h-12 w-12" />, // Support icon
      title: "Support",
      description: "kh.support@achieversit.com",
    },
    {
      icon: <FontAwesomeIcon icon={faBuilding} className="text-orange-400 h-12 w-12" />, // Corporate icon
      title: "Corporate",
      description: "kh.corporate@achieversit.com",
    },
    {
      icon: <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-orange-400 h-12 w-12" />, // Invoice icon
      title: "Invoice",
      description: "kh.invoice@achieversit.com",
    },
  ];

  return (
    <>
      <section className="relative bg-contactBg px-6 pb-0 text-white bg-end bg-cover bg-no-repeat">
        {/* Background */}
        <div className="absolute bg-black inset-0 z-0 opacity-50 bg-cover bg-center bg-no-repeat"></div>

        <div className="relative z-10 max-w-7xl flex flex-col md:flex-row items-center justify-between h-[75vh]">
          {/* Left Column: Heading */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">Connect with Us</h1>
            <p className="mt-4 text-xl text-slate-100">
              We’re excited to demonstrate our unwavering dedication to excellence in education.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="md:w-1/2 flex justify-start">
            <Image
              src="/assets/images/contactusfrmbg.png" // Replace with your image path
              alt="Contact Icon"
              className="w-full object-cover"
              width={200}
              height={500}
              priority
            />
          </div>
        </div>
      </section>

      {/* Contact Info Card */}
      <div className="shadow-glassShadow bg-white text-gray-800 rounded-lg mx-auto max-w-md p-4 flex flex-col md:flex-row items-center justify-between relative -mt-20 z-20">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full flex items-center justify-center">
            <Image
              src="/assets/images/contcticon2.png" // Replace with your icon path
              alt="Contact Icon"
              className="w-full h-full object-cover"
              width={200}
              height={300}
              loading="lazy"
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-12 md:mt-0 text-center md:text-left">
          <p className="font-semibold text-md text-cyan-950 text-lg md:text-md ">
            ACHIEVERSIT STUDENTS, NEED ASSISTANCE?
          </p>
          <p className="text-center font-semibold text-md md:text-xl glitter_text">
            CONTACT US At
          </p>
          <p className="mt-2 text-xs md:text-sm">
            <strong>Phone (India):</strong> +91 89517 55400
          </p>
          <p className="text-xs md:text-sm">
            <strong>Phone (US & ROW):</strong> +1 888 732 7043 (Toll Free)
          </p>
        </div>
      </div>

      {/* Support Options Section */}
      <section className="bg-Bg2 bg-cover bg-no-repeat py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Support Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {options.map((option, index) => (
              <div
                key={index}
                className="bg-flowGradientBottom p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg cursor-pointer"
              >
                <div className="text-orange-500 mb-4">{option.icon}</div>
                <h2 className="text-md md:text-lg font-semibold text-gray-800">{option.title}</h2>
                <p className="text-gray-600 mt-2 text-xs md:text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HiringPartners title={
        <>
          <h2 className="text-xl md:text-2xl font-bold">
            <span className="text-maincolor_1 text-lg md:text-3xl glitter_text">
              Join over 15,000+ students <br />
            </span>
            <small> who have trusted AchieversIT for their successful career placements</small>
          </h2>
        </>
      } />
      <StatsCounterComponent />
      <Global />
    </>
  );
};

export default GetInTouch;

