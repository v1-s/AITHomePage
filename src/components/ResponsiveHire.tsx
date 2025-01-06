import React, { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    image: "/assets/images/companylogo/Microsoft.webp",
    quote: "Collaborating with AchieversIT has significantly boosted our project outcomes. Their professionals bring exceptional expertise, consistently exceeding our expectations and driving efficiency.",
    name: "Sachin Bansal",
  },
  {
    id: 2,
    image: "/assets/images/companylogo/wipro.webp",
    quote: "The partnership with AchieversIT has been transformative. Their team delivers top-notch solutions, enabling us to achieve our objectives swiftly and effectively.",
    name: "Vijay Shekhar Sharma",
  },
  {
    id: 3,
    image: "/assets/images/companylogo/PayPal.webp",
    quote: "AchieversIT has been instrumental in our success. Their skilled professionals provide unparalleled support, helping us reach new milestones with ease.",
    name: "Bhavish Aggarwal",
  },
  {
    id: 4,
    image: "/assets/images/companylogo/EY.webp",
    quote: "Working with AchieversIT has elevated our projects to new heights. Their experts offer invaluable insights, ensuring we meet our goals efficiently and innovatively.",
    name: "Deepinder Goyal",
  },
  {
    id: 5,
    image: "/assets/images/companylogo/Google.webp",
    quote: "AchieversIT has been a game-changer for our initiatives. Their dedicated team consistently delivers high-quality results, propelling us toward success.",
    name: "Byju Raveendran",
  },
];

const SliderTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const currentTestimonial = testimonials[currentIndex];
    const fullText = currentTestimonial.quote;
    const typingDuration = 4000; // Typing duration
    const interval = typingDuration / fullText.length; // Interval per character

    let leftIndex = Math.floor(fullText.length / 2) - 1;
    let rightIndex = leftIndex + 1;

    const typeInterval = setInterval(() => {
      if (leftIndex >= 0 || rightIndex < fullText.length) {
        const leftChar = leftIndex >= 0 ? fullText[leftIndex] : "";
        const rightChar = rightIndex < fullText.length ? fullText[rightIndex] : "";
        setDisplayedText((prev) => leftChar + prev + rightChar);
        leftIndex--;
        rightIndex++;
      } else {
        clearInterval(typeInterval);

        // Wait for 6 seconds after typing is completed
        setTimeout(() => {
          setIsTyping(false);
          setTransitioning(true);
          setTimeout(() => {
            setTransitioning(false);
            setIsTyping(true);
            setDisplayedText("");
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
          }, 1000); 
        }, 6000); 
      }
    }, interval);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  return (
    <section className="w-full py-12">
      <div className="w-full md:w-4/5 mx-auto px-4">
        <div className="mt-10 text-center">
          <div className="relative h-auto flex items-center justify-center">
            <div
              key={testimonials[currentIndex].id} 
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${transitioning ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
                }`}
              style={{
                maxWidth: "100%",
                textAlign: "center",
              }}
            >
              <blockquote className="relative glitter_text font-semibold">
                <span>&quot;{displayedText}&quot;</span>
                {isTyping && <span className=""></span>}
              </blockquote>

              <p className="font-bold text-gray-600 my-4">
                - {testimonials[currentIndex].name}
              </p>
              <div className="flex justify-center mb-4">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  height={200}
                  width={180}
                  className="object-contain h-full"
                  aria-label={`Logo of ${testimonials[currentIndex].name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderTestimonial;
