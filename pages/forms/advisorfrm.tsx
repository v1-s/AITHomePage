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

      const payloadCaptureLeadRequest = {
        myData: [
          { email: formData.email },
          { phone: formData.phone },
          { source: "right_sticky_contact_us" },
          { page: formData.page },
        ],
      };

      try {
        const responses = await Promise.all([
          fetch("https://achieversit.com/management/requestCallBack", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadRequestCallBack),
          }),
          fetch("https://achieversit.com/management/captureLeadRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadCaptureLeadRequest),
          }),
        ]);

        if (responses.every((response) => response.ok)) {
          alert("Form submitted successfully!");
          if (downloadPdf) {
            triggerPDFDownload();
          }
          resetFormAndClose();
        } else {
          alert("Form submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
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
  };

  // Removed unused handleReopenForm function

  return (
    <div>
      {isOpen && (
        <div
          className="z-[9999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
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
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-maincolor_1 uppercase  hover:bg-cyan-800 text-white rounded-md"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

