"use client";

import React from "react";
import dynamic from "next/dynamic"; // Import dynamic for code splitting
import faqData from "./utils/faq";

// Dynamically import components to reduce initial load
const StatsSection = dynamic(() => import("./components/AchvStatsSection"));
const BarGraph = dynamic(() => import("./components/BarGraph"));
const CarouselContainer = dynamic(() => import("./components/ClientCompanies"));
const EnterpriseTrainingSection = dynamic(() => import("./components/EnterpriseTrainingSection"));
const FAQAccordion = dynamic(() => import("./components/Faq"));
const Global = dynamic(() => import("./components/GlobalReach"));
const HeroSection = dynamic(() => import("./components/HeroSection"));
const WorriedSection = dynamic(() => import("./components/JobWrrSection"));
const ProgCard = dynamic(() => import("./components/ProgCards"));
const SpecialOffer = dynamic(() => import("./components/PromotionalContent"));
const Reviews = dynamic(() => import("./components/Reviews"));
const PlacementBanner = dynamic(() => import("./components/PlacementBanner"));
const BannerSplPromo = dynamic(() => import("./components/splbannerpromo"));
const ScrollSections = dynamic(() => import("@/components/WhyAit"));
const ClientSlider = dynamic(() => import("./components/ClientSlider"));
const StatsCounterComponent = dynamic(() => import("./components/StatsCounterComponent"));
const BlogPage = dynamic(() => import("./components/Bloghome"));

import LimitedSeatsCTA from "./components/LimitedSeatsCTA";
export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <ClientSlider />
        <ProgCard />
        <EnterpriseTrainingSection />
        <SpecialOffer />
        <ScrollSections />
        <Reviews />
        <StatsSection />
        <CarouselContainer />
        <PlacementBanner />
        <WorriedSection />
        <BarGraph />
        <Global />
        <StatsCounterComponent />
        <BlogPage />
        <FAQAccordion faqData={faqData} />
        <BannerSplPromo />
      </main>
    </>
  );
}
