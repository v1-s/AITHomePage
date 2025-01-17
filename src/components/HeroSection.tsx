
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { imageBasePath } from "@/utils/img.config";
import Image from "next/image";
interface ImageComponentProps {
  imagePath: string;
  altText?: string; // Optional alt text for better accessibility
  className?: string; // Optional class for additional styling
}

// ImageComponent receives the imagePath prop and renders an image
const ImageComponent = ({ 
  imagePath, 
  altText = 'Image', 
  className = '' 
}: ImageComponentProps) => {
  // Ensure base path ends correctly and imagePath is handled
  const fullImagePath = `${imageBasePath.replace(/\/$/, '')}/${imagePath.replace(/^\//, '')}`;

  return (
    <Image
      src={fullImagePath}
      alt={altText}
      className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${className}`}
      width={300}
      height={300}
      loading="lazy"
      onLoad={() => {
        console.log(`Image loaded: ${fullImagePath}`);
      }}
      onError={(error) => {
        console.error(`Failed to load image: ${fullImagePath}`, error);
      }}
    />
  );
};

const HeroSection = () => {
  const [reviews, setReviews] = useState<{ name: string; previous_role: string; promoted_to: string; img: string; msg: string }[]>([]);
  const [currentProfile, setCurrentProfile] = useState<{
    name: string;
    previous_role: string;
    promoted_to: string;
    img: string;
    msg: string;
  }>({
    name: "Student Name",
    previous_role: "Previous Role",
    promoted_to: "New Role",
    img: "", // Ensure this is a string, or a valid fallback value
    msg: "AchieversIT helped me achieve my dream career in IT with industry-level training and guidance.",
  });

  // Fetch reviews and preload images
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://13.235.70.111:3000/common/getStudentReview");
        const data = await response.json();

        console.log("API Response:", data);

        // Preload images
        const preloadImages = data.map((review: { img: string }) => {
          return new Promise((resolve) => {
            const img = document.createElement('img') as HTMLImageElement; // Explicitly casting to HTMLImageElement

            img.src = `${review.img}`;
            img.onload = () => resolve(review); // Resolve once the image is loaded
            img.onerror = () => resolve(review); // Resolve even if loading fails
          });
        });

        // Wait until all images are preloaded
        const preloadedReviews = await Promise.all(preloadImages);

        // Update state with preloaded reviews
        setReviews(preloadedReviews);

        // Set the first profile
        if (preloadedReviews.length > 0) {
          const firstReview = preloadedReviews[0];
          setCurrentProfile({
            name: firstReview.name || "Student Name",
            previous_role: firstReview.previous_role || "Previous Role",
            promoted_to: firstReview.promoted_to || "New Role",
            img: firstReview.img || "", // Ensure img is a valid string
            msg: firstReview.msg || "No review available",
          });
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // Cycle through profiles every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfile((prevProfile) => {
        const currentIndex = reviews.findIndex((review) => review.name === prevProfile.name);
        const nextIndex = (currentIndex + 1) % reviews.length;
        return reviews[nextIndex];
      });
    }, 5000); // Change profile every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [reviews]);

  // Scroll to the featured programs section
  const scrollToFeaturedPrograms = () => {
    if (typeof window !== "undefined") {
      const section = document.getElementById("featured-programs");
      if (!section) return;

      const headerOffset = 70; // Adjust based on the height of your fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      const duration = 3000; // Duration of the scroll in ms (3 seconds)
      let startTime: number | null = null;

      const smoothScroll = (currentTime: DOMHighResTimeStamp) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        const run = ease(timeElapsed, window.pageYOffset, offsetPosition - window.pageYOffset, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
          requestAnimationFrame(smoothScroll);
        }
      };

      // Ease function for smooth scroll
      const ease = (t: number, b: number, c: number, d: number): number => {
        const tNorm = t / d;
        return (
          b +
          c *
            (tNorm < 0.5
              ? 4 * tNorm * tNorm * tNorm
              : 1 - Math.pow(-2 * tNorm + 2, 3) / 2)
        );
      };

      requestAnimationFrame(smoothScroll);
    }
  };

  // Conditionally render based on the availability of the currentProfile
  if (!currentProfile || !currentProfile.previous_role) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-heroSecBg relative flex flex-col lg:flex-row p-5 py-10 lg:py-12 sm:justify-center shadow-inside">
      <div className="sm:w-full lg:w-6/12 md:flex items-center">
        <div className="my-5 lg:m-5 md:pl-5 px-4 lg:px-8 flex flex-col items-center sm:items-start">
          <h1 className="w-full leading-tight font-bold text-2xl md:text-5xl text-white text-center sm:text-left md:text-left">
            Empower Your <br className="hidden md:block" />
            Future with<br />
            <span className="lz-animation animate-shimmer font-bold text-maincolor_1 relative overflow-hidden inline-block">
              Assured Outcomes
            </span>
          </h1>
          <p className="text-white text-sm md:text-xl my-4 text-center text-left md:text-left">
            India’s leading career institute offering result-oriented learning.
            <br />
            Enter the tech industry industry-ready.
          </p>
          <button
            type="button"
            className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
            onClick={scrollToFeaturedPrograms} // Trigger scroll on button click
          >
            <span>EXPLORE COURSES</span>
          </button>
        </div>
      </div>

      <div className="sm:w-full lg:w-6/12 md:w-full sm:w-full flex justify-center items-center mt-6 md:mt-0 sm:justify-center">
        <div className="relative">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start px-4 max-w-[800px] mx-auto transition-transform duration-500 ease-in-out">
            <div className="relative right-0 w-[full] bg-gradientWhiteOverlay rounded-tr-tr-40 rounded-bl-bl-40 text-center overflow-hidden z-20">
              <div className="px-2 flex items-center h-auto w-full p-4 bg-transparent shadow-card rounded-lg z-10 text-wrap">
                <p className="text-black text-sm sm:text-base md:text-lg font-medium">
                  {currentProfile.previous_role}
                </p>
                <Image
                  src="/assets/images/heroarrow.svg"
                  className="w-1/2"
                  alt="Arrow Image"
                  width={200}
                  height={100}
                />
                <p className="text-black text-sm sm:text-base md:text-lg font-medium">
                  {currentProfile.promoted_to}
                </p>
              </div>
            </div>

            <div className="rounded-full md:w-[380px] bg-gradientGrayToBeige shadow-hard flex justify-center items-center md:mt-6 lg:-ml-[100px] border border-gray-300 relative z-12 overflow-hidden">
              <ImageComponent imagePath={currentProfile.img || "assets/images/ajayreddy.png"} />
            </div>

            <div className="absolute -bottom-5  flex lg:flex bg-gradientWhiteOverlay rounded-tl-[40px] rounded-br-[40px] text-center overflow-hidden h-auto max-w-[500px]">
              <div className="px-2 flex flex-col items-center bg-transparent justify-center h-full w-full max-w-[500px] lg:min-w-0 p-3 shadow-card rounded-lg z-10">
                <p className="text-xs md:text-base font-medium min-h-[60px] text-wrap">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="text-maincolor_1 text-sm md:text-3xl mr-2 opacity-60"
                    style={{ fontSize: "1.5rem" }}
                  />
                  <span className="text-xs md:text-base">{currentProfile.msg}</span>
                  <FontAwesomeIcon
                    icon={faQuoteRight}
                    className="text-maincolor_1 text-sm md:text-3xl ml-2 opacity-60"
                    style={{ fontSize: "1.5rem" }}
                  />
                </p>
                <h2 className="text-sm md:text-xl font-semibold text-maincolor_1 md:mt-2">
                  - {currentProfile.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
