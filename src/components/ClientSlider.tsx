import React from "react";
import ReusableSlider from "./ReusableSlider";
import Image from "next/image";

const ClientSlider = () => {
  const logos = [
    { id: 1, src: "/assets/images/companylogo/Google.webp", alt: "Sonata" },
    { id: 2, src: "/assets/images/companylogo/EY.webp", alt: "SPi Global" },
    { id: 3, src: "/assets/images/companylogo/PayPal.webp", alt: "Spritle" },
    { id: 4, src: "/assets/images/companylogo/Wipro.webp", alt: "Wavelang" },
    { id: 5, src: "/assets/images/companylogo/Microsoft.webp", alt: "Dhwani" },
    { id: 6, src: "/assets/images/companylogo/Amazon.webp", alt: "Sonata" },
    { id: 7, src: "/assets/images/companylogo/Cisco.webp", alt: "SPi Global" },
    { id: 8, src: "/assets/images/companylogo/DHL.webp", alt: "Spritle" },
    { id: 9, src: "/assets/images/companylogo/Genpact.webp", alt: "Wavelang" },
    { id: 10, src: "/assets/images/companylogo/Tcs.webp", alt: "Dhwani" },
    { id: 11, src: "/assets/images/companylogo/Adobe.webp", alt: "Sonata" },
  ];

  const renderLogo = (logo: { id: number; src: string; alt: string }, isActive: boolean) => (
    <div
      className={`p-4 border-2 m-1 w-32 mx-6 rounded-md ${isActive ? "border-grey-500 scale-125 shadow-glassShadow" : "border-gray-300 scale-100 shadow-card"} transition-transform duration-500`}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={100}
        height={100}
        className={`w-full ${isActive ? "scale-110" : ""}`}
        loading="lazy"
      />
    </div>
  );

  return (
    <div className="my-12">
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 glitter_text text-center elementl relative pb-2 mb-10">Recruitment Ecosystem Partners</h2>
      <div className="w-full flex justify-center mt-8">
        <ReusableSlider data={logos} interval={2000} renderItem={renderLogo} />
      </div>
    </div>
  );
};

export default ClientSlider;
