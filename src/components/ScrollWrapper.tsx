"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollWrapperProps {
  children: React.ReactNode;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 } // Animation triggers when 20% is visible
    );

    const element = document.querySelector(".animate-on-scroll");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <motion.div
      className="animate-on-scroll"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollWrapper;
