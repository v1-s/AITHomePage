"use client";
import Link from "next/link";
import React, { JSX } from "react"; // Import JSX namespace from React
import Image from "next/image";

interface ContactDetail {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  type: "phone" | "mail";
}

interface SocialLink {
  icon: JSX.Element; // Replace with the correct type for your icons (e.g., FontAwesomeIcon type)
  url: string;
  color: string;
  hoverColor: string;
}

interface LocationData {
  logoSrc: string;
  logoAlt: string;
  logoLink: string;
  description: string;
  contactDetails: ContactDetail[];
  socialLinks: SocialLink[];
  mapTitle: string;
  mapSrc: string;
  type: string;
}

const LocationComponent = ({ locationData }: { locationData: LocationData }) => {
  const locations = [
    {
      label: "BTM Bangalore",
      value: "63, 1st Floor, 16th Main, 8th Cross BTM 1st Stage, BTM Layout, Bengaluru, Karnataka 560029",
      icon: "🏢",
      iconColor: "text-blue-500",
      mapLink: "https://maps.app.goo.gl/DDztdTtq6nUeofWH8",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31111.94499949061!2d77.6223133!3d12.9081632!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1548e290313f%3A0xfaf25026cfa3458d!2sAchieversIT!5e0!3m2!1sen!2sin!4v1736084143430!5m2!1sen!2sin",
    },
    {
      label: "Marathalli Bangalore",
      value: "1, 4th Main Rd, Extension, Ayyappa Layout, Chandra Layout, Marathahalli, Bengaluru, Karnataka 560037",
      icon: "🏢",
      iconColor: "text-blue-500",
      mapLink: "https://maps.app.goo.gl/iFUFKpYokz94C6Qa6",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.288533933943!2d77.70197677584525!3d12.95337978736033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1359f187ff7f%3A0x24c3decd3581f625!2sAchieversIT!5e0!3m2!1sen!2sin!4v1736084246241!5m2!1sen!2sin",
    },
    {
      label: "Kukatpally Hyderabad",
      value: "101, 1st floor, Vandana's Trade Center, Bhagya Nagar Colony Rd, next to LIC office, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072",
      icon: "🏢",
      iconColor: "text-blue-500",
      mapLink: "https://maps.app.goo.gl/BXCJN6qyyPunh2KaA",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2472969389232!2d78.39836277592018!3d17.49570458341009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9147cbc0f477%3A0x83d4d5d8c9f3db3f!2sAchieversIT!5e0!3m2!1sen!2sin!4v1736084356243!5m2!1sen!2sin",
    },
  ];

  return (
    <div className="relative w-full pb-20">
      <div className="relative z-10 w-full lg:max-w-7xl mx-auto my-5 p-2">
        <h1 className="text-center text-xl  md:text-3xl font-bold mb-12">
          <span className="glitter_text element relative   md:after:-translate-x-1/2 ">Get in Touch & Visit Us</span>
        </h1>

        <div className="flex flex-col lg:flex-row bg-white shadow-card rounded-lg overflow-hidden w-full mx-auto relative">
          <div className="flex-1 p-6 lg:max-w-[50%] text-wrap flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <Link
                href={locationData.logoLink}
                className="flex items-center space-x-0 pb-2 mb-2 border-b-2 "
              >
                <Image
                  src={locationData.logoSrc}
                  alt={locationData.logoAlt}
                  className="w-15"
                  width={200}
                  height={100}
                />
              </Link>
              <p className="text-gray-400 mb-6 text-wrap font-bold text-xs md:text-sm">
                {locationData.description}
              </p>

              <div className="mb-6">
                {locationData.contactDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-start mb-4 cursor-pointer transform hover:scale-105 transition duration-200 ease-in-out text-left"
                  >
                    <span className={`${detail.iconColor} text-xl mr-4`}>
                      {detail.icon}
                    </span>
                    <a
                      href={detail.type === "phone" ? `tel:${detail.value}` : `mailto:${detail.value}`}
                      className="text-blue-500"
                      aria-label={`${detail.label}: ${detail.value}`}
                    >
                      <p className="font-bold text-blue-500 text-md lg:text-xl">{detail.label}:</p>
                      <p className="text-gray-600 text-xs md:text-sm">{detail.value}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start mb-4 cursor-pointer transform hover:scale-105 transition duration-200 ease-in-out text-left shadow-card p-2 flex-grow">
              <iframe
                title={locationData.mapTitle}
                src={locationData.mapSrc}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="flex-1 p-6 lg:max-w-[50%] text-wrap border-l-2">
            <div className="text-center lg:text-left">
              <h2 className="text-xl md:text-3xl font-bold text-gray-700 mb-8 relative border-b-2 pb-2 mb-4 text-center glitter_text mb-2">Locations</h2>
              <div className="flex flex-col gap-2">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start mb-4 cursor-pointer transform hover:scale-105 transition duration-200 ease-in-out text-left shadow-card  p-2"
                  >
                    <div className="flex items-start">
                      <span className={`${location.iconColor} text-xl mr-4`}>
                        {location.icon}
                      </span>
                      <div>
                        <p className="font-bold text-blue-500">{location.label}:</p>
                        <p className="text-gray-600 text-sm">{location.value}</p>
                      </div>
                    </div>
                    <iframe
                      title={`${location.label} Map`}
                      src={location.mapSrc}
                      className="w-full h-32 border-0 mt-2"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-flowGradientBottom rounded-t-5xl"></div>
    </div>
  );
};

export default LocationComponent;
