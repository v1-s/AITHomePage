"use client";

import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Image from "next/image";
const Certificate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers for modal open and close
  const certificateOpenModal = () => setIsModalOpen(true);
  const certificateCloseModal = () => setIsModalOpen(false);

  // Prevent closing the modal when clicking inside the content
  const preventModalClose = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <div className="p-3 bg-gray-50 md:py-0 sm:py-8 bg-gardientCertificate my-20">
      <div className="w-full lg:max-w-6xl mx-auto flex justify-center items-center flex-col md:flex-row p-10 ">
        <div className="w-full md:w-3/5 p-6 md:py-8 text-center">
          {/* Section Title */}
          <h2 className="text-sm lg:text-xl p-3 text-white !leading-[3rem]">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="text-maincolor_1 text-3xl mr-3 hover:scale-110 transition-transform duration-300"
            />
            Enhance your expertise with industry-recognized certifications for global opportunities and Stay ahead in your career with certifications valued by leading <br />
            <span className="font-bold text-maincolor_1 text_glow1 text-3xl mt-2">MNC&apos;s</span>
            <FontAwesomeIcon
              icon={faQuoteRight}
              className="text-maincolor_1 text-3xl ml-3 hover:scale-110 transition-transform duration-300"
            />
          </h2>
        </div>

        <div className="w-full md:w-2/5 p-4">
          {/* Certificate Image with Zoom Button */}
          <div className="flex justify-center">
            <Image
              src="/assets/images/certificate_ait.jpeg"
              alt="Certificate Preview"
              className="w-full cursor-pointer"
              onClick={certificateOpenModal}
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
          <div className="text-center mt-2">
            <button
              className="hover:text-maincolor_1 font-bold text_cert"
              onClick={certificateOpenModal}
            >
              Click to Zoom
            </button>
          </div>
        </div>
      </div>

      {/* Modal Structure */}
      {isModalOpen && (
        <div
          id="certificateModal"
          className="fixed translate-x-0 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
          onClick={certificateCloseModal} // Close modal when clicking on the overlay
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full"
            onClick={preventModalClose} // Prevent modal close when clicking inside
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={certificateCloseModal}
            >
              &times;
            </button>
            <Image
              src="/assets/images/certificate_ait.png"
              alt="Certificate Full View"
              className="w-full rounded-lg"
              width={200}
              height={300}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
