"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBriefcase, faCode, faHome, IconDefinition,faSync,faTimes } from "@fortawesome/free-solid-svg-icons";
// Define Project type
type Project = {
  id: number;
  icon: IconDefinition;
  industry: string;
  description: string[]; 
  shortDescription:string;// Array of detailed stages
};
const ProjectCards = () => {
  const projects: Project[] = [
    {
      id: 1,
      icon: faShoppingCart,
      industry: "E-commerce",
      shortDescription: "Developed a dynamic and scalable online shopping platform with advanced features.",
      description: [
        "Stage 1: Setting up an online storefront using Python and React, focusing on dynamic product catalog and responsive design.",
        "Stage 2: Implementing a secure payment gateway for transactions, integrating PayPal, Stripe, and credit card payment options.",
        "Stage 3: Building a personalized recommendation engine using machine learning algorithms to analyze user preferences and behavior.",
        "Stage 4: Adding real-time order tracking and a robust review/rating system for products.",
        "Stage 5: Deploying the application on AWS with load balancing and auto-scaling for high availability.",
      ],
    },
    {
      id: 2,
      icon: faBriefcase,
      industry: "IT",
      shortDescription: "Architected a scalable and cost-efficient cloud infrastructure for enterprise solutions.",
      description: [
        "Stage 1: Transitioning from Cloud Engineer to Cloud Architect by designing a roadmap and acquiring necessary certifications.",
        "Stage 2: Analyzing enterprise requirements to design scalable and secure multi-cloud infrastructure.",
        "Stage 3: Implementing cost-optimization strategies including resource scheduling and rightsizing instances.",
        "Stage 4: Integrating Infrastructure as Code (IaC) using tools like Terraform for consistent deployments.",
        "Stage 5: Ensuring compliance and security through automated monitoring and alerting systems.",
      ],
    },
    {
      id: 3,
      icon: faCode,
      industry: "Software Development",
      shortDescription: "Delivered a robust, full-stack web application with modern technologies and best practices.",
      description: [
        "Stage 1: Conducting requirement analysis and preparing system architecture for a scalable web application.",
        "Stage 2: Developing the backend using Node.js and Express, implementing RESTful APIs and database schema.",
        "Stage 3: Building the frontend with React, incorporating state management using Redux or Context API.",
        "Stage 4: Integrating authentication and authorization using OAuth2 and JWT tokens.",
        "Stage 5: Setting up CI/CD pipelines with Jenkins and GitHub Actions for automated testing and deployment.",
        "Stage 6: Optimizing performance through lazy loading, caching, and database indexing.",
      ],
    },
    {
      id: 4,
      icon: faHome,
      industry: "Real Estate",
      shortDescription: "Designed a seamless property listing platform connecting buyers and sellers.",
      description: [
        "Stage 1: Creating a user-friendly platform with a responsive UI for property listings using React and Material-UI.",
        "Stage 2: Developing advanced search and filter functionalities with Elasticsearch to handle large data sets.",
        "Stage 3: Enabling secure communication between buyers and sellers through in-app messaging.",
        "Stage 4: Integrating property valuation tools using third-party APIs for accurate pricing insights.",
        "Stage 5: Adding admin features for managing listings, user approvals, and automated email notifications.",
        "Stage 6: Deploying the platform with Kubernetes for containerized scaling and enhanced fault tolerance.",
      ],
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", captcha: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", captcha: "" });
  const [captcha, setCaptcha] = useState<string>("");
  const [loading, setLoading] = useState(false);
 
  
  const generateCaptcha = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);
  
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        return value ? "" : "Name is required";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Valid email is required";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Valid 10-digit phone number is required";
      case "captcha":
        return value === captcha ? "" : "Captcha does not match";
      default:
        return "";
    }
  };
  const validateForm = (): boolean => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      captcha: validateField("captcha", formData.captcha),
    };
    setErrors(newErrors);
    console.log("Validation Errors:", newErrors); // Console log for debugging
    return Object.values(newErrors).every((error) => !error);
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    if (validateForm()) {
      setLoading(true);
  
      const payloadRequestCallBack = {
        myData: [
          { lead: 'right_sticky_contact_us' },
          { name: formData.name },
          { email: formData.email },
          { phone: formData.phone },
          { page: window.location.href },
        ],
      };
  
      const payloadCaptureLeadRequest = {
        myData: [
          { email: formData.email },
          { phone: formData.phone },
          { source: 'right_sticky_contact_us' },
          { page: window.location.href },
        ],
      };
  
      try {
        const response = await fetch('/api/submitForm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payloadRequestCallBack,
            payloadCaptureLeadRequest,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message);
          setFormData({
            name: '',
            email: '',
            phone: '',
            captcha: '',
          });
          setCaptcha(generateCaptcha());
        } else {
          alert(result.message || 'Form submission failed.');
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
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
  const handleMouseEnter = () => {
    setAutoSlide(false); // Pause on hover
  };
  const handleMouseLeave = () => {
    setAutoSlide(true); // Resume on leave
  };
  return (
    <div className="bg-gray-50 py-12 px-6">
      <h2 className="text-xl  md:text-3xl relative elementl text-center mx-auto capitalize mb-5 glitter_text font-bold">Professional Skills Workshops</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-orange-100 rounded-full">
              <FontAwesomeIcon icon={project.icon} className="text-maincolor_1 text-2xl" />
            </div>
            <h3 className="text-md md:text-xl font-bold text-gray-800 mb-2"> {project.industry}</h3>
            <p className="text-sm text-gray-500 line-clamp-3 ellipse">  {project.shortDescription}</p>
            <button
              onClick={() => openModal(project)}
              className="btn-hover-bg-transition btn-hover-bg-transition-og px-7 text-black border border-gray-500 px-10"
            >
          <span className="text-xs md:text-md">   View Project Details</span> 
            </button>
          </div>
        ))}
      </div>
      {showModal && currentProject && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-9/12 max-w-6xl flex md:flex-row flex-col relative  max-h-screen overflow-y-auto"
         onMouseEnter={handleMouseEnter} // Pause on hover
         onMouseLeave={handleMouseLeave} // Resume on leave
         >
        <button
     className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 rounded-full w-6 h-6 bg-black text-white border border-gray-500"
     onClick={() => setShowModal(false)}
   >
     <FontAwesomeIcon icon={faTimes} />
   </button>
      {/* Left: Carousel Section */}
      <div className="relative bg-white shadow-md rounded-lg p-6 w-full flex flex-col  items-center justify-center">
      <div className="flex justify-between items-center w-full mb-4">
        <button
          className="bg-maincolor_1 text-white p-2 w-10 h-10 rounded-full"
          onClick={handlePrevSlide}
        >
          {"<"}
        </button>
        <div className="text-center flex-grow mx-4">
          <div className="w-12 h-12 mb-4 flex items-center justify-center bg-orange-100 rounded-full mx-auto">
            <FontAwesomeIcon
              icon={projects[currentSlideIndex].icon}
              className="text-maincolor_1 text-2xl"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Industry: {projects[currentSlideIndex].industry}
          </h3>
          <ul className="text-gray-600 text-sm">
            {projects[currentSlideIndex].description.map((stage, index) => (
              <li key={index} className="mb-2">
                {stage}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-maincolor_1 text-white p-2 w-10 h-10 rounded-full"
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
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Captcha</label>
          <div className="flex items-center space-x-4">
         
            <span className="bg-gray-200 px-4 py-2 rounded-lg font-bold">{captcha}</span>
            <button
                      type="button"
                      onClick={generateCaptcha}
                      className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400"
                    >
                   <FontAwesomeIcon icon={faSync} className="text-maincolor_1" />
                    </button>
                    </div>
            <input
              type="text"
              value={formData.captcha}
              onChange={(e) => handleInputChange("captcha", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
       
          
          {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
        </div>
      
        <button
  type="submit"
  className="bg-maincolor_1 text-white py-2 px-4 rounded-lg hover:bg-maincolor_2"
  disabled={loading} // Disable the button when loading
>
  {loading ? 'Enrolling...' : 'Enroll Now'}
</button>

      </form>
      </div>
      </div>
      </div>
      )}
      </div>
    )}
export default ProjectCards;