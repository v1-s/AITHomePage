"use client";
import { useState, ReactNode } from "react";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";

interface StaticHeroComponentProps {
  showTitle?: boolean;
  titleContext?: ReactNode;
  titleSubContext?: ReactNode;
  onEnrollClick?: () => void;
  modalTitle?: string;
  modalText?: string;
  modalform?: string;
}

const StaticHeroComponent: React.FC<StaticHeroComponentProps> = ({
  showTitle = true,
  titleContext = "Inspiring Change: Building a Brighter Future",
  titleSubContext,
  onEnrollClick,
  modalTitle = "",
  modalText = "",
  modalform = ""
}) => {
  const [modalKey, setModalKey] = useState(0);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
 
   const openAdvisorModal = () => {
     setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
     setIsAdvisorModalOpen(true);
   };
 
 
   const closeAdvisorModal = () => {
     setIsAdvisorModalOpen(false);
   };
 
   

  return (
    <div className="relative w-full py-10 md:py-16 flex items-center justify-center bg-bannerBg bg-cover bg-center shadow-inside">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>

      {showTitle && (
        <div className="relative z-auto text-center px-4">
          <p className="text-white text-sm md:text-lg font-semibold tracking-wider uppercase mb-4">
            {titleContext}
          </p>
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold !leading-snug mb-6">
            {titleSubContext}
          </h1>

          <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
    className="btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
    aria-label="Chat with us on WhatsApp"
    onClick={() => {
      const userConfirmed = window.confirm("Do you want to open WhatsApp Web to contact us?");
      if (userConfirmed) {
        window.location.href = "https://wa.me/9765478974"; // Redirect to WhatsApp Web
      }
    }}
  >
    <span>CALL US</span>
  </button>

            <button
              className="btn-hover-bg-transition btn-hover-bg-transition-og px-14"
              onClick={() => {
                openAdvisorModal();
                if (onEnrollClick) onEnrollClick();
              }}
              aria-label="Enquire Now"
            >
              <span>ENQUIRE NOW!</span>
            </button>
          </div>

          {isAdvisorModalOpen && (
            <DwnldAdvisorModalForm
              imageSrc="/assets/images/advisor.png"
              key={modalKey}
              formName={modalform}
              title={modalTitle}
              text={modalText}
              closeModal={closeAdvisorModal}
              downloadPdf={false}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StaticHeroComponent;

