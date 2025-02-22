'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define the interface for a single logo
interface Logo {
  name: string; // Name of the image file
}

interface GroupedLogos {
  group_1: Logo[];
  group_2: Logo[];
  group_3: Logo[];
  group_4: Logo[];
}

// Component to display a row of logos
const LogoRow: React.FC<{ logos: Logo[] }> = ({ logos }) => {
  const imageBasePath = "https://www.achieversit.com/";

  // Create the infinite loop by repeating logos dynamically
  const allLogos = [...logos, ...logos, ...logos]; // Repeat logos for seamless looping

  return (
    <div className="flex justify-center py-4" style={{ width: "100%" }}>
      <div
        className="scrolling-logos"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 45s linear infinite", // Infinite scrolling animation
        }}
      >
        {allLogos.map((logo, index) => {
          const imageUrl = `${imageBasePath}${logo.name}`;
          return (
            <div key={index} className="flex items-center justify-center w-24 md:w-32 bg-white mx-3">
              <Image
                src={imageUrl}
                alt={`Logo ${index}`}
                className="object-contain shadow-card rounded p-3"
                width={200}
                height={80}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${imageBasePath}/assets/images/companylogo/google.webp`; // Fallback image
                }}
              />
            </div>
          );
        })}
      </div>
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0); /* Start position */
            }
            100% {
              transform: translateX(-33.33%); /* Move completely across */
            }
          }
          .scrolling-logos {
            display: flex;
            gap: 0; /* No space between logos */
            align-items: center;
            will-change: transform; /* Performance optimization */
            animation-timing-function: linear;
            animation-duration: 18s; /* Faster scrolling */
          }
        `}
      </style>
    </div>
  );
};

// Main component to fetch and display grouped logos
const CarouselContainer: React.FC = () => {
  const [logosData, setLogosData] = useState<GroupedLogos | null>(null); // State to store fetched data

  useEffect(() => {
    const fetchLogos = async () => {
      const sessionKey = "companyLogos"; // Key for session storage
      const cachedData = sessionStorage.getItem(sessionKey); // Check for cached data
  
      // Use cached data if available
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          console.log("Loading logos from session storage:", parsedData);
          setLogosData(parsedData); // Update state with cached data
          return;
        } catch (error) {
          console.error("Error parsing cached data:", error);
          sessionStorage.removeItem(sessionKey); // Remove corrupted cache
        }
      }
  
      // If no cached data, fetch from API
      console.log("Fetching logos from API...");
      try {
        const response = await fetch("http://13.235.70.111:3000/common/getCompanyPartners");
  
        if (!response.ok) {
          throw new Error("Failed to fetch logos");
        }
  
        const data = await response.json();
        console.log("Fetched logos data from API:", data);
  
        // Transform the data into the expected structure
        const groupedLogos: GroupedLogos = {
          group_1: data[0]?.group_1?.map((logo: { name: string }) => ({
            name: logo.name.replace(/^\//, ''), // Remove leading slash
          })) || [],
          group_2: data[1]?.group_2?.map((logo: { name: string }) => ({
            name: logo.name.replace(/^\//, ''), // Remove leading slash
          })) || [],
          group_3: data[2]?.group_3?.map((logo: { name: string }) => ({
            name: logo.name.replace(/^\//, ''), // Remove leading slash
          })) || [],
          group_4: data[3]?.group_4?.map((logo: { name: string }) => ({
            name: logo.name.replace(/^\//, ''), // Remove leading slash
          })) || [],
        };
  
        // Store the transformed data in session storage
        sessionStorage.setItem(sessionKey, JSON.stringify(groupedLogos));
        console.log("Logos data saved to session storage:", groupedLogos);
  
        // Update state with transformed data
        setLogosData(groupedLogos);
      } catch (error) {
        console.error("Error fetching logos from API:", error);
  
        // Use cached data as fallback if available
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          console.log("Using fallback logos data from session storage:", parsedData);
          setLogosData(parsedData);
        } else {
          console.log("No cached logos data available. Unable to render logos.");
          setLogosData(null); // Clear state if no data is available
        }
      }
    };
  
    fetchLogos();
  }, []);
  

  return (
    <div className="carousel-container pt-5 rounded pb-3 text-center">
      <h3 className="text-center pt-3 p-3 pb-2 text-xl md:text-2xl lg:text-3xl font-bold inline-block element relative after:bottom-N10 glitter_text">
        Empowering Students to Secure Placements in Top Companies
      </h3>

      <div className="relative overflow-hidden py-8 mx-auto">
        {logosData === null ? (
          <div className="text-gray-500">Loading logos...</div> // Placeholder message
        ) : (
          <div>
            {/* Render each group of logos */}
            <LogoRow logos={logosData.group_1} />
            <LogoRow logos={logosData.group_2} />
            <LogoRow logos={logosData.group_3} />
            <LogoRow logos={logosData.group_4} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselContainer;

