"use client";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { imageBasePath } from "@/utils/img.config";
import Image from "next/image";
interface Testimonial {
  studentName: string;
  studentRole: string;
  studentImage: string;
  studentRating: number; // Assuming rating is a number
  studentQuote: string;
  colorClass: string;
  studentlinkedIN: string; // Assuming this is the URL to LinkedIn
}

export const colorClasses = [
  "border-mainBlue",
];

const Reviews = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]); // State to store the fetched data
  const [isPausedTop, setIsPausedTop] = useState(false);
  const [isPausedBottom, setIsPausedBottom] = useState(false);
  // Suppress the unused variable warning for scroll positions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollPositionTop, setScrollPositionTop] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollPositionBottom, setScrollPositionBottom] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://13.232.95.229:3000/common/homePageReview");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
  
        // Double the testimonials array and assign a unique color to each card
        const doubledTestimonials = [...data, ...data];
        const uniqueColorTestimonials = doubledTestimonials.map((testimonial, index) => ({
          ...testimonial,
          colorClass: colorClasses[index % colorClasses.length], // Cycle through colors
        }));
  
        setTestimonials(uniqueColorTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
  
    fetchTestimonials();
  }, []); // This effect will run once when the component is mounted
  

  const scrollRefTop = useRef<HTMLDivElement>(null);
  const scrollRefBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const containerTop = scrollRefTop.current;
      const containerBottom = scrollRefBottom.current;

      if (containerTop && containerBottom) {
        const scrollWidth = containerTop.scrollWidth / 2;

        const scroll = () => {
          if (!isPausedTop) {
            setScrollPositionTop((prev) => {
              const newPos = prev + 1;
              containerTop.style.transform = `translateX(-${newPos}px)`;
              return newPos >= scrollWidth ? 0 : newPos;
            });
          }

          if (!isPausedBottom) {
            setScrollPositionBottom((prev) => {
              const newPos = prev + 1;
              containerBottom.style.transform = `translateX(-${newPos}px)`;
              return newPos >= scrollWidth ? 0 : newPos;
            });
          }
        };

        const interval = setInterval(scroll, 20);
        return () => clearInterval(interval);
      }
    }
  }, [isPausedTop, isPausedBottom]);

  const ImageComponent = ({
    imagePath,
    altText,
  }: {
    imagePath: string;
    altText: string;
  }) => {
    const fullImagePath = imagePath.startsWith("http")
      ? imagePath // Use the full URL if it's already absolute
      : `${imageBasePath}${imagePath}`; // Append base path for relative URLs
  
    return (
      <Image
        src={fullImagePath}
        alt={altText}
        width={400}
        height={160}
        className="w-full h-full object-cover rounded-full shadow-hard"
        loading="lazy"
      />
    );
  };
  

  return (
    <div className="relative py-8 text-center">
      <div className="p-3">
        <h1 className="text-xl md:text-2xl  lg:text-3xl font-bold text-center">Our Learners, Our Pride</h1>
        <p className="text-center mb-20 text-sm md:text-base glitter_text inline-block element relative after:bottom-N20">
          &quot;Celebrating the brilliance and dedication of every learner.&quot;
        </p>
      </div>

      {/* Scrolling container - Top row */}
      <div
        style={{
          position: "relative",
          maxWidth: "100%",
          overflowX: "clip",
          display: "flex",
        }}
        className="mt-14"
      >
        <div
          ref={scrollRefTop}
          className="flex whitespace-nowrap"
          style={{
            display: "flex",
            willChange: "transform",
          }}
          onMouseEnter={() => setIsPausedTop(true)}
          onMouseLeave={() => setIsPausedTop(false)}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => {
          

            return (
              <div key={index} className={`relative bg-white shadow-card md:h-35 mx-4 flex-shrink-0 w-64 md:w-80 p-2 rounded-lg border-b-8 ${testimonial.colorClass}`} style={{ position: "relative", overflow: "visible" }}>
                <div className={`absolute left-1/2 transform -translate-x-1/2 -top-10 md:-top-14 w-16 md:w-24 h-16 md:h-24 rounded-full overflow-visible flex items-center justify-center bg-white border-4 ${testimonial.colorClass}`} style={{ zIndex: 10 }}>
                  <ImageComponent imagePath={testimonial.studentImage} altText={testimonial.studentName} />
                </div>

                <div className="text-center mt-10">
                  <p className="text-gray-600 italic break-words text-pretty text-center text-sm md:text-base">
                    {testimonial.studentQuote}
                  </p>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className={`font-bold text-base my-4 text-gray-800}`}>
                      {testimonial.studentName}
                    </h3>

                    <a href={testimonial.studentlinkedIN} className="inline-block text-mainBlue cursor-pointer" aria-label={`LinkedIn profile of ${testimonial.studentName}`}>
                      <FontAwesomeIcon icon={faLinkedin} className="text-2xl md:text-3xl" />
                    </a>
                  </div>

                  <p className="text-blue-500 font-bold text-sm md:text-base">{testimonial.studentRole}</p>

                  <div className="flex justify-center my-4">
                  {Array(5)
  .fill(0)
  .map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={`text-lg mx-1 ${
        index < testimonial.studentRating ? "text-yellow-400" : "text-gray-300"
      }`}
    />
  ))}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrolling container - Bottom row */}
      <div
        style={{
          position: "relative",
          maxWidth: "100%",
          overflowX: "clip",
          display: "flex",
        }}
        className="mt-70"
      >
        <div
          ref={scrollRefBottom}
          className="flex whitespace-nowrap"
          style={{
            display: "flex",
            willChange: "transform",
          }}
          onMouseEnter={() => setIsPausedBottom(true)}
          onMouseLeave={() => setIsPausedBottom(false)}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className={`relative bg-white shadow-card mx-4 md:h-35 mx-4 flex-shrink-0 w-64 md:w-80 p-2 rounded-lg border-b-8 ${testimonial.colorClass}`}
              style={{
                position: "relative",
                overflow: "visible",
              }}
            >
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 -top-10 md:-top-14 w-16 md:w-24 h-16 md:h-24 rounded-full overflow-visible flex items-center justify-center bg-white border-4 ${testimonial.colorClass}`}
                style={{
                  zIndex: 10,
                }}
              >
                <ImageComponent imagePath={testimonial.studentImage} altText={testimonial.studentName} />
              </div>

              <div className="text-center mt-10">
                <p className="text-gray-600 italic break-words text-pretty text-center text-sm md:text-base">
                  {testimonial.studentQuote}
                </p>
                <div className="flex justify-center items-center gap-3">
                <h3 className={`font-bold text-base my-4 text-gray-800}`}>

                    {testimonial.studentName}
                  </h3>

                  <a href={testimonial.studentlinkedIN} className="inline-block text-mainBlue cursor-pointer" aria-label={`LinkedIn profile of ${testimonial.studentName}`}>
                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl md:text-3xl" />
                  </a>
                </div>

                <p className="text-blue-500 font-bold text-sm md:text-base">{testimonial.studentRole}</p>

                <div className="flex justify-center my-4">
                {Array(5)
  .fill(0)
  .map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={`text-lg mx-1 ${
        index < testimonial.studentRating ? "text-yellow-400" : "text-gray-300"
      }`}
    />
  ))}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;


