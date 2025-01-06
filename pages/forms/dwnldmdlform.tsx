"use client";
import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";

// Define the props interface
interface DwnldModalFormProps {
  title: ReactNode; // Dynamic title for the modal
  text: string; // Dynamic text for the modal
  closeModal: () => void;
  formName: string; // Dynamic form name to identify the submission source
}

export default function DwnldModalForm({
  title,
  text,
  closeModal,
  formName,
}: DwnldModalFormProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    userMessage: "",
    formName: formName, // Include the dynamic form name
    page: "", // To store the page URL dynamically
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Capture current page URL dynamically
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      page: window.location.href, // Get current page URL
    }));
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    
    if (target instanceof HTMLInputElement) {
      const { name, value, type, checked } = target;
  
      // Handle checkbox or other input types
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else if (target instanceof HTMLTextAreaElement) {
      const { name, value } = target;
  
      // Handle textarea value
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  

  // Form validation
  const validateForm = () => {
    const newErrors: { name: string; phone: string; email: string } = {
      name: "",
      phone: "",
      email: "",
    };

// Validate name
if (!formData.name.trim()) {
  newErrors.name = "Name is required";
} else if (!/^[A-Za-z\s]{3,50}$/.test(formData.name.trim())) {
  newErrors.name = "Name must be 3-50 characters long and contain only letters and spaces";
}

// Validate phone number
if (!formData.phone) {
  newErrors.phone = "Phone number is required";
} else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
  newErrors.phone = "Phone number must start with 6-9 and be exactly 10 digits long";
}

// Validate email
if (!formData.email) {
  newErrors.email = "Email is required";
} else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
  newErrors.email = "Please enter a valid email address";
}

setErrors(newErrors);
return !Object.values(newErrors).some((error) => error !== "");

  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Send form data to the backend API
      const payload = {
        myData: [
          { lead: formData.formName },
          { name: formData.name },
          { email: formData.email },
          { phone: formData.phone },
          { userMessage: "Testing Please IgnoRE"},
          { page: formData.page },
        ],
      };
      console.log("Form Payload:", payload);
      // POST request to the requestCallBack API
      fetch("https://achieversit.com/management/requestCallBack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            setIsSubmitted(true); // Mark form as submitted
            setIsOpen(false); // Close modal
            console.log("Form submitted successfully.");
          } else {
            alert("Failed to submit the form. Please try again.");
            console.log("Form failed",response.statusText);
          }
        })
        .catch((error) => console.error("Error submitting form:", error));
    }
  };

  return (
    <div>
      {isOpen && !isSubmitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 rounded-full w-6 h-6"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Section */}
              <div className="flex items-center justify-center h-full">
                <Image
                  src="/assets/images/dwnldbrchrimg.png"
                  alt="Illustration"
                  className="w-full"
                  width={200}
                  height={200}
                />
              </div>

              {/* Right Section */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-4">{text}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errors.name ? "border-maincolor_1" : "border-gray-300"
                      }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-maincolor_1 text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errors.phone ? "border-maincolor_1" : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-maincolor_1 text-sm">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errors.email ? "border-maincolor_1" : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-maincolor_1 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* User Message Field */}
                  <div>
                    <label
                      htmlFor="userMessage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="userMessage"
                      name="userMessage"
                      value={formData.userMessage}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Successfully Submitted!
            </h2>
            <p className="text-sm text-gray-600">
              Your details have been successfully submitted.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
