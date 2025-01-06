import React from "react";
import { useState } from "react";
import Image from "next/image";
// import PromotionalContent from "@/components/PromotionalContent";
import Link from "next/link";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCandidate } from "@/utils/CandidateStoryContext";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";
// import Banner from "@/components/BannerEnrollCourse";
// import BannerSplPromo from "@/components/splbannerpromo";
import BannerPromo from "@/components/BannerPromotion";

const CandidateStory: React.FC = () => {
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false); 
  const [modalKey, setModalKey] = useState(0);
  const { candidateData } = useCandidate();

  // Check if candidateData is null or undefined
  if (!candidateData) {
    return <div>No candidate data available</div>;
  }

  const {
    name,
    image,
    prevcompnayrole,
    prevcompanyname,
    prevcmpnyimage,
    presentrole,
    presentcompnayname,
    presentimage,
  } = candidateData;

  const handleModalClose = () => {
    setIsAdvisorModalOpen(false);
  };
    
  const toggleAdvisorModal = () => {
    setIsAdvisorModalOpen((prevState) => !prevState);
    if (!isAdvisorModalOpen) {
      setModalKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <>
      <div className="mx-auto ml-5 bg-gray-50">
        <nav aria-label="breadcrumb">
          <ol className="flex mb-0 px-0 pt-12 items-center gap-4">
            <li className="breadcrumb-item">
              <Link href="/" className="text-black font-bold text-md hover:text-maincolor_1">
                Home
              </Link>
            </li>
            <FontAwesomeIcon icon={faChevronRight} className="text-orange-800"/>
            <li className="breadcrumb-item">
              <Link href="/reviews" className="text-black font-bold text-md hover:text-maincolor_1">
                <span className="text-md text-black font-bold text-md hover:text-maincolor_1">Reviews</span>
              </Link>
            </li>
            <FontAwesomeIcon icon={faChevronRight} className="text-orange-800"/> 
            <li className="breadcrumb-item text-orange-500 font-bold" aria-current="page">
              {presentrole}
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex flex-wrap min-h-screen bg-gray-50">
        {/* Left Section: Scrollable Content */}
        <div className="flex-1 overflow-y-scroll bg-gray-50 p-6 hide-scrollbar">
          <div className="space-y-6">
            {/* Card 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
              <h2 className="text-3xl font-bold">Freelancing in the AI Era</h2>
              <p className="mt-2 text-gray-600">
                {name} Business Transformation Journey
              </p>

              {/* Candidate Info Row */}
              <div className="flex justify-center items-center mt-4 space-x-6">
                <Image
                  src={image as string} // Replace with the profile image URL
                  alt={name as string}
                  width={96}
                  height={96}
                  className="object-cover rounded-full border border-2 shadow-glassShadow"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-gray-500">Work Experience: 1 Year</p>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 border rounded-lg">
                    <Image
                      src={prevcmpnyimage as string}
                      alt="Lodha Logo"
                      className="h-6"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-base text-gray-800">{prevcompnayrole}</p>
                  <p className="text-sm text-gray-500">{prevcompanyname}</p>
                </div>
                {/* Arrow */}
                <div className="flex items-center justify-start">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-orange-400 transform rotate-45 -translate-y-2"></div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 border rounded-lg">
                    <Image
                      src={presentimage as string}
                      alt="Lodha Logo"
                      className="h-6"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-base text-gray-800">{presentrole}</p>
                  <p className="text-sm text-gray-500">{presentcompnayname}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 py-12">
            <p>
              I am Yash Raj Awasthi, a freelancer and sales professional based in Hyderabad with a strong foundation in business and technology. After completing my MBA from Alliance University in Bengaluru, I began my professional journey at Lodha Groups, gaining early exposure to the corporate world. Currently, I focus on freelancing, specializing in WordPress development and dropshipping. Recently, I completed the &quot;Generative AI for Business Transformation&quot; course with Simplilearn, which has further fueled my passion for embracing AI-driven innovations in business. I&apos;m excited to collaborate with AchieversIT and contribute to innovative projects that shape the future of business.
            </p>
          </div>
          <div className="flex justify-center items-center mt-6 lg:mt-0 my-12">
            <div className="w-full sm:w-96 md:w-3/4 lg:w-full p-5 bg-gray-50 rounded-md shadow-card">
              <iframe
                className="w-full h-64 sm:h-72 md:h-80 rounded-md"
                src="https://www.youtube.com/embed/your-video-id"
                title="Life at AchieversIT"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          {/* ------------------------------banner --------------- */}
          <BannerPromo/>

          <h3 className="text-3xl text-cyan-950 text-bold pb-5 my-5">Learning Journey with AchieversIT</h3>
          <p>My educational journey with AchieversIT has been truly transformative. The sessions conducted by Meenal Ma&apos;am were enlightening, covering essential topics and addressing all of my questions. The course&apos;s flexible format allowed me to seamlessly incorporate learning into my busy routine. The curriculum was thorough and engaging, providing me with the opportunity to apply AI concepts in a practical setting relevant to my profession.</p>

          <h3 className="text-3xl text-bold text-cyan-950 py-10">Effect of the Learning Experience</h3>
          <p>The certification has had a profound effect on my professional life. As a freelancer specializing in marketing and technology, I&apos;ve leveraged AI to optimize my workflow, significantly reducing time spent on repetitive tasks. This increase in efficiency has proven invaluable. Acquiring AI skills has expanded my outlook, equipping me to address challenges across various sectors, from customer service to technical assistance. This experience has empowered me to work more autonomously, bolstering both my productivity and career growth.
          </p>
        </div>

        {/* Right Section: Fixed Content */}
        <div className="w-96 bg-gray-50 p-6 sticky top-20">
          {/* Card 1 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold">{name} Enrolled For:</h3>
            <p className="text-sm text-gray-600 mt-2">
              {presentrole} for Business Transformation
            </p>
            <button className="mt-4 bg-maincolor_1 text-white py-2 px-4 rounded-lg" onClick={toggleAdvisorModal}>
              Enroll Now
            </button>
            {isAdvisorModalOpen && (
              <DwnldAdvisorModalForm
                imageSrc="/assets/images/advisor.png"
                key={modalKey}
                formName="Course"
                title="Join Us Today"
                text="Provide your information below to get your course syllabus delivered through WhatsApp and Email"
                closeModal={handleModalClose} // Close modal using the same toggle function
                modalclassname=""
                downloadPdf={false}
              />
            )}
          </div>

          {/* Card 2 */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold">Did you know?</h3>
            <p className="text-sm text-gray-600 mt-2">
              Annual Salary of <span className="font-bold text-cyan-950 text-md">{presentrole}</span> in India is
            </p>
            <p className="mt-4 text-lg font-bold">INR 9.78LPA - 12.43LPA</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateStory;
