"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { footerData } from "../utils/mockfooterdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faPinterestP,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

interface FooterLink {
  name: string;
  url: string;
  type?: "course" | "other";
  id?: string;
}

const Footer = () => {
  
  const [phone, setPhone] = useState<string>(""); // Holds the phone number input
  const [captcha, setCaptcha] = useState<string>(""); // Holds the generated CAPTCHA
  const [captchaInput, setCaptchaInput] = useState<string>(""); // Holds the user-entered CAPTCHA
  const [error, setError] = useState<string>(""); // Error message
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  useEffect(() => {
    generateCaptcha(); // Generate CAPTCHA when the component mounts
  }, []);
  const generateCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a random CAPTCHA
    setCaptcha(newCaptcha);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/; // Ensures only valid 10-digit numbers
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate phone number
     // Validate the phone number
     if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (captcha !== captchaInput) {
      setError("Invalid CAPTCHA. Please try again.");
      generateCaptcha(); // Regenerate CAPTCHA on failure
      return;
    }
    // Clear errors and start loading state
    setError("");
    setLoading(true);
    // Payload for the API request
    const payload = {
      myData: [
        { phone: phone },
        { source: "phone_submission_form" },
      ],
    };

    try {
      const response = await fetch("https://achieversit.com/management/captureLeadRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Phone number submitted successfully!");
        setPhone(""); // Clear the input field
        setCaptchaInput(""); // Clear CAPTCHA input
        generateCaptcha(); //
      } else {
        // Show error if submission fails
        setError("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setError("An error occurred while submitting the phone number.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <footer className="mt-3 text-center text-lg-start text-dark shadow-lg bg-black px-45">
      <section className="pt-3">
  <div className="flex flex-col lg:flex-row justify-between items-center py-4 px-4 shadow-sm border-b border-gray-500">
    {/* Left Column: Logo and Text */}
    <div className="flex flex-col items-start w-full lg:w-1/2 mb-4 lg:mb-0">
      <Link href="/">
        <Image
          src="https://www.achieversit.com/assets/images/AIT-white.jpg"
          alt="logo"
          width={160} // Valid numeric value for width
          height={40} // Valid numeric value for height
          className="ait-logo w-[280px] mb-4"
        />
      </Link>
      <p className="text-gray-500 text-sm text-start">
        AchieversIT - Provides a wide group of opportunities for freshers and experienced candidates who can develop their skills and build their career opportunities across multiple Companies.
      </p>
    </div>

    {/* Right Column: Social Media Icons */}
    <div className="flex justify-center md:justify-end w-full lg:w-1/2">
    <ul className="flex flex-wrap justify-center lg:justify-end gap-12 md:space-x-4">
        {/* Facebook */}
        <li>
          <a
            href="https://www.facebook.com/AchieversITTrainings/"
            target="_blank"
            rel="nofollow"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-blue-600 hover:text-white transition-transform transform hover:rotate-[360deg] duration-500"
            title="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
          </a>
        </li>
        {/* Instagram */}
        <li>
          <a
            href="https://www.instagram.com/Achieversit/"
            target="_blank"
            rel="nofollow"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-gradient-to-r from-purple-500 via-pink-500 to-maincolor_1 hover:text-white transition-transform transform hover:rotate-[360deg] duration-500"
            title="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
          </a>
        </li>
        {/* LinkedIn */}
        <li>
          <a
            href="https://www.linkedin.com/company/achieversit-solutions/"
            target="_blank"
            rel="nofollow"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-blue-700 hover:text-white transition-transform transform hover:rotate-[360deg] duration-500"
            title="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="text-2xl" />
          </a>
        </li>
        {/* Twitter */}
        {/* <li>
          <a
            href="https://twitter.com/AchieversitT"
            target="_blank"
            rel="nofollow"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-sky-500 hover:text-white transition-transform transform hover:rotate-[360deg] duration-500"
            title="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
          </a>
        </li> */}
        {/* Pinterest */}
        {/* <li>
          <a
            href="https://in.pinterest.com/Achieversittrainings/"
            target="_blank"
            rel="nofollow"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-maincolor_1 hover:text-white transition-transform transform hover:rotate-[360deg] duration-500"
            title="Pinterest"
          >
            <FontAwesomeIcon icon={faPinterestP} className="text-2xl" />
          </a>
        </li> */}
        {/* YouTube */}
        <li>
          <a
            href="https://www.youtube.com/channel/UCgXhUR82NKEMd3_ZZbefrdA"
            target="_blank"
            rel="nofollow"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-maincolor_1 hover:text-white transition-transform transform hover:rotate-[360deg] duration-500"
            title="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</section>


        <section className="lg:pb-45 pt-5">
          <div className="flex flex-wrap justify-between lg:mx-[13px] gap-y-8">
            {/* Request a Demo Section */}
            <div className="w-full lg:w-1/2 text-center space-y-3 sm:text-left lg:order-2">
              <h2 className="text-uppercase font-bold mb-3 text-xl text-white">Request a Demo</h2>
              <p className="text-sm md:text-md mt-4 text-gray-500">
                Request a demo to explore how AchieversIT&apos;s solutions enhance success, efficiency, and growth opportunities.
              </p>
              <form className="mt-6 w-full" onSubmit={handleSubmit}>
        {/* Row for Phone Number and CAPTCHA */}
  <div className="flex flex-wrap items-center gap-4">
    {/* Phone Number Input */}
    <div className="flex-1">
      <label htmlFor="UserPhone" className="sr-only">
        Phone
      </label>
      <input
        type="text"
        id="UserPhone"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={`w-full sm:text-sm px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none ${
          error ? "focus:border-maincolor_1 focus:ring-maincolor_1" : "focus:border-blue-600 focus:ring-blue-600"
        }`}
      />
    </div>
    {/* CAPTCHA Section */}
    <div className="flex items-center gap-2">
    <input
        type="text"
        placeholder="Enter CAPTCHA"
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        className="w-32 sm:w-40 text-sm rounded-md border border-gray-500 px-4 py-2 bg-transparent focus:border-blue-600 focus:ring-blue-600"
      />
    <button
        type="button"
        onClick={generateCaptcha}
        className="text-sm font-bold text-maincolor_1 hover:underline"
      >
       <FontAwesomeIcon icon={faSync} className="text-lg" />
      </button>
      <div className="text-md font-semibold bg-gray-200 px-4 py-2 rounded">
        {captcha}
        </div>
      
    
      </div>
    </div>
    {/* Subscribe Button */}
    <div className="mt-4">
    <button
      type="submit"
      className="w-full sm:w-auto rounded bg-maincolor_1 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
      disabled={loading}
    >
      {loading ? "Submitting..." : "Subscribe"}
    </button>
  </div>
  {/* Error Message */}
  {error && <p className="mt-2 text-sm text-maincolor_1">{error}</p>}
</form>
            </div>

            {/* Company, Explore, Support Section */}
            <div className="w-full lg:w-1/2 flex flex-wrap justify-between text-center md:text-left lg:order-1 gap-y-6">
              {[{ title: "Company", links: footerData.companyLinks }, { title: "Explore", links: footerData.exploreLinks }, { title: "Support", links: footerData.supportLinks }].map(
                (section, index) => (
                  <div key={index} className="w-full md:w-1/3 space-y-2">
                    <h6 className="text-uppercase font-bold mb-3 text-xl text-white">{section.title}</h6>
                    {section.links.map((link: FooterLink, i) => (
                      <p key={i} className="py-1">
                        {link.type === "course" && link.id ? (
                          <Link
                            href={`/${link.name}`}
                            className="text-reset cursor-pointer"
                          >
                            {link.name}
                          </Link>
                        ) : (
                          <Link href={link.url} className="text-reset cursor-pointer text-gray-600 hover:text-maincolor_1">
                            {link.name}
                          </Link>
                        )}
                      </p>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Trending Links */}
          {Object.entries(footerData.trendingLinks).map(([section, links], index) => (
            <div key={index} className=" pb-3 mt-5">
              <p className="text-xl font-medium text-center md:text-left mb-3 text-white">
                Trending {section.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <div className="flex flex-wrap lg:gap-2 sm:gap-2 gap-1 justify-center md:justify-start md:text-left text-center">
                {links.map((link, i) => (
                  <React.Fragment key={i}>
                    <Link
                   href={`/${link.name.replace(/\s+/g, '')}`} 

                      className="text-md text-gray-600 hover:text-maincolor_1 mb-1 sm:mb-0"
                  >
                      {link.name}
                    </Link>
                    {i < links.length - 1 && (
                      <span className="hidden md:inline-block lg:inline-block mx-2">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </section>

    
        <div className="footer-end py-4 px-0 lg:mx-45">
          <div className="text-center">
            <h4 className="text-lg font-medium text-2xl text-white pb-2 ">Disclaimer</h4>
            <p className="text-sm  text-center md:text-md text-gray-700">
              By visiting the website Achieversit, viewing, accessing, or
              otherwise using any of the information collected, created, or
              compiled by Achieversit, you agree to be bound to the terms and
              conditions of the company.
            </p>
          </div>
        </div>
      </footer>

      <div className="text-center p-4 bg-black footer-end py-8 border-t border-gray-600 px-0 text-gray-600">
        © 2024 Copyright:
        <Link href="#" className="text-reset font-bold">
          Achieversit
        </Link>
      </div>
    </>
  );
};

export default Footer;
