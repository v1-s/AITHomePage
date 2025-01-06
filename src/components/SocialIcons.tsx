"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faWhatsapp, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link"; // Import Link from Next.js

const SocialIcons = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) return null; // Avoid rendering on the server side

  return (
    <div className="fixed bottom-0 left-3 flex flex-col space-y-6 z-50">
      {/* Social Media Icons */}
      <nav className="fixed bottom-0 left-0 p-4">
        <ul className="space-y-4">
          {/* WhatsApp */}
          <li className="group relative flex items-center">
            <Link href="https://wa.me/1234567890" target="_blank" aria-label="WhatsApp" 
               className="flex items-center bg-socialBg text-black rounded-full h-10 w-10 overflow-hidden transition-all duration-500 group-hover:w-48 shadow-glassShadow">
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  size="xl"
                  className="text-green-800 bg-white p-1 rounded-full w-6 h-6 ml-1 transition-transform duration-500 group-hover:translate-x-4 group-hover:rotate-[360deg]"
                />
                <span className="ml-8 opacity-0 whitespace-nowrap group-hover:opacity-100 transition-opacity duration-500">
                  WhatsApp
                </span>
            </Link>
          </li>

          {/* GitHub */}
          <li className="group relative flex items-center">
            <Link href="https://github.com" target="_blank" aria-label="GitHub" className="flex items-center bg-socialBg text-black rounded-full h-10 w-10 overflow-hidden transition-all duration-500 group-hover:w-48 shadow-glassShadow">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="xl"
                  className="text-black bg-white p-1 rounded-full w-6 h-6 ml-1 transition-transform duration-500 group-hover:translate-x-4 group-hover:rotate-[360deg]"
                />
                <span className="ml-12 opacity-0 whitespace-nowrap group-hover:opacity-100 transition-opacity duration-500">
                  GitHub
                </span>
            </Link>
          </li>

          {/* LinkedIn */}
          <li className="group relative flex items-center">
            <Link href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn" className="flex items-center bg-socialBg text-black rounded-full h-10 w-10 overflow-hidden transition-all duration-500 group-hover:w-48 shadow-glassShadow">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="xl"
                  className="text-blue-800 bg-white p-1 rounded-full w-6 h-6 ml-1 transition-transform duration-500 group-hover:translate-x-4 group-hover:rotate-[360deg]"
                />
                <span className="ml-12 opacity-0 whitespace-nowrap group-hover:opacity-100 transition-opacity duration-500">
                  LinkedIn
                </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SocialIcons;
