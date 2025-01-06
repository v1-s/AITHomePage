import { faFacebookF, faLinkedinIn, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon

// Type definitions for better type safety
interface ContactDetail {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  type: "mail" | "phone";  // Restrict 'type' to "mail" or "phone"
}

interface SocialLink {
  icon: ReactElement; // Change to ReactElement
  url: string;
  color: string;
  hoverColor: string;
}

interface LocationData {
  logoSrc: string;
  logoAlt: string;
  logoLink: string;
  description: string;
  contactDetails: ContactDetail[];
  socialLinks: SocialLink[];
  mapTitle: string;
  mapSrc: string;
  type: string;
}

const locationData: LocationData = {
  logoSrc: "/logo-ait-white.png",
  logoAlt: "AchieversIT Logo",
  logoLink: "/",
  description: "Discover a learning community dedicated to helping you succeed and empowering you to achieve your goals through education.",

  contactDetails: [
    {
      label: "Headquarters",
      value: "1, 4th Main Rd, Extension, Ayyappa Layout, Chandra Layout, Marathahalli, Bengaluru, Karnataka 560037",
      icon: "📍",
      iconColor: "text-maincolor_1",
      type: "mail",
    },
    {
      label: "Counselling and Academic Centre",
      value: "1, 4th Main Rd, Extension, Ayyappa Layout, Chandra Layout, Marathahalli, Bengaluru, Karnataka 560037",
      icon: "📍",
      iconColor: "text-maincolor_1",
      type: "mail",
    },
    {
      label: "PhoneNumber",
      value: "+91 8431-040-457",
      icon: "📞",
      iconColor: "text-maincolor_1",
      type: "phone",
    },
    {
      label: "Email",
      value: "info@achieversit.com",
      icon: "✉️",
      iconColor: "text-maincolor_1",
      type: "mail",
    },
  ],
  socialLinks: [
    {
      icon: <FontAwesomeIcon icon={faFacebookF} />, // Update to ReactElement
      url: "https://facebook.com",
      color: "text-facebook",
      hoverColor: "facebook",
    },
    {
      icon: <FontAwesomeIcon icon={faLinkedinIn} />, // Update to ReactElement
      url: "https://linkedin.com",
      color: "text-linkedin",
      hoverColor: "linkedin",
    },
    {
      icon: <FontAwesomeIcon icon={faYoutube} />, // Update to ReactElement
      url: "https://youtube.com",
      color: "text-youtube",
      hoverColor: "youtube",
    },
    {
      icon: <FontAwesomeIcon icon={faInstagram} />, // Update to ReactElement
      url: "https://instagram.com",
      color: "text-insta",
      hoverColor: "insta",
    },
  ],
  mapTitle: "AchieversIT Location",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2871583091523!2d77.70185937425416!3d12.953467915277207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1359f187ff7f%3A0x24c3decd3581f625!2sAchieversIT!5e0!3m2!1sen!2sin!4v1686357406985!5m2!1sen!2sin",
  type: "office",
};

// const getLocation = (callback: (position: GeolocationPosition) => void, errorCallback: (error: GeolocationPositionError) => void) => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(callback, errorCallback);
//   } else {
//     errorCallback({
//       code: 1,
//       message: "Geolocation is not supported by this browser.",
//       PERMISSION_DENIED: 1,
//       POSITION_UNAVAILABLE: 2,
//       TIMEOUT: 3
//     });
//   }
// };

export default locationData;