import React, { useRef, useState, useEffect } from "react";

interface SliderProps<T> {
  data: T[];
  interval?: number;
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
}

const ReusableSlider = <T,>({
  data,
  interval = 2000,
  renderItem,
}: SliderProps<T>) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(data.length); 
  const items = [...data, ...data, ...data]; 

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const scroll = () => {
      const centerOffset = slider.offsetWidth / 2; // Center point of the viewport
      const itemWidth = slider.children[0].getBoundingClientRect().width; // Get item width dynamically
      const leftPosition = currentIndex * itemWidth - centerOffset + itemWidth / 2;

      slider.style.transform = `translateX(-${leftPosition}px)`;

      // Handle infinite loop: Reset position to the middle of duplicated items
      if (currentIndex >= items.length - data.length) {
        setTimeout(() => {
          slider.style.transition = "none"; // Disable smooth scrolling temporarily
          const resetPosition =
            (currentIndex - data.length) * itemWidth - centerOffset + itemWidth / 2;
          slider.style.transform = `translateX(-${resetPosition}px)`;
          setCurrentIndex((prevIndex) => prevIndex - data.length);
        }, 500); // Allow smooth scroll to finish
      }

      slider.style.transition = "transform 0.5s ease-in-out"; // Re-enable smooth scrolling
    };

    scroll();
  }, [currentIndex, data.length, items.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [interval]);

  return (
    <div className="relative w-full overflow-hidden p-4">
      <div
        ref={sliderRef}
        className="flex items-center"
        style={{
          whiteSpace: "nowrap",
        }}
        aria-live="polite"
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={index}
              className={`inline-block transition-transform duration-500 ${
                isActive ? "scale-110 z-10" : "opacity-50"
              }`}
              style={{
                filter: isActive ? "none" : "grayscale(100%)",
                flex: "0 0 auto", // Respect external width control
                textAlign: "center",
              }}
              aria-hidden={!isActive}
            >
              {renderItem(item, isActive)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReusableSlider;
