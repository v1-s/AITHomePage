"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSuitcase, faBookOpen, faSearch } from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(faSuitcase, faBookOpen, faSearch);

const SearchSec = () => {
  return (
    <div className="bg-gray-50 text-center p-6">
      {/* Header Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {/* Button with suitcase icon */}
        <button className="bg-maincolor_1 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2" aria-label="Learn & Get Certificates">
          <FontAwesomeIcon icon="suitcase" />
          <span>Learn & Get Certificates</span>
        </button>

        {/* Button with book-open icon */}
        <button className="bg-maincolor_1 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2" aria-label="Build Your Career">
          <FontAwesomeIcon icon="book-open" />
          <span>Build Your Career</span>
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        Equip Your Future with Endless Creative Classes
      </h1>

      {/* Search Bar */}
      <div className="max-w-lg mx-auto mb-6 relative">
        <input
          type="text"
          placeholder="What do you want to learn today?"
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Search input"
        />
        {/* Search Icon */}
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Responsive Illustrations */}
      <div className="intro__images">
        <span className="hidden lg:block">
          <Image
            className="mx-auto"
            width="1156"
            height="281"
            src="./assets/images/Searchbannerimage.svg"
            alt="Banner Illustration"
          />
        </span>
        <span className="lg:hidden">
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Image
              width={100}
              height={120}
              src="./assets/images/SearchSec1.svg"
              alt="Mobile Illustration 1"
            />
            <Image
              style={{ marginTop: "24px" }}
              width={100}
              height={121}
              src="./assets/images/SearchSec2.svg"
              alt="Mobile Illustration 2"
            />
            <Image
              style={{ marginTop: "16px" }}
              width={100}
              height={137}
              src="./assets/images/SearchSec3.svg"
              alt="Mobile Illustration 3"
            />
          </div>
        </span>
      </div>
    </div>
  );
};

export default SearchSec;
