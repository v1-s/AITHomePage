"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { testimonials } from "../utils/testimonialData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function generateStars(count: number) {
  return Array(count)
    .fill(null)
    .map((_, idx) => (
      <FontAwesomeIcon
        key={idx}
        icon={faStar}
        className="text-yellow-500 text-2xl hover:scale-110 transition-transform duration-300"
      />
    ));
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const filteredTestimonials = testimonials.filter(
    (testimonial) => currentFilter === 'all' || testimonial.category === currentFilter
  );

  const handleClickTestimonial = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const handleFilterChange = (filter: React.SetStateAction<string>) => {
    setCurrentFilter(filter);
    setCurrentIndex(0);
  };

  return (
    <div className="mx-auto mt-0 rounded-t-lg lg:mx-75 pb-5">
      <p className="pt-5 text-sm uppercase text-center">Learner Reviews From the World Over</p>
      <h3 className="text-center text-xl font-semibold">Testimonials That Speak Volumes</h3>

      <div className="flex justify-center gap-3 my-4">
        <button
          className={`btn-review px-4 py-2 rounded-md ${currentFilter === 'all' ? 'bg-maincolor_1 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => handleFilterChange('all')}
        >
          All Reviews
        </button>
        <button
          className={`btn-google px-4 py-2 rounded-md ${currentFilter === 'google' ? 'bg-maincolor_1 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => handleFilterChange('google')}
        >
          Google Reviews
        </button>
        <button
          className={`btn-linkedin px-4 py-2 rounded-md ${currentFilter === 'linkedin' ? 'bg-maincolor_1 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => handleFilterChange('linkedin')}
        >
          LinkedIn Reviews
        </button>
      </div>

      <div className="flex justify-center items-center h-auto" id="accordionExample">
        <div className="row flex flex-col md:flex-row gap-4">
          <div className="col md:w-1/2 p-3 pb-0 max-w-4xl sm:min-w-[30rem] w-full">
            <ul className="testimonial-list list-none space-y-3">
              {filteredTestimonials.map((testimonial, index) => (
                <li
                  key={index}
                  className={`card p-3 border-0 shadow-none max-w-full min-w-[20rem] ${
                    currentIndex === index ? 'border-0 rounded-md shadow-glassShadow bg-maincolor_1 text-white' : ''
                  }`}
                  onClick={() => handleClickTestimonial(index)}
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image src={testimonial.image} className="w-10 h-10 object-cover" alt={testimonial.name} width={200} height={100} />
                    </div>
                    <div className="flex flex-col ml-2">
                      <span className="font-medium">{testimonial.name}</span>
                      <span>{testimonial.position}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col md:w-1/2 pt-4 p-3 flex justify-center items-center" id="reviewContainer">
            <div className={`${currentIndex === 0 ? 'show' : 'block'}`}>
              <div className="card-body">
                <h4>{filteredTestimonials[currentIndex].reviewTitle}</h4>
                <div className="ratings">
                  {generateStars(filteredTestimonials[currentIndex].stars)}
                </div>
                <p>{filteredTestimonials[currentIndex].review}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
