"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import the icon

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== "undefined") {

      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowButton(true); // Show button when scrolling more than 300px
        } else {
          setShowButton(false); // Hide button when less than 300px
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll to top
      });
    }
  };

  return (
    // Render button only if it should be shown (scrolled down 300px or more)
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-maincolor_1 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        style={{
          zIndex: 30, // High z-index to ensure it's on top of all sections
        }}
        aria-label="Scroll to top"
      >
        {/* FontAwesomeIcon with rotation */}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="fa-rotate-270 text-white"
          style={{ fontSize: "1.5em" }} // Rotate the arrow and apply color
        />
      </button>
    )
  );
};

export default ScrollToTopButton;
