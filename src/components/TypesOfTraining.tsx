"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { useState,useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
}

const Modal = ({ isOpen, onClose, title, description, image }: ModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    whatsappUpdates: false,
    whatsappTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [loading, setLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const router = useRouter();
  
 // Reset form fields whenever the modal is opened
 
   useEffect(() => {
     // Check for existing submissions in sessionStorage
     const checkForSubmission = () => {
       const submittedEmails = JSON.parse(sessionStorage.getItem("submittedEmails") || "[]");
       const submittedPhones = JSON.parse(sessionStorage.getItem("submittedPhones") || "[]");
 
       if (submittedEmails.includes(formData.email) || submittedPhones.includes(formData.phone)) {
         setHasSubmitted(true);
       } else {
         setHasSubmitted(false); // Reset to false if no match is found
       }
     };
 
     checkForSubmission();
   }, [formData.email, formData.phone]);
   useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        whatsappUpdates: false,
        whatsappTerms: false,
      });
      setErrors({});
      setLoading(false);
      setHasSubmitted(false);
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Revert to submit if user modifies fields
    setHasSubmitted(false);
  };
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid phone number is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.whatsappUpdates) newErrors.whatsappUpdates = "You must agree to receive WhatsApp updates.";
    if (!formData.whatsappTerms) newErrors.whatsappTerms = "You must agree to the terms and conditions.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Check if user already submitted
      const submittedEmails = JSON.parse(sessionStorage.getItem("submittedEmails") || "[]");
      const submittedPhones = JSON.parse(sessionStorage.getItem("submittedPhones") || "[]");

      if (submittedEmails.includes(formData.email) || submittedPhones.includes(formData.phone)) {
        alert("User already registered. Redirecting to login...");
        setHasSubmitted(true);
        router.push("/loginpage");
        return;
      }

      // Simulated API payload
      const payloadRequestCallBack = {
        myData: [
          { lead: "right_sticky_contact_us" },
          { name: formData.name },
          { email: formData.email },
          { phone: formData.phone },
          { userMessage: formData.whatsappUpdates ? "User wants WhatsApp updates" : "" },
          { page: window.location.href },
        ],
      };

      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadRequestCallBack),
      });

      if (response.ok) {
        // Store in sessionStorage
        submittedEmails.push(formData.email);
        submittedPhones.push(formData.phone);

        sessionStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));
        sessionStorage.setItem("submittedPhones", JSON.stringify(submittedPhones));

        alert("Form submitted successfully!");
        setFormData({ name: "", phone: "", email: "", whatsappUpdates: false, whatsappTerms: false });
        setErrors({});
        setHasSubmitted(true);
        onClose();
      } else {
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const handleLogin = () => {
  router.push("/loginpage");
};
  return (
    <div className="relative">
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-flowGradientTop bg-white p-2 rounded-lg w-full max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center h-full">
              <Image
                src={image}
                alt="Illustration"
                className="w-full"
                width={200}
                height={200}
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-sm text-gray-600 mb-4">{description}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-maincolor_1" : "border-gray-300"}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-maincolor_1 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor=" phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 text-gray-500 text-sm rounded-l-md">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`focus:ring-blue-500 p-2 border focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm ${errors.phone ? "border-maincolor_1" : "border-gray-300"}`}
                      placeholder="Phone Number"
                    />
                  </div>
                  {errors.phone && <p className="text-maincolor_1 text-sm">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? "border-maincolor_1" : "border-gray-300"}`}
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-maincolor_1 text-sm">{errors.email}</p>}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="whatsapp-updates"
                    name="whatsappUpdates"
                    checked={formData.whatsappUpdates}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="whatsapp-updates" className="ml-2 block text-sm text-gray-900">
                    Receive WhatsApp Updates
                  </label>
                </div>
                {errors.whatsappUpdates && <p className="text-maincolor_1 text-sm">{errors.whatsappUpdates}</p>}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="whatsapp-terms"
                    name="whatsappTerms"
                    checked={formData.whatsappTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="whatsapp-terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <a
                      href="https://www.whatsapp.com/legal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      WhatsApp Terms & Conditions
                    </a>.
                  </label>
                </div>
                {errors.whatsappTerms && <p className="text-maincolor_1 text-sm">{errors.whatsappTerms}</p>}

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <div>
        {hasSubmitted ? (
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-maincolor_1 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TypesOfTraining: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "", image: "" });

  const trainingOptions = [
    {
      title: "Classroom Training",
      image: "/assets/images/classroom.png",
      description: "Engaging Classroom-Based Learning Experiences with hands-on practical training.",
      points: [
        "Engaging Classroom-Based Learning Experiences",
        "Over 40 Hours of Hands-On Practical Training",
        "Training Conducted by Industry Experts from Top MNCs",
        "Live Projects and Real-Time AWS Solutions",
        "Comprehensive Support for AWS Certification",
        "State-of-the-Art Classroom Facilities",
        "Guaranteed 100% Placement Assistance for All Courses",
        "Small Batch Sizes for Personalized Attention",
        "Immediate Clarification of Doubts During Practical Sessions",
      ],
      link: "#",
    },
    {
      title: "Online Training",
      image: "/assets/images/online.png",
      description: "Engaging Live Training Sessions via Zoom or Skype with real-time applications.",
      points: [
        "Engaging Live Training Sessions via Zoom or Skype",
        "Over 40 Hours of Practical, Skill-Based Learning",
        "Expert-Led Training by Professionals from MNCs",
        "Hands-On Projects and Real-Time AWS Applications",
        "Comprehensive AWS Certification Guidance",
        "Lifetime Access to Recorded Training Sessions",
        "100% Placement Support Across All Courses",
        "Dedicated Sessions for Resolving Doubts",
        "Consistent Assignments and Practical Tasks Provided",
      ],
      link: "#",
    },
    {
      title: "Instructor-Led Training",
      image: "/assets/images/experts.png",
      description: "Interactive and engaging training sessions led by expert instructors with real-time applications.",
      points: [
        "Live Instructor-Led Training Sessions for Interactive Learning",
        " Practical, Skill-Based Sessions with Real-World Applications",
        "Experienced Trainers from Top MNCs and Industry Experts",
        "Step-by-Step Hands-On Projects and Case Studies",
        "Real-Time Collaboration and Doubt Clarification",
        "Access to Recorded Training Sessions for Revisions",
        "Industry-Oriented Training with Comprehensive Guidance",
        "Tailored Assignments and Assessments to Measure Progress",
      ],
      link: "#",
    },
  ];

  const handleOpenModal = (option: { title: string; description: string; image: string }) => {
    setModalContent({
      title: option.title,
      description: option.description,
      image: option.image,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto pb-12 p-4">
      <h2 className="text-xl md:text-3xl font-bold mb-12 text-center glitter_text relative elementl pb-2">
        Types of Training
      </h2>

      <div className="flex flex-wrap justify-center gap-10 grid grid-cols-1 lg:grid-cols-3">
        {trainingOptions.map((option, index) => (
          <div
            key={index}
            className="relative shadow-soft rounded-lg overflow-hidden w-full flex flex-col cursor-pointer bg-white"
          >
            <Image
              src={option.image}
              alt={option.title}
              width={200}
              height={300}
              className="w-full h-48 object-cover object-middle"
            />

            <div className="bg-blue-500 text-white text-center text-lg font-bold py-3">
              <h1 className="m-0">{option.title}</h1>
            </div>

            <div className="bg-white p-4 flex flex-col flex-1">
              <p className="text-gray-700 text-sm text-wrap">{option.description}</p>
              <ul className="space-y-2 flex-1 mb-1">
                {option.points.map((point, i) => (
                  <li key={i} className="flex items-center space-x-3 text-wrap">
                    <FontAwesomeIcon
                      icon={faCanadianMapleLeaf}
                      className="text-blue-500 font-semibold"
                    />
                    <span className="text-gray-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleOpenModal(option)}
                className="block btn-solid-bg-transition btn-solid-bg-transition-orange py-2 rounded text-sm md:text-base mt-auto text-center text-white transition-all duration-300"
              ><span>
                Enroll Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        image={modalContent.image}
      />
    </div>
  );
};

export default TypesOfTraining;

