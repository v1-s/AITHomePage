"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { imageBasePath } from "@/utils/img.config";
import { useRouter } from "next/navigation";

interface Tool {
  name: string;
  image: string;
}

interface CourseToolsProps {
  courseUrl: string; // Expecting a clean course URL here
}

const CourseTools: React.FC<CourseToolsProps> = ({ courseUrl }) => {
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);

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
      try {
        const response = await fetch(
          `http://13.232.95.229:3000/course/courseToolsTechnologies?courseUrl=${courseUrl}`
        );
        const data = await response.json();

        let parsedTools = [];
        try {
          const cleanedJson = data[0].course_tools
            .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
            .replace(/:\s*([a-zA-Z0-9_]+)\s*(?=,|\})/g, ':"$1"');
          parsedTools = JSON.parse(cleanedJson);
        } catch (parseError) {
          console.error("Error parsing tools JSON:", parseError);
        }

        setTools(parsedTools);
      } catch (error) {
        console.error("Error fetching course tools:", error);
      }
    };

    fetchCourseTools();
  }, [courseUrl]);

  // Navigate to the course URL
  const handleToCourse = () => {
    console.log(courseUrl);
    router.push(`/${courseUrl}`); // Directly use courseUrl for navigation
  };

  return (
    <div className="bg-gray-100 flex justify-center py-12">
      <div className="bg-white max-w-6xl w-full p-8 rounded-lg shadow-lg bg-Bg1 bg-cover">
        <h2 className="text-2xl font-bold mb-6 relative elements uppercase">
          Tools & Technologies covered in <span className="glitter_text">{courseUrl}</span>
        </h2>
        <div className="grid grid-cols-6 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={handleToCourse} // Navigate on click
              className="flex flex-col items-center justify-center shadow-card rounded-lg p-6 bg-transmedium max-w-lg cursor-pointer"
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
