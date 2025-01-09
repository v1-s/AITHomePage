"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  company: string;
  training: string;
  email: string;
  phone: string;
  query: string;
}

const TrainingAdvisorForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    training: "",
    email: "",
    phone: "",
    query: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const router = useRouter();

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

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof FormData] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasSubmitted) {
      alert("You have already submitted this form.");
      return;
    }

    if (validateForm()) {
      setLoading(true);

      const payloadRequestCallBack = {
        myData: [
          { lead: "mentor_form_submission" },
          { name: formData.name },
          { email: formData.email },
          { phone: formData.phone },
          { userMessage: formData.query || "No query provided" },
          { page: "Mentorship Program Page" },
        ],
      };

      const payloadCaptureLeadRequest = {
        myData: [
          { email: formData.email },
          { phone: formData.phone },
          { source: "mentor_form" },
          { page: "Mentorship Program Page" },
        ],
      };

      try {
        const response = await fetch("/api/submitForm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payloadRequestCallBack,
            payloadCaptureLeadRequest,
          }),
        });

        if (response.ok) {
          // Save submission details in sessionStorage
          const submittedEmails = JSON.parse(sessionStorage.getItem("submittedEmails") || "[]");
          const submittedPhones = JSON.parse(sessionStorage.getItem("submittedPhones") || "[]");

          submittedEmails.push(formData.email);
          submittedPhones.push(formData.phone);

          sessionStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));
          sessionStorage.setItem("submittedPhones", JSON.stringify(submittedPhones));

          setHasSubmitted(true);
          alert("Form submitted successfully!");
          setFormData({
            name: "",
            company: "",
            training: "",
            email: "",
            phone: "",
            query: "",
          });
        } else {
          console.error("Form submission failed. Response status not OK.");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = () => {
    router.push("/loginpage");
  };
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full border p-2 rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Company Name and Training Need */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company Name*
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full border p-2 rounded-lg ${errors.company ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
        </div>
        <div>
          <label htmlFor="training" className="block text-sm font-medium text-gray-700">
            Training Need*
          </label>
          <select
            id="training"
            name="training"
            value={formData.training}
            onChange={handleChange}
            className={`w-full border p-2 rounded-lg ${errors.training ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="" disabled>
              Select an Option
            </option>
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend Development</option>
          </select>
          {errors.training && <p className="text-red-500 text-sm">{errors.training}</p>}
        </div>
      </div>

      {/* Email and Phone Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email ID*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <div className="grid grid-cols-4">
            <span className="inline-flex items-center px-3 bg-gray-200 border border-gray-300 text-gray-700 rounded-l-lg">
              +91
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`col-span-3 border p-2 rounded-r-lg ${errors.phone ? "border-red-500" : "border-gray-300"}`}
              pattern="^\d{10}$"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      </div>

      {/* Query Field */}
      <div>
        <label htmlFor="query" className="block text-sm font-medium text-gray-700">
          Query
        </label>
        <textarea
          id="query"
          name="query"
          value={formData.query}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg border-gray-300"
        ></textarea>
      </div>
      {errors.query && <p className="text-red-500 text-sm">{errors.query}</p>}
      {/* ... Add other form fields here ... */}

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

      {/* Submission Status Messages */}
     
    </form>
  );
};

export default TrainingAdvisorForm;
