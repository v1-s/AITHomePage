"use client";
import React, { useEffect, useState } from "react";
import { imageBasePath } from "@/utils/img.config";
import Image from "next/image";

interface HiringPartnersProps {
  heading?: string;
  headingClassName?: string; 
  children?: React.ReactNode; 
  title?: React.ReactNode; 
}

interface PartnerLogo {
  image_name: string;
  alt: string;
}

const HiringPartners: React.FC<HiringPartnersProps> = ({ title }) => {
  const [logos, setLogos] = useState<PartnerLogo[]>([]); // State to hold logos
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const ImageComponent = ({ imagePath }: { imagePath: string }) => {
    const fullImagePath = imageBasePath + imagePath;
    return <Image src={fullImagePath} alt="Student" className="w-full h-auto object-contain" loading="lazy" width={200} height={200} />;
  };

  useEffect(() => {
    const fetchLogos = async () => {
      const sessionKey = "collaboratingPartners"; // Key for session storage
      const cachedData = sessionStorage.getItem(sessionKey); // Check if data is already cached
  
      // Use cached data if available
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          console.log("Loaded data from session storage:", parsedData);
  
          setLogos(parsedData); // Set state with cached data
          setLoading(false); // Set loading to false as data is available
          return;
        } catch (error) {
          console.error("Error parsing cached data:", error);
          sessionStorage.removeItem(sessionKey); // Clear corrupted cache
        }
      }
  
      // Fetch data from API
      console.log("Fetching data from API...");
      try {
        const response = await fetch(
          "http://13.235.70.111:3000/common/getCollaboratingPartners"
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch logos");
        }
  
        const data = await response.json();
        console.log("Fetched data from API:", data);
  
        // Save data to session storage
        sessionStorage.setItem(sessionKey, JSON.stringify(data));
        console.log("Data saved to session storage:", data);
  
        setLogos(data); // Update state with API data
      } catch (error: unknown) {
        // Handle API errors
        console.error("Error fetching logos:", error);
  
        if (cachedData) {
          // Fallback to cached data if available
          const parsedData = JSON.parse(cachedData);
          console.log("Using fallback data from session storage:", parsedData);
  
          setLogos(parsedData);
        } else {
          console.log("No cached data available. Unable to render logos.");
          setLogos([]); // Set an empty state if no cached data is available
        }
  
        // Set error message
        if (error instanceof Error) {
          setError(error.message || "An error occurred while fetching logos.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };
  
    fetchLogos();
  }, []);
  

  // If loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error
  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="md:py-8 my-8 w-full mx-auto">
      <div className="text-center mb-6">
        {/* Render title dynamically */}
        {title}
      </div>

      <div className="overflow-hidden relative shadow-insideSoft py-2 md:py-4">
        <div className="logo-scroll m-2">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="logo-item rounded-lg shadow-insideSoft p-4 w-24 md:w-32 h-auto md:h-24 flex items-center justify-center"
            >
              <ImageComponent imagePath={logo.image_name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiringPartners;
