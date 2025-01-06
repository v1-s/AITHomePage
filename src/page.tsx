"use client";

import React from "react";
import dynamic from "next/dynamic"; // Import dynamic for code splitting
import ErrorBoundary from "./components/ErrorBoundary";
import faqData from "./utils/faq";

// Dynamically import components to reduce initial load
const StatsSection = dynamic(() => import("./components/AchvStatsSection"));
const BarGraph = dynamic(() => import("./components/BarGraph"));
const BlogsPage = dynamic(() => import("./components/Bloghome"));
const CarouselContainer = dynamic(() => import("./components/ClientCompanies"));
const EnterpriseTrainingSection = dynamic(() => import("./components/EnterpriseTrainingSection"));
const FAQAccordion = dynamic(() => import("./components/Faq"));
const Global = dynamic(() => import("./components/GlobalReach"));
const HeroSection = dynamic(() => import("./components/HeroSection"));
const HiringPartners = dynamic(() => import("./components/HiringPartners"));
const WorriedSection = dynamic(() => import("./components/JobWrrSection"));
const ProgCard = dynamic(() => import("./components/ProgCards"));
const SpecialOffer = dynamic(() => import("./components/PromotionalContent"));
const Reviews = dynamic(() => import("./components/Reviews"));
const PlacementBanner = dynamic(() => import("./components/PlacementBanner"));
const BannerSplPromo = dynamic(() => import("./components/splbannerpromo"));
const ScrollSections = dynamic(() => import("@/components/WhyAit"));

export default function HomePage() {
  return (
    <>
      <main>
        <ErrorBoundary>
          <HeroSection />
          <HiringPartners />
          <ProgCard />
          <EnterpriseTrainingSection />
          <SpecialOffer />
          <ScrollSections />
          <Reviews />
          <PlacementBanner />
          <CarouselContainer />
          <StatsSection />
          <WorriedSection />
          <BarGraph />
          <Global />
          <BlogsPage />
          <FAQAccordion faqData={faqData} />
          <BannerSplPromo />
        </ErrorBoundary>
      </main>
    </>
  );
}
