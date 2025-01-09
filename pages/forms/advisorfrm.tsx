"use client";
import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface DwnldAdvisorModalFormProps {
  title: ReactNode;
  text: string;
  closeModal: () => void;
  formName: string;
  imageSrc: string; // Add imageSrc as a prop
  modalclassname?: string; 
  downloadPdf?: boolean; // Default to false if not provided
}

export default function DwnldAdvisorModalForm({
  title,
  text,
  closeModal,
  formName,
  imageSrc, // Receive the imageSrc prop
  modalclassname,
  downloadPdf = false, // Default to false if not provided
}: DwnldAdvisorModalFormProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginInput, setLoginInput] = useState(""); // Store the input value in the login modal
const [isValidLogin, setIsValidLogin] = useState(false); // Track if the input is valid

  const openLoginModal = () => {
    setIsLoginModalOpen(true);

    setIsOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    userMessage: "",
    formName: formName,
    page: "",
    acceptWhatsApp: false,
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    acceptWhatsApp: "",
    acceptTerms: "",
  });
  const [loading, setLoading] = useState(false);

  // Reset form data when modal opens or when formName changes
  useEffect(() => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      userMessage: "",
      formName: formName,
      page: window.location.href,
      acceptWhatsApp: false,
      acceptTerms: false,
    });
    setErrors({
      name: "",
      phone: "",
      email: "",
      acceptWhatsApp: "",
      acceptTerms: "",
    });
  }, [formName]);
    // Check submission status from sessionStorage
    useEffect(() => {
      
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
      const submittedEmails = JSON.parse(sessionStorage.getItem("submittedEmails") || "[]");
      const submittedPhones = JSON.parse(sessionStorage.getItem("submittedPhones") || "[]");
  
      setIsValidLogin(submittedEmails.includes(loginInput) || submittedPhones.includes(loginInput));
    }, [loginInput]);
  
  // Handle input change and validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validate input dynamically
    if (name === "phone" && /^[6-9]\d{9}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }
    if (name === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    // Clear checkbox errors when clicked
    if (name === "acceptWhatsApp" || name === "acceptTerms") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      acceptWhatsApp: "",
      acceptTerms: "",
    };

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required.";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.acceptWhatsApp) newErrors.acceptWhatsApp = "You must agree to receive WhatsApp updates.";
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions.";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (validateForm()) {
      setLoading(true);
  
      const payloadRequestCallBack = {
        myData: [
          { lead: formData.formName },
          { name: formData.name },
          { email: formData.email },
          { phone: formData.phone },
          { userMessage: "Testing Please Ignore" },
          { page: formData.page },
        ],
      };
  console.log(payloadRequestCallBack);
      const payloadCaptureLeadRequest = {
        myData: [
          { email: formData.email },
          { phone: formData.phone },
          { source: "right_sticky_contact_us" },
          { page: formData.page },
        ],
      };
  
      try {
        const response = await fetch("/api/submitForm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payloadRequestCallBack, payloadCaptureLeadRequest }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          const submittedEmails = JSON.parse(sessionStorage.getItem("submittedEmails") || "[]");
          const submittedPhones = JSON.parse(sessionStorage.getItem("submittedPhones") || "[]");

          submittedEmails.push(formData.email);
          submittedPhones.push(formData.phone);

          sessionStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));
          sessionStorage.setItem("submittedPhones", JSON.stringify(submittedPhones));

          setHasSubmitted(true); // Prevent further submissions
       
          alert(result.message);
          if (downloadPdf) {
            triggerPDFDownload();
          }
          resetFormAndClose();
        } else {
          alert(result.message || "Form submission failed.");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleLoginContinue = () => {
    if (isValidLogin) {
      alert("Login successful!");
      closeLoginModal();
    } else {
      alert("Invalid email or phone number.");
    }
  };
  

  const triggerPDFDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/brochure.pdf"; // Replace with your actual PDF path
    link.download = "Course-Brochure.pdf"; // Set a name for the file
    link.click();
  };

  // Reset the form and close the modal
  const resetFormAndClose = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      userMessage: "",
      formName: formName,
      page: window.location.href,
      acceptWhatsApp: false,
      acceptTerms: false,
    });
    setErrors({
      name: "",
      phone: "",
      email: "",
      acceptWhatsApp: "",
      acceptTerms: "",
    });
    setIsOpen(false);
    closeModal();
  };

  // Removed unused handleReopenForm function

  return (
    <div>
      {isOpen && (
        <div
          className="z-[9999] fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4"
          style={{ zIndex: 9999 }}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg shadow-lg w-full max-w-4xl md:max-w-5xl relative ${modalclassname}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 rounded-full w-6 h-6 bg-black text-white border border-gray-500"
              onClick={resetFormAndClose}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex items-center justify-center p-6">
                <Image
                  src={imageSrc} // Use the dynamic imageSrc prop here
                  alt="Illustration"
                  className="w-full max-w-md h-auto"
                  width={300}
                  height={200}
                  priority
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl text-black md:text-2xl font-bold mb-4 text-center">{title}</h2>
                <p className="text-sm md:text-base text-gray-600 mb-4 text-wrap">{text}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-start">
                      Full Name<span className="text-maincolor_1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full p-2 border rounded-md"
                    />
                    {errors.name && <p className="text-maincolor_1 text-sm">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-start">
                      Phone Number<span className="text-maincolor_1">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full p-2 border rounded-md"
                    />
                    {errors.phone && <p className="text-maincolor_1 text-sm">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-start">
                      Email Address <span className="text-maincolor_1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full p-2 border rounded-md"
                    />
                    {errors.email && <p className="text-maincolor_1 text-sm">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="acceptWhatsApp"
                        checked={formData.acceptWhatsApp}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-xs text-black">I agree to receive WhatsApp updates.</span>
                    </label>
                    {errors.acceptWhatsApp && (
                      <p className="text-maincolor_1 text-sm">{errors.acceptWhatsApp}</p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-xs text-black">I accept AchieversIT <Link href="/termsnCondition" className="text-blue-500"> Privacy Terms </Link> and <Link href="/termsnCondition" className="text-blue-500">Conditions.</Link></span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-maincolor_1 text-sm">{errors.acceptTerms}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center gap-4">
  {/* Submit Button */}
  <button
    type="submit"
    className={`px-4 py-2 bg-maincolor_1 uppercase hover:bg-cyan-800 text-white rounded-md ${hasSubmitted ? "w-1/2 bg-gray-400 cursor-not-allowed" : "w-full"}`}

    disabled={loading || hasSubmitted}
  >
    {loading ? "Submitting..." : "Submit"}
  </button>

  {/* Already Submitted Button */}
  {hasSubmitted && (
    <button
      type="button"
      className="px-4 py-2 bg-blue-500 uppercase hover:bg-blue-700 text-white rounded-md"
      onClick={openLoginModal}
     
    >
      Already Submitted? Login
    </button>
  )}
</div>

                </form>


              
              </div>
            </div>
          </div>
        </div>
      )}
        {isLoginModalOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    onClick={closeLoginModal} // Close the modal when clicking outside
  >
    <div
      className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6"
      onClick={(e) => e.stopPropagation()} // Prevent click events on the background from closing the modal
    >
      {/* Close Button */}
      <button
        onClick={closeLoginModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>

      {/* Modal Content */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
        <p className="text-gray-500 mb-6">Sign up or Login to your account</p>

        {/* Input Field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your phone number or email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-300"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />
        </div>

        {/* Validation Logic */}
        <button
          className={`w-full ${
            isValidLogin ? "bg-blue-500 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
          } font-bold py-3 rounded-lg`}
          disabled={!isValidLogin}
          onClick={handleLoginContinue}
        >
          Continue
        </button>

        {/* Info Section */}
        <p className="text-gray-400 text-sm mt-4">
          <i className="fas fa-shield-alt"></i> We never post without your permission
        </p>

        {/* Terms and Conditions */}
        <p className="text-gray-500 text-xs mt-6">
          By Signing up, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>{" "}
          and our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

