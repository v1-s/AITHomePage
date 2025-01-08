"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// Define FAQ type
interface FAQ {
  question: string;
  answer: string;
}

interface FAQComponentProps {
  faqData: FAQ[]; // Accept FAQ data as a prop
}

const FAQComponent: React.FC<FAQComponentProps> = ({ faqData }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Toggle accordion functionality
  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full lg:max-w-6xl mx-auto flex justify-center my-10 lg:my-20 p-2">
      <div className="w-full mt-2 mb-8 sm:p-4 p-1 shadow-card transition-all duration-200 p-4 bg-white">
        <h1 className="mx-auto text-xl  md:text-3xl font-bold mb-4 border-b pb-3 text-left border-b border-darkBlue">
          Faq&apos;s
        </h1>
        <div id="accordion">
          {faqData && faqData.length > 0 ? (
            faqData.map((item: FAQ, index: number) => (
              <div
                key={index}
                className={`border-b my-2 accordion-item transition-all duration-200 ease-in-out`}
              >
                <button
                  className="w-full text-left p-4 text-gray-700 font-medium flex justify-between items-center focus:outline-none shadow bg-Bg1 bg-cover bg-bottom bg-no-repeat border-b"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={expandedIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <h3 className="font-semibold text-sm md:text-base">
                    {item.question}
                  </h3>
                  <span className="accordion-icon transition-transform duration-200">
                    <FontAwesomeIcon
                      icon={expandedIndex === index ? faMinus : faPlus}
                      className="text-lg text-maincolor_1"
                    />
                  </span>
                </button>
                <div
                  id={`faq-content-${index}`}
                  className={`accordion-content overflow-hidden transition-all duration-200 ease-in-out ${
                    expandedIndex === index
                      ? "max-h-screen mt-2 bg-white bg-cover bg-bottom bg-no-repeat"
                      : "max-h-0"
                  }`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                >
                  <div className="p-4 text-gray-600 text-xs md:text-sm text-wrap">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No FAQs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;