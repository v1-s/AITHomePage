"use client"

import { useEffect, useState } from "react";
import CareerCard from "@/components/CareerCard";
import Banner from "@/components/BannerEnrollCourse";
import FAQComponent from "@/components/Faq";
import React from 'react';
import TrendingCoursesInIT from "@/components/TrendingCoursesInIT";
import StatsCounterComponent from "@/components/StatsCounterComponent";
import faqData from "@/utils/faq";
import ClientSlider from "@/components/ClientSlider";
import Image from "next/image";

interface Career {
  name: string;
  role: string;
  prevcmpnyimage: string;
  prevcompnayrole: string;
  prevcompanyname: string;
  presentimage: string;
  presentrole: string;
  presentcompnayname: string;
  image: string;
  storyLink: string;
}

const ReviewPage = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [visibleCareers, setVisibleCareers] = useState(3); // Initially show 3 careers

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        // Dummy career data
        const data: Career[] = [
          {
            name: "Alex Carter",
            role: "Cloud Engineer",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "Cloud Engineer",
            prevcompanyname: "Cloudify",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "Cloud Architect",
            presentcompnayname: "TechVision",
            image: "/assets/images/banner-img1.png",
            storyLink: "/careers"
          },
          {
            name: "Sophia Mitchell",
            role: "Frontend Developer",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "Frontend Developer",
            prevcompanyname: "CodeBase",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "Full Stack Developer",
            presentcompnayname: "CodeMasters",
            image: "/assets/images/banner-img2.png",
            storyLink: "/careers"
          },
          {
            name: "David Johnson",
            role: "DevOps Engineer",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "DevOps Engineer",
            prevcompanyname: "TechHub",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "Site Reliability Engineer",
            presentcompnayname: "InnovaTech",
            image: "/assets/images/banner-img3.png",
            storyLink: "/careers"
          },
          {
            name: "Emma Wilson",
            role: "Backend Developer",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "Backend Developer",
            prevcompanyname: "DigitalWave",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "Software Engineer",
            presentcompnayname: "NextGen",
            image: "/assets/images/banner-img1.png",
            storyLink: "/careers"
          },
          {
            name: "Michael Brown",
            role: "Web Developer",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "Web Developer",
            prevcompanyname: "WebCraft",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "UI/UX Designer",
            presentcompnayname: "TechSphere",
            image: "/assets/images/banner-img2.png",
            storyLink: "/careers"
          },
          {
            name: "Olivia Taylor",
            role: "Mobile App Developer",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "Mobile App Developer",
            prevcompanyname: "AppVision",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "Tech Lead",
            presentcompnayname: "CyberWave",
            image: "/assets/images/profile-olivia.png",
            storyLink: "/careers"
          },
          {
            name: "Ethan Harris",
            role: "System Administrator",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "System Administrator",
            prevcompanyname: "CloudBurst",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "Infrastructure Engineer",
            presentcompnayname: "InfoTech",
            image: "/assets/images/profile-ethan.png",
            storyLink: "/careers/ethan-harris"
          },
          {
            name: "Ava Martinez",
            role: "Data Analyst",
            prevcmpnyimage: "/assets/images/companylogo/Amazon.webp",
            prevcompnayrole: "Data Analyst",
            prevcompanyname: "DataStream",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "Data Scientist",
            presentcompnayname: "InsightLabs",
            image: "/assets/images/profile-ava.png",
            storyLink: "/careers/ava-martinez"
          },
          {
            name: "Liam Anderson",
            role: "IT Support Specialist",
            prevcmpnyimage: "/assets/images/companylogo/Adobe.webp",
            prevcompnayrole: "IT Support Specialist",
            prevcompanyname: "TechBridge",
            presentimage: "/assets/images/companylogo/Amazon.webp",
            presentrole: "IT Consultant",
            presentcompnayname: "FutureTech",
            image: "/assets/images/profile-liam.png",
            storyLink: "/careers/liam-anderson"
          }
        ];

        // Simulating a delay as if fetching from an API
        setTimeout(() => {
          setCareers(data);
        }, 1000);
      } catch (error) {
        console.error("Error fetching career data:", error);
      }
    };

    fetchCareers();
  }, []);

  const loadMoreCareers = () => {
    setVisibleCareers((prev) => prev + 3); // Load 3 more careers on each click
  };

  const scrollToFeaturedStory = () => {
    if (typeof window !== "undefined") {
      const section = document.getElementById("Careercard");
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

  return (
    <>
      {/* Review Section */}
      <div className="bg-flowGradientTop text-black py-16 px-4 md:px-16 bg-no-repeat bg-cover bg-center ">
        <div className="w-full md:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="text-center md:text-left">
            <h1 className="text-xl mb-5 relative element md:elements after:bottom-N10">AchieversIT Testimonials</h1>
            <span className="md:text-3xl font-bold mb-4">Authentic Experiences, Remarkable Journeys</span>
            <p className="text-sm md:text-base mb-6">
              Explore candid testimonials from students who have completed our programs—from AI specialists to digital marketing professionals, our diverse offerings have empowered individuals worldwide to realize their full potential and fulfill their career ambitions.
            </p>
            <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10" onClick={scrollToFeaturedStory}>
              <span>Discover Success Stories</span>
            </button>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src="/assets/images/placements2.png" // Update with actual image path
              alt="Person"
              width={200}
              height={200}
              className="w-full h-auto" // Tailwind classes for additional styles
            />
          </div>
        </div>
      </div>

      {/* Career Impact Stats Section */}
      <StatsCounterComponent />

      {/* Career Impacted Cards Section */}
      <div className="bg-gray-50 py-16 px-4 md:px-16" id="Careercard">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-2xl font-bold mb-20 relative elementl pb-2 uppercase">
            <span className="glitter_text">Uplifting careers and inspiring change</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto w-full md:w-4/5 lg:w-3/4">
            {careers.slice(0, visibleCareers).map((career, index) => (
              <CareerCard
                key={index}
                name={career.name}
                role={career.role}
                prevcompnayrole={career.prevcompnayrole}
                prevcompanyname={career.prevcompanyname}
                prevcmpnyimage={career.prevcmpnyimage}
                presentrole={career.presentrole}
                presentcompnayname={career.presentcompnayname}
                presentimage={career.presentimage}
                image={career.image}
              />
            ))}
          </div>
          {visibleCareers < careers.length && (
            <div className="mt-6">
              <button
                onClick={loadMoreCareers}
                className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
              >
                <span>Load More</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Client Companies Carousel Section */}
      <ClientSlider />

      <TrendingCoursesInIT text="Top IT & Trending Courses in AchieversIT" />

      <Banner />
      <FAQComponent faqData={faqData} />
    </>
  );
};

export default ReviewPage;
