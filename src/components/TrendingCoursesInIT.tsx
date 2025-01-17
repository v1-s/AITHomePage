"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import trendingCourses from "@/utils/TrendITCourses"; // Static courses with colors and images

interface TitleProps {
  text: string;
  className?: string;
}

interface CourseFromAPI {
  id: number;
  course_name: string;
  category: string;
  course_url: string;
}

interface StaticCourse {
  color: string;
  image: string;
}

interface MergedCourse extends StaticCourse, CourseFromAPI {}

const TrendingCoursesInIT: React.FC<TitleProps> = ({ text, className }) => {
  const [coursesData, setCoursesData] = useState<MergedCourse[]>([]);
  const router = useRouter();

  // Fetch courses data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://13.235.70.111:3000/common/getCoursesPerCategory?region=global");
        const apiCourses = await response.json();

        // Merge the API data with static image and color data
        const mergedCourses = apiCourses.map((course: CourseFromAPI, index: number) => {
          const staticCourse = trendingCourses[index % trendingCourses.length]; // Use modulo to prevent index out of bounds
          return {
            ...course,
            color: staticCourse.color,
            image: staticCourse.image,
          };
        });

        setCoursesData(mergedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Handle navigation to the course details page
  function handleToCourse(course_url: string) {
    router.push(`/${course_url}`);
  }

  return (
    <div className="py-12 m-2">
      <h2
        className={`text-xl md:text-3xl font-bold text-center mb-10 relative elementl pb-3 mb-14 glitter_text ${className || ""}`}
      >
        {text}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {coursesData.map((course) => (
          <div
            key={course.id}
            className="flex items-center space-x-4 p-4 border rounded-lg shadow bg-white hover:shadow-card transition-shadow duration-300 cursor-pointer"
            onClick={() => handleToCourse(course.course_url)} // Using course_url for navigation
            aria-label={`Navigate to ${course.course_name}`}
          >
            <span className={`w-2 h-full ${course.color} rounded-lg`}></span>
            <div className="flex-1">
              <p className="text-gray-800 font-semibold">{course.course_name}</p>
              <p className="text-sm text-gray-600">{course.category}</p>
            </div>
            <Image
              src={course.image} // Static image from JSON
              alt={course.course_name}
              className="w-10 h-10"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoursesInIT;

