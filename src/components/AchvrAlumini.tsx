"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { imageBasePath } from "@/utils/img.config";

const alumni = [
  {
    name: "Akshhat Srivastava",
    company: "Google",
    image: "/assets/images/review-pic-1.png", // Replace with your image path
    logoimg: "/assets/images/companylogo/Accenture.webp",
  },
  {
    name: "Bharat Anand Sarvi",
    company: "Zepto",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amazon.webp",
  },
  {
    name: "Ravneet Singh",
    company: "IndiGo",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amdocs.webp",
  },
  {
    name: "Gowtham M",
    company: "Tiger Analytics",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bosch.webp",
  },
  {
    name: "Shubham Rane",
    company: "CureFit",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bajaj.webp",
  },
  {
    name: "Suruchi Singh",
    company: "Publicis Sapient",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Cisco.webp",
  },
  { name: "Suruchi Singh", company: "Publicis Sapient", image: "/assets/images/review-pic-2.jpg", logoimg: "/assets/images/companylogo/Cisco.webp" },
  { name: "Dummy Alumni 1", company: "Company A", image: "/assets/images/review-pic-2.jpg", logoimg: "/assets/images/companylogo/Cisco.webp" },
  { name: "Dummy Alumni 2", company: "Company B", image: "/assets/images/review-pic-2.jpg", logoimg: "/assets/images/companylogo/Cisco.webp" },
  { name: "Dummy Alumni 3", company: "Company C", image: "/assets/images/review-pic-2.jpg", logoimg: "/assets/images/companylogo/Cisco.webp" },
  { name: "Dummy Alumni 4", company: "Company D", image: "/assets/images/review-pic-2.jpg", logoimg: "/assets/images/companylogo/Cisco.webp" },
  { name: "Dummy Alumni 5", company: "Company E", image: "/assets/images/review-pic-2.jpg", logoimg: "/assets/images/companylogo/Cisco.webp" },
  { name: "Dummy Alumni 6", company: "Company F", image: "/assets/images/review-pic-2.jpg", logoimg: "/assets/images/companylogo/Cisco.webp" },
  {
    name: "Akshhat Srivastava",
    company: "Google",
    image: "/assets/images/review-pic-1.png", // Replace with your image path
    logoimg: "/assets/images/companylogo/Accenture.webp",
  },
  {
    name: "Bharat Anand Sarvi",
    company: "Zepto",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amazon.webp",
  },
  {
    name: "Ravneet Singh",
    company: "IndiGo",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amdocs.webp",
  },
  {
    name: "Gowtham M",
    company: "Tiger Analytics",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bosch.webp",
  },
  {
    name: "Shubham Rane",
    company: "CureFit",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bajaj.webp",
  },
  {
    name: "Suruchi Singh",
    company: "Publicis Sapient",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Cisco.webp",
  },
  {
    name: "Akshhat Srivastava",
    company: "Google",
    image: "/assets/images/review-pic-1.png", // Replace with your image path
    logoimg: "/assets/images/companylogo/Accenture.webp",
  },
  {
    name: "Bharat Anand Sarvi",
    company: "Zepto",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amazon.webp",
  },
  {
    name: "Ravneet Singh",
    company: "IndiGo",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amdocs.webp",
  },
  {
    name: "Gowtham M",
    company: "Tiger Analytics",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bosch.webp",
  },
  {
    name: "Shubham Rane",
    company: "CureFit",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bajaj.webp",
  },
  {
    name: "Suruchi Singh",
    company: "Publicis Sapient",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Cisco.webp",
  },
  {
    name: "Akshhat Srivastava",
    company: "Google",
    image: "/assets/images/review-pic-1.png", // Replace with your image path
    logoimg: "/assets/images/companylogo/Accenture.webp",
  },
  {
    name: "Bharat Anand Sarvi",
    company: "Zepto",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amazon.webp",
  },
  {
    name: "Ravneet Singh",
    company: "IndiGo",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Amdocs.webp",
  },
  {
    name: "Gowtham M",
    company: "Tiger Analytics",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bosch.webp",
  },
  {
    name: "Shubham Rane",
    company: "CureFit",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Bajaj.webp",
  },
  {
    name: "Suruchi Singh",
    company: "Publicis Sapient",
    image: "/assets/images/review-pic-2.jpg", // Replace with your image path
    logoimg: "/assets/images/companylogo/Cisco.webp",
  },
];


export const borderColorClasses = [
  "border-maincolor_1",
  "border-blue-500",
  "border-green-500",
  "border-yellow-500",
  "border-purple-500",
  "border-pink-500",
  "border-indigo-500",
  "border-teal-500",
  "border-orange-500",
  "border-gray-500",
];
const fallbackImage = "/assets/images/banner-img2.png"; 
/**
 * AlumniSection component displays a list of alumni with their details.
 * It includes functionality to load more alumni profiles on button click.
 */
const AlumniSection: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 3 more cards
  };
  const ImageComponent = ({ imagePath }: { imagePath: string }) => {
    const [hasError, setHasError] = useState(false);
    const fullImagePath = imageBasePath + imagePath;
    const handleError = () => {
      setHasError(true); // Set error state if image fails to load
    };
    return (
      <Image
        src={hasError ? fallbackImage : fullImagePath}
        alt="Student"
        className="w-full object-cover rounded-lg"
        loading="lazy"
        width={300}
        height={200}
        onError={handleError} 
      />
    );
  };
    
  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 elementl pb-2  relative glitter_text w-3/4  mx-auto">
        Meet Our Alumni
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 w-3/4 mx-auto py-12">
        {alumni.slice(0, visibleCount).map((alum, index) => {
          const colorClass = borderColorClasses[index % borderColorClasses.length]; // Assign a color class to each alumni card
          return (
              <div
              key={index}
              className={`relative bg-white shadow-card md:h-35 mx-4 flex-shrink-0 w-64 md:w-80 p-2 rounded-lg border-b-8 ${colorClass} relative overflow-visible`}
            >
              {/* Image Section */}
              <div
  className={`absolute left-1/2 transform -translate-x-1/2 -top-10 md:-top-14 w-16 md:w-24 h-16 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-white border-4 ${colorClass} z-10`}
>
  <ImageComponent imagePath={alum.image} />
</div>


              <div className="text-center mt-10">
                <p className="text-gray-600 italic break-words text-pretty text-center text-sm md:text-base">
                  {alum.name}
                </p>
                <div className="flex justify-center items-center gap-3">
                  <h3 className="font-bold text-base my-4 text-gray-800">
                    {alum.name}
                  </h3>

                  <a
                    href={`https://www.linkedin.com/in/${alum.name}`}
                    className="inline-block text-mainBlue cursor-pointer"
                    aria-label={`LinkedIn profile of ${alum.name}`}
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl md:text-3xl" />
                  </a>
                </div>

                <p className="text-blue-500 font-medium text-sm md:text-base">{alum.company}</p>
              </div>
              <div className="flex justify-center my-4">
  {[...Array(5)].map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className="text-yellow-400 text-lg mx-1"
    />
  ))}
</div>

            </div>
          );
        })}
      </div>

      {visibleCount < alumni.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="btn-solid-bg-transition btn-solid-bg-transition-orange px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            <span>Load More</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AlumniSection;
