"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const LimitedSeatsCTA: React.FC = () => {
  const router = useRouter();

  // Prefetch the schedule page on component mount
  useEffect(() => {
    router.prefetch("/schedulePage"); // Prefetch the route for faster navigation
  }, [router]);

  // Callback to navigate to schedule page
  const handleToSchedulePage = useCallback(() => {
    router.push("/schedulePage"); // Directly navigate to the route
  }, [router]);

  return (
    <div className="text-center relative bg-flowGradientTop rounded-t-5xl py-6 px-4">
      <p className="text-darkBlue font-bold text-lg leading-relaxed">
        Discover <span className="glitter_text">Your Pathway</span> to a Brilliant Future with{" "}
        <span className="glitter_text">Our Diverse Course Selection!</span>
      </p>
      <button
        className="btn-solid-bg-transition btn-solid-bg-transition-orange py-2 px-8 mt-4"
        onClick={handleToSchedulePage}
        aria-label="Enroll Now Limited Seats"
      >
        <span>LIMITED SEATS, ENROLL NOW!</span>
      </button>
    </div>
  );
};

export default LimitedSeatsCTA;
