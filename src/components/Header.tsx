"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Search from "@/components/Search";
import Image from "next/image";

const DynamicMegaMenu = dynamic(() => import("@/components/Megamenu"), { ssr: false });
function Header() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [moreDropdownVisible, setMoreDropdownVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const handleMenuToggle = () => {
    setMenuVisible((prev) => !prev);
    if (megaMenuVisible) setMegaMenuVisible(false);
  };

  const handleMegaMenuToggle = () => {
    setMegaMenuVisible((prev) => !prev);
    if (menuVisible) setMenuVisible(false);
  };

  const closeMenus = () => {
    setMenuVisible(false);
    setMegaMenuVisible(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
    console.log("Input lost focus");
  };

  const handleMoreDropdownToggle = () => {
    setMoreDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMoreDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMediumScreen(width >= 768 && width < 1024);
      setIsSmallScreen(width < 1024);
      setIsExtraSmallScreen(width < 500);
      if (width >= 1024) {
        setMenuVisible(false);
        setMegaMenuVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const quickLinks = [
    "Corporate Training",
    "Hire From Us",
    "Blog",
    "Careers",
    "LMS",
    "Reviews",
    "Placements",
    "Services",
    "Current Openings",
    "Become a Mentor",
    "About Us",
    "Contact Us",
  ];

  const linkMapping: { [key: string]: string } = {
    "corporatetraining": "corporateTraining",
    "hirefromus": "hirefromUS",
    "blog": "blog",
    "careers": "careers",
    "lms": "lms",
    "reviews": "reviews",
    "placements": "placements",
    "services": "services",
    "currentopenings": "CurrentOpeningsPage",
    "becomeamentor": "BecomeMentor",
    "aboutus": "aboutus",
    "contactus": "contactus"
  };

  const formatLink = (link: string) => {
    const formattedLink = link.replace(/\s+/g, "").toLowerCase();
    return linkMapping[formattedLink] || formattedLink;
  };
  
  

  return (
    <>
      <header className="z-50 sticky top-0 bg-white shadow-hard">
        <div
          className={`${
            isExtraSmallScreen ? "flex justify-between items-center" : "flex flex-col md:flex-row items-center"
          } p-2 px-4 w-full gap-2`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex items-center cursor-pointer">
              <Image
                src="/logo-ait-white.png"
                alt="AchieversIT Logo"
                width={300}
                height={60}
                priority
                className="w-full min-w-[250px]"
              />
            </Link>
          </div>

          {/* Large and Medium Devices */}
          <div className={`hidden lg:flex flex-row items-center justify-between w-full gap-4 mt-2 lg:mt-0 ${isExtraSmallScreen ? "hidden" : ""}`}>
            {/* All Courses Button */}
            <button
              className="text-white bg-maincolor_1 border border-maincolor_1 px-4 py-2 rounded flex items-center"
              onClick={handleMegaMenuToggle}
              aria-label="Toggle All Courses Menu"
            >
              <span className="font-semibold">All Courses</span>
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>

            {/* Search Bar */}
            <div className="flex-grow min-w-[200px]">
              <Search />
            </div>

            {/* Quick Links */}
            {quickLinks.slice(0, 4).map((item, index) => (
              <Link
                key={index}
                href={`/${formatLink(item)}`}
                prefetch
                legacyBehavior
                className="whitespace-nowrap text-gray-700 hover:text-maincolor_1 hidden lg:block font-bold"
              >
                {item}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative group" ref={menuRef}>
              <button
             
                className="text-gray-700 flex items-center space-x-1 font-semibold"
                aria-label="More Links"
                onClick={handleMoreDropdownToggle}
              >
                <span>More</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              {moreDropdownVisible && (
                <div
                  className="absolute right-0 top-full w-48 bg-white shadow-lg rounded-md font-semibold border-t-4 border-maincolor_1 mt-7"

                >
                
                  {quickLinks.slice(4).map((item, index) => (
                    <Link
                      key={index}
                      href={`/${formatLink(item)}`} prefetch
                      className="block px-4 py-2 text-gray-700 hover:text-maincolor_1 cursor-pointer"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger for Medium/Small Devices */}
          {(isMediumScreen || isSmallScreen) && (
            <div className="flex items-center justify-between ml-auto block">
              {!isExtraSmallScreen && (
                <>
                  {/* All Courses Button */}
                  <button
                    className="text-white bg-maincolor_1 border border-maincolor_1 px-4 py-2 rounded flex items-center"
                    onClick={handleMegaMenuToggle}
                  >
                    <span className="font-semibold">All Courses</span>
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                  </button>

                  {/* Search Bar */}
                  <div className="flex-grow min-w-[200px]">
                    <Search />
                  </div>
                </>
              )}

              {/* Hamburger Menu */}
              <button
                className="text-gray-700 ml-4"
                onClick={handleMenuToggle}
                aria-label={menuVisible ? "Close Menu" : "Open Menu"}
              >
                <FontAwesomeIcon icon={menuVisible ? faTimes : faBars} size="lg" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuVisible && (
          <div ref={menuRef} className="md:block bg-gray-50 pb-12">
            <div className="flex flex-col items-center space-y-4 mt-4 text-left px-4">
              {isExtraSmallScreen && (
                <>
                  {/* All Courses Button */}
                  <button
                    className="text-white bg-maincolor_1 border border-maincolor_1 px-4 py-2 rounded flex items-center w-full"
                    onClick={handleMegaMenuToggle}
                  >
                    <span className="font-semibold">All Courses</span>
                  </button>

                  {/* Search Bar */}
                  <div className="w-full">
                    <Search />
                  </div>
                </>
              )}
             {quickLinks.map((item, index) => (
  <Link
    key={index}
    href={`/${formatLink(item)}`} // Dynamically map the links
    prefetch={true} // Enable prefetching for faster navigation
    className="whitespace-nowrap text-gray-700 hover:text-maincolor_1 font-semibold w-full text-start"
    onClick={(e) => {
      e.stopPropagation(); // Prevent interference with other event handlers
    }}
  >
    {item}
  </Link>
))}

            </div>
          </div>
        )}

        {/* Mega Menu */}
        {megaMenuVisible && (
          <div>
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeMenus}></div>
            <DynamicMegaMenu
              region="global"
              showClose={true}
              showCourseImage={true}
              closeMenu={closeMenus}
              showCategoryList={true}
              menuclassName="absolute left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg w-[90vw]"
              showCourseList={true}
              courseListclassName="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 gap-4"
              courseMainclassName="rounded-md max-h-[77vh] overflow-y-auto"
              categotyclassName="lg:w-1/2 md:max-h-[77vh] max-h-full rounded-md text-nowrap capitalize "
              categmenu=" sticky top-0 bg-white p-0"
            />
          </div>
        )}
      </header>
    </>
  );
}
export default Header;