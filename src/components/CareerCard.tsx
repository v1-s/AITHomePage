"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCandidate } from "@/utils/CandidateStoryContext";

interface CareerCardProps {
  name: string;
  role: string;
  image: string;
  prevcompnayrole: string;
  prevcompanyname: string;
  prevcmpnyimage: string;
  presentrole: string;
  presentcompnayname: string;
  presentimage: string;
}

const CareerCard: React.FC<CareerCardProps> = ({
  name,
  image,
  prevcompnayrole,
  prevcompanyname,
  prevcmpnyimage,
  presentrole,
  presentcompnayname,
  presentimage,
}) => {
  const router = useRouter();
  const { setCandidateData } = useCandidate();

  const handleViewStoryClick = () => {
    setCandidateData({
      name,
      image,
      prevcompnayrole,
      prevcompanyname,
      prevcmpnyimage,
      presentrole,
      presentcompnayname,
      presentimage,
    });
    router.push('/candidatestory'); // Navigate to the CandidateStory page
  };

  return (
    <div className="flex flex-col items-center bg-flowGradientTop bg-cover rounded-2xl  p-6">
      {/* Profile Image */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-1 border-white -mt-12 shadow-inside">
        <Image
          src={image} // Replace with the profile image URL
          alt={name}
          width={96}
          height={96}
          className="object-cover"
          loading="lazy"
        />
      </div>
      {/* Name */}
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{name}</h2>
      {/* Roles */}
   <div className="flex  justify-center">
   <div className="mt-4 w-full space-y-4">
        {/* Previous Role */}
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-flowGradientTop bg-cover shadow-glassShadow rounded-full p-2">
            <Image
              src={prevcmpnyimage} // Replace with the icon image URL
              alt={prevcompnayrole}
              width={45}
              height={50}
              loading="lazy"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-800">
              {prevcompnayrole}
            </h3>
            <p className="text-xs text-gray-500">{prevcompanyname}</p>
          </div>
        </div>
        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-6 h-6 border-t-4 border-r-4 border-dashed border-yellow-500 rotate-45"></div>
        </div>
        {/* Present Role */}
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-flowGradientTop blue-50 shadow-glassShadow rounded-full p-2">
            <Image
              src={presentimage} // Replace with the icon image URL
              alt={presentrole}
              width={45}
              height={50}
              loading="lazy"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-800">
              {presentrole}
            </h3>
            <p className="text-xs text-gray-500">{presentcompnayname}</p>
          </div>
        </div>
      </div>
   </div>
      {/* Footer */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewStoryClick}
          className="btn-hover-bg-transition btn-hover-bg-transition-og px-14 py-2 text-black border-slate-950"
          aria-label="View Story"
        >
          <span className="flex items-center justify-between">
            View Story{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CareerCard;
