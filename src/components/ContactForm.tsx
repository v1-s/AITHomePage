"use client";

import React, { useState } from "react";

interface ContactFormProps {
  showOverlay: boolean;
  contactClassName: string;
  contactbodyClassName: string;
  conheadClassName: string;
  formClassName: string;
  formbtnClassName: string;
  onClose: () => void;
  buttonText: string;
  showNameField: boolean;
  showEmailField: boolean;
  showMessageField: boolean;
  showCaptchaField: boolean;
  msgClassName: string;
  showClosebtn: boolean;
  msgcardClassName: string;
  contacttext: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onClose,
  showOverlay,
  contactClassName,
  contactbodyClassName,
  conheadClassName,
  formClassName,
  formbtnClassName,
  buttonText,
  showNameField,
  showEmailField,
  showMessageField,
  showCaptchaField,
  msgClassName,
  showClosebtn,
  msgcardClassName,
  contacttext,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    phone: "",
    message: "",
    captchaInput: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState<string>(generateCaptcha());
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8);
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // Update form data with the input change
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    // Clear error for the field being updated
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));

    // Perform validation after field change
    validateForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) return; // If validation fails, stop form submission

    setLoading(true);

    const payload = {
      myData: [
        { lead: "right_sticky_contact_us" },
        { name: formData.name },
        { email: formData.email },
        { phone: formData.phone },
        { userMessage: `${formData.message} (TESTING PLEASE IGNORE)` },
        { page: window.location.href },
      ],
    };

    try {
      const response = await fetch(
        "https://achieversit.com/management/requestCallBack",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setStatusMessage("Form submitted successfully!");
        setSubmissionCount((prevCount) => prevCount + 1);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          captchaInput: "",
        });
        setCaptcha(generateCaptcha());
      } else {
        setStatusMessage(
          "Better luck next time, something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setStatusMessage("An error occurred. Better luck next time.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {
      name: "",
      email: "",
      phone: "",
      captchaInput: "",
    };

    // Name Validation
    if (showNameField && !formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Email Validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (showEmailField && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone Validation (optional: simple validation for digits, can be customized)
    const phoneRegex = /^[0-9]{10}$/;
    if (showEmailField && formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10 digits).";
    }

    // Captcha Validation
    if (formData.captchaInput && formData.captchaInput !== captcha) {
      newErrors.captchaInput = "Captcha does not match.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  // Dynamically render input fields based on submissionCount
  const renderNewFields = () => {
    const newFields = [];
    for (let i = 0; i < submissionCount; i++) {
      newFields.push(
        <div key={i} className="mb-4">
          <label htmlFor={`dynamicField${i}`} className="block mb-2 font-semibold">
            Dynamic Field {i + 1}
          </label>
          <input
            type="text"
            id={`dynamicField${i}`}
            value={formData[`dynamicField${i}`] || ""}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </div>
      );
    }
    return newFields;
  };

  return (
    <>
      {showOverlay && (
        <div className={contactClassName}>
          <div className={contactbodyClassName}>
            <h2 className={conheadClassName}>{contacttext}</h2>
            <form className={formClassName} onSubmit={handleSubmit}>
              {showNameField && (
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border p-2 ${
                      errors.name ? "border-maincolor_1" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-maincolor_1 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              {showEmailField && (
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border p-2 ${
                      errors.email ? "border-maincolor_1" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-maincolor_1 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              )}

              {showMessageField && (
                <div className={`mb-4 ${msgClassName}`}>
                  <label htmlFor="message" className="block mb-2 font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                    rows={4}
                  ></textarea>
                </div>
              )}

              {showCaptchaField && (
                <div className="mb-4">
                  <label htmlFor="captchaInput" className="block mb-2 font-semibold">
                    Captcha:{" "}
                    <span className="font-mono text-lg bg-gray-200 px-2 py-1 rounded">
                      {captcha}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="captchaInput"
                    value={formData.captchaInput}
                    onChange={handleInputChange}
                    className={`w-full border p-2 ${
                      errors.captchaInput ? "border-maincolor_1" : ""
                    }`}
                  />
                  {errors.captchaInput && (
                    <p className="text-maincolor_1 text-sm mt-1">
                      {errors.captchaInput}
                    </p>
                  )}
                </div>
              )}

              {renderNewFields()}

              <div className={formbtnClassName}>
                {showClosebtn && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Close
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-maincolor_1 text-white px-6 py-2 rounded w-full"
                >
                  {loading ? "Submitting..." : buttonText}
                </button>
              </div>
            </form>
            {statusMessage && (
              <div className={`mt-4 p-4 rounded ${msgcardClassName}`}>
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;

