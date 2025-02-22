"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { imageBasePath } from "@/utils/img.config";


interface Tool {
  name: string;
  image: string;
}

interface CourseToolsProps {
  courseUrl: string; // Expecting a clean course URL here
}

const CourseTools: React.FC<CourseToolsProps> = ({ courseUrl }) => {

  const [tools, setTools] = useState<Tool[]>([]);
  const [isDataAvailable, setIsDataAvailable] = useState(true); // Tracks if data is available

  const ImageComponent = ({
    imagePath,
    alt,
    width,
    height,
    className,
  }: {
    imagePath: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }) => {
    const fullImagePath = imageBasePath + imagePath;

    return (
      <Image
        src={fullImagePath}
        alt={alt}
        className={className}
        loading="lazy"
        width={width}
        height={height}
      />
    );
  };
  useEffect(() => {
    const fetchCourseTools = async () => {
      const sessionKey = `courseTools_${courseUrl}`; // Unique key for session storage based on courseUrl
      const cachedData = sessionStorage.getItem(sessionKey); // Check if data is already cached
  
      // Use cached data if available
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          console.log("Loading tools data from session storage:", parsedData);
  
          setTools(parsedData);
          setIsDataAvailable(parsedData.length > 0); // Update availability based on cached data
          return;
        } catch (error) {
          console.error("Error parsing cached tools data:", error);
          sessionStorage.removeItem(sessionKey); // Remove corrupted cache
        }
      }
  
      // Fetch data from API if no valid cached data is available
      console.log("Fetching tools data from API...");
      try {
        const response = await fetch(
          `http://13.235.70.111:3000/course/courseToolsTechnologies?courseUrl=${courseUrl}`
        );
  
        if (!response.ok) {
          console.error("Error fetching course tools:", response.statusText);
          setIsDataAvailable(false); // Mark data as unavailable on error
          return;
        }
  
        const data = await response.json();
  
        if (!data || data.length === 0) {
          console.log("No course tools found.");
          setIsDataAvailable(false); // Mark data as unavailable when empty
          return;
        }
  
        let parsedTools = [];
        try {
          const cleanedJson = data[0].course_tools
            .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
            .replace(/:\s*([a-zA-Z0-9_]+)\s*(?=,|\})/g, ':"$1"');
          parsedTools = JSON.parse(cleanedJson);
        } catch (parseError) {
          console.error("Error parsing tools JSON:", parseError);
          setIsDataAvailable(false); // Mark data as unavailable on parsing error
          return;
        }
  
        // Store parsed tools in session storage
        sessionStorage.setItem(sessionKey, JSON.stringify(parsedTools));
        console.log("Tools data saved to session storage:", parsedTools);
  
        // Update state with parsed tools
        setTools(parsedTools);
        setIsDataAvailable(parsedTools.length > 0); // Update availability based on parsed data
      } catch (error) {
        console.error("Error fetching course tools:", error);
  
        // Use cached data if available as a fallback
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          console.log("Using fallback tools data from session storage.");
          setTools(parsedData);
          setIsDataAvailable(parsedData.length > 0); // Update availability based on cached data
        } else {
          console.log("No cached tools data available. Unable to render tools.");
          setIsDataAvailable(false); // Mark data as unavailable when no fallback exists
        }
      }
    };
  
    fetchCourseTools();
  }, [courseUrl]);
  

  // Navigate to the course URL
  // const handleToCourse = () => {
  //   console.log(courseUrl);
  //   router.push(`/${courseUrl}`); // Directly use courseUrl for navigation
  // };

  // Return null if data is unavailable
  if (!isDataAvailable) {
    return null;
  }

  return (
    <div className="bg-gray-100 flex justify-center py-12">
      <div className="bg-white max-w-6xl w-full p-8 rounded-lg shadow-lg bg-Bg1 bg-cover">
        <h2 className="text-xl md:text-2xl font-bold mb-8 relative elements ">
          Tools & Technologies covered in <span className="glitter_text">{courseUrl.replace(/-/g, " ")}</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
             
              className="flex flex-col items-center justify-center shadow-card rounded-lg p-6 bg-transmedium max-w-lg"
            >
              <ImageComponent
                imagePath={tool.image}
                alt={`${tool.name} Logo`}
                width={500}
                height={500}
                className="max-h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
              <p className="text-center text-wrap break-words">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseTools;

