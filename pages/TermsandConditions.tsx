"use client"

import React, { useState } from "react";
import Link from "next/link";

const TermsPolicyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Button to Open Modal */}
      <button
        onClick={openModal}
        className="bg-mainblue text-white px-4 py-2 rounded hover:bg-blue-600"
        aria-label="View Terms and Policy"
      >
        View Terms and Policy
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Terms and Policies</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close Modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <h3 className="text-md font-bold mb-2">Terms of Service</h3>
              <p className="text-xl sm:text-lg mb-4">
                Welcome to AchieversIT! By accessing or using our website, you
                agree to comply with and be bound by the following terms and
                conditions.
              </p>
              <p className="text-xl sm:text-lg mb-4">
                <strong>1. Acceptance of Terms:</strong> By accessing or using
                our services, you agree to be bound by these Terms and
                Conditions, which may be updated periodically.
              </p>
              <p className="text-xl sm:text-lg mb-4">
                <strong>2. Use of Services:</strong> You may use our website and
                services only for lawful purposes. You agree not to misuse or
                disrupt our services in any way.
              </p>
              <p className="text-xl sm:text-lg mb-4">
                <strong>3. Privacy Policy:</strong> We value your privacy.
                Please refer to our Privacy Policy to understand how we collect
                and use your personal information.
              </p>
              <p className="text-xl sm:text-lg mb-4">
                <strong>4. Liability:</strong> AchieversIT is not liable for any
                damages or losses that may result from using our website or
                services.
              </p>
              <p className="text-xl sm:text-lg mb-4">
                <strong>5. Governing Law:</strong> These Terms and Conditions
                are governed by the laws of the jurisdiction where AchieversIT
                operates.
              </p>
              <p className="text-xl sm:text-lg mb-4">
                By continuing to use our website, you confirm your acceptance of
                these Terms and Conditions. If you disagree with any part of
                these terms, please do not use our services.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-mainblue text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
                aria-label="Contact Us for Questions"
              >
                <span>Contact Us for Questions</span>
              </Link>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={closeModal}
                className="bg-maincolor_1 text-white px-4 py-2 rounded hover:bg-maincolor_1"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsPolicyModal;
