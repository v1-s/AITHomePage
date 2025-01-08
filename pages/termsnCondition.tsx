"use client"

import React, { useState } from 'react';
import PrivacyPolicy from './privacyPolicy';
import CareerBootcampTerms from './careerBootcampTerms';
import TermsAndConditions from './termsdata';
import AccessibilityPolicy from './accessibilityPolicy';
import RefundPolicy from './refundPolicy';
import CommunityGuidelines from './communityGuideLines';

const TermsPolicyModal = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const termsData = [
    {
      title: "Terms and Conditions",
      component: TermsAndConditions,
    },
    {
      title: "Career Bootcamp Terms and Conditions",
      component: CareerBootcampTerms,
    },
    {
      title: "Accessibility Policy",
      component: AccessibilityPolicy,
    },
    {
      title: "Privacy Policy",
      component: PrivacyPolicy,
    },
    {
      title: "Refund Policy",
      component: RefundPolicy,
    },
    {
      title: "Community Guidelines & Terms",
      component: CommunityGuidelines,
    },
  ];
  const ActiveComponent = termsData[activeIndex].component;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-gray-50">
      {/* Sidebar Section */}
      <div className="w-full md:w-1/4 bg-blue-50 p-6 border-r border-gray-200">
        <ul className="space-y-4">
          {termsData.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer p-3 rounded-md ${
                activeIndex === index
                  ? "bg-maincolor_1 text-white border-r-0 w-full"
                  : "text-gray-600 hover:text-gray-500 hover:bg-blue-200"
              }`}
              aria-label={`View ${item.title}`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-3/4 p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-mainblue mb-4 glitter_text">
          {termsData[activeIndex].title}
        </h1>
        {/* Render the active component */}
        <ActiveComponent />
      </div>
    </div>
  );
};

export default TermsPolicyModal;
