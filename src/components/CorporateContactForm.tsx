"use client";

import React, { useState } from "react";

type FormData = {
  [key: string]: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  location: string;
  phoneNumber: string;
  companyName: string;
  companySize: string;
  numberOfPeople: string;
  jobTitle: string;
  jobRole: string;
  trainingNeeds: string;
  jobLevel: string;
};

const CorporateContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    workEmail: "",
    location: "",
    phoneNumber: "",
    companyName: "",
    companySize: "",
    numberOfPeople: "",
    jobTitle: "",
    jobRole: "",
    trainingNeeds: "",
    jobLevel: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        workEmail: "",
        location: "",
        phoneNumber: "",
        companyName: "",
        companySize: "",
        numberOfPeople: "",
        jobTitle: "",
        jobRole: "",
        trainingNeeds: "",
        jobLevel: "",
      });
    }
  };

  return (
    <form
      className="p-6 shadow-lg rounded-lg flex-grow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6 glitter_text border-b-2 pb-3">Contact Us</h2>

      {/* First Name and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
        ].map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium mb-2"
            >
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={`w-full border ${
                errors[field.name] ? "border-maincolor_1" : "border-gray-300"
              } rounded-lg px-3 py-2`}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {errors[field.name] && (
              <p className="text-maincolor_1 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Work Email and Phone Number in Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          { name: "workEmail", label: "Work Email" },
          { name: "phoneNumber", label: "Phone Number" },
        ].map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium mb-2"
            >
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={`w-full border ${
                errors[field.name] ? "border-maincolor_1" : "border-gray-300"
              } rounded-lg px-3 py-2`}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {errors[field.name] && (
              <p className="text-maincolor_1 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Company Name */}
      <div className="mb-4">
        <label
          htmlFor="companyName"
          className="block text-sm font-medium mb-2"
        >
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`w-full border ${
            errors.companyName ? "border-maincolor_1" : "border-gray-300"
          } rounded-lg px-3 py-2`}
          placeholder="Enter company name"
        />
        {errors.companyName && (
          <p className="text-maincolor_1 text-sm mt-1">{errors.companyName}</p>
        )}
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={`w-full border ${
            errors.jobTitle ? "border-maincolor_1" : "border-gray-300"
          } rounded-lg px-3 py-2`}
          placeholder="Enter job title"
        />
        {errors.jobTitle && (
          <p className="text-maincolor_1 text-sm mt-1">{errors.jobTitle}</p>
        )}
      </div>

      {/* Training Needs */}
      <div className="mb-4">
        <label
          htmlFor="trainingNeeds"
          className="block text-sm font-medium mb-2"
        >
          Training Needs
        </label>
        <textarea
          id="trainingNeeds"
          name="trainingNeeds"
          value={formData.trainingNeeds}
          onChange={handleChange}
          className={`w-full border ${
            errors.trainingNeeds ? "border-maincolor_1" : "border-gray-300"
          } rounded-lg px-3 py-2`}
          placeholder="Describe your training needs"
        />
        {errors.trainingNeeds && (
          <p className="text-maincolor_1 text-sm mt-1">{errors.trainingNeeds}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full btn-solid-bg-transition btn-solid-bg-transition-orange px-10"
      >
        <span>Submit</span>
      </button>
    </form>
  );
};

export default CorporateContactForm;
