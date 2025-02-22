"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const LimitedSeatsCTA: React.FC = () => {
  const router = useRouter();

  // Prefetch the schedule page once on component mount
  useEffect(() => {
    router.prefetch("/schedulePage"); // Prefetch the route for faster navigation
  }, [router]);

  // Memoized callback for button click handler
  const handleToSchedulePage = useCallback(() => {
    router.push("/schedulePage"); // Directly navigate to the route
  }, [router]);

  return (
    <div className="text-center relative bg-flowGradientTop  rounded-t-5xl py-6 px-4">
      <p className="text-darkBlue font-bold text-md md:text-lg leading-relaxed">
        Discover <span className="glitter_text">Your Pathway</span> to a Brilliant Future with{" "}
        <span className="glitter_text">Our Diverse Course Selection!</span>
      </p>
      <button
        className="btn-solid-bg-transition btn-solid-bg-transition-orange py-2 px-8 mt-4"
        onClick={handleToSchedulePage}
        aria-label="Enroll Now Limited Seats"
      >
        <span className="text-sm md:text-md">LIMITED SEATS, ENROLL NOW!</span>
      </button>
    </div>
  );
};

export default LimitedSeatsCTA;
