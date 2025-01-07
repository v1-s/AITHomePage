"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBriefcase, faCode, faHome, IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Define Project type
type Project = {
  id: number;
  icon: IconDefinition;
  industry: string;
  description: string[]; // Array of detailed stages
};

const ProjectCards = () => {
  const projects: Project[] = [
    {
      id: 1,
      icon: faShoppingCart,
      industry: "E-commerce",
      description: [
        "Stage 1: Setting up an online storefront using Python and React.",
        "Stage 2: Implementing a secure payment gateway for transactions.",
        "Stage 3: Building a recommendation engine to enhance user experience.",
      ],
    },
    {
      id: 2,
      icon: faBriefcase,
      industry: "IT",
      description: [
        "Stage 1: Transitioning from Cloud Engineer to Cloud Architect.",
        "Stage 2: Designing scalable cloud infrastructure.",
        "Stage 3: Implementing cost-optimization strategies for cloud services.",
      ],
    },
    {
      id: 3,
      icon: faCode,
      industry: "Software Development",
      description: [
        "Stage 1: Analyzing requirements for a scalable web application.",
        "Stage 2: Developing the backend using Node.js and Express.",
        "Stage 3: Deploying the application with continuous integration and delivery.",
      ],
    },
    {
      id: 4,
      icon: faHome,
      industry: "Real Estate",
      description: [
        "Stage 1: Creating a user-friendly platform for property listings.",
        "Stage 2: Integrating advanced search and filter functionalities.",
        "Stage 3: Enabling secure communication between buyers and sellers.",
      ],
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", captcha: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", captcha: "" });
  const [captcha, setCaptcha] = useState<string>("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(newCaptcha);
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: /\S+@\S+\.\S+/.test(formData.email) ? "" : "Valid email is required",
      phone: /^\d{10}$/.test(formData.phone) ? "" : "Valid 10-digit phone number is required",
      captcha: formData.captcha === captcha ? "" : "Captcha does not match",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectId: currentProject?.id,
      };
      console.log("Form Payload: ", payload);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", captcha: "" });
      generateCaptcha();
      setShowModal(false);
    }
  };

  const openModal = (project: Project) => {
    setCurrentProject(project);
    setShowModal(true);
    setCurrentStageIndex(0);
    setAutoSlide(true);
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, [currentSlideIndex, autoSlide]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };


  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-orange-100 rounded-full">
              <FontAwesomeIcon icon={project.icon} className="text-maincolor_1 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Industry: {project.industry}</h3>
            <button
              onClick={() => openModal(project)}
              className="btn-hover-bg-transition btn-hover-bg-transition-og px-7 text-black border border-gray-500 px-10"
            >
              View Project Details
            </button>
          </div>
        ))}
      </div>

      {showModal && currentProject && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-6xl flex">
            {/* Left: Carousel Section */}
            <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className=" text-center mb-4">
            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-orange-100 rounded-full mx-auto">
              <FontAwesomeIcon icon={projects[currentSlideIndex].icon} className="text-maincolor_1 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Industry: {projects[currentSlideIndex].industry}</h3>
            <ul className="text-gray-600 text-sm">
              {projects[currentSlideIndex].description.map((stage, index) => (
                <li key={index} className="mb-2">{stage}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-black text-white p-2 rounded-full"
              onClick={handlePrevSlide}
            >
              {"<"}
            </button>
            <button
              className="bg-black text-white p-2 rounded-full"
              onClick={handleNextSlide}
            >
              {">"}
            </button>
          </div>
        </div>

            {/* Right: Form Section */}
            <div className="w-full lg:w-1/2 p-8">
              <h3 className="text-lg font-bold mb-4">Enroll for this Project</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Captcha</label>
                  <div className="flex items-center space-x-4">
                    <span className="bg-gray-200 px-4 py-2 rounded-lg font-bold">{captcha}</span>
                    <input
                      type="text"
                      value={formData.captcha}
                      onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
                </div>
                <button
                  type="submit"
                  className="bg-maincolor_1 text-white py-2 px-4 rounded-lg hover:bg-maincolor_2"
                >
                  Enroll Now
                </button>
              </form>
            </div>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-white bg-red-500 rounded-full px-4 py-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCards;



