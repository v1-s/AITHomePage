"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Image from "next/image";

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

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (value.trim() !== "") {
      setErrors((prevErrors: Record<string, string>) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    if (name === "whatsappUpdates" || name === "whatsappTerms") {
      setErrors((prevErrors: Record<string, string>) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.whatsappUpdates) newErrors.whatsappUpdates = "You must agree to receive WhatsApp updates.";
    if (!formData.whatsappTerms) newErrors.whatsappTerms = "You must agree to the terms and conditions.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const requestPayload = {
      myData: [
        { lead: "right_sticky_contact_us" },
        { name: formData.name },
        { email: formData.email },
        { phone: formData.phone },
        { userMessage: formData.whatsappUpdates ? "User wants WhatsApp updates" : "" },
        { page: window.location.href }
      ]
    };
    console.log("payload status", requestPayload);

    try {
      const response = await fetch("https://achieversit.com/management/requestCallBack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", phone: "", email: "", whatsappUpdates: false, whatsappTerms: false });
        setErrors({});
        onClose();
      } else {
        alert("There was an error submitting the form.");
      }
    } catch {
      alert("please provide valid details");
    }

    try {
      const leadPayload = {
        myData: [
          { email: formData.email },
          { phone: formData.phone },
          { source: "lovedReviews" },
          { page: window.location.href }
        ]
      };

      const leadResponse = await fetch("https://achieversit.com/management/captureLeadRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadPayload),
      });

      if (leadResponse.ok) {
        console.log("Lead captured successfully");
      } else {
        console.log("Error capturing lead");
      }
    } catch (error) {
      console.log("Error capturing lead", error);
    }
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
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded ml-2"
                  >
                    Submit
                  </button>
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
    <div className="w-full lg:w-4/5 mx-auto pb-12">
      <h2 className="text-xl font-bold mb-12 text-center glitter_text">
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

