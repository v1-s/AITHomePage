"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

interface EnrollmentFormProps {
  buttonText: string;
  showNameField: boolean;
  showEmailField: boolean;
  showMessageField: boolean;
  showCaptchaField: boolean;
  contacttext: string;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  buttonText,
  showNameField,
  showEmailField,
  showMessageField,
  showCaptchaField,
  contacttext,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    captchaInput: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    captchaInput: '',
  });

  const [captcha, setCaptcha] = useState<string>(generateCaptcha());
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8); // Generates a 6-character captcha
  }

  const validateForm = () => {
    const newErrors = { name: '', email: '', contact: '', message: '', captchaInput: '' };

    if (showNameField && !formData.name.trim()) newErrors.name = 'Name is required.';
    if (showEmailField) {
      if (!formData.email.trim()) newErrors.email = 'Email is required.';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required.';
    else if (!/^[6789]\d{9}$/.test(formData.contact)) newErrors.contact = 'Enter a valid contact number.';
    if (showMessageField && !formData.message.trim()) newErrors.message = 'Message is required.';
    if (showCaptchaField && formData.captchaInput !== captcha) newErrors.captchaInput = 'Captcha does not match.';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitStatus('');
    setErrors({ name: '', email: '', contact: '', message: '', captchaInput: '' });

    if (validateForm()) {
      setLoading(true);
      setSubmitStatus('Submitting...');

      try {
        await submitForm();
        setSubmitStatus('Form submitted successfully!');
        setFormData({ name: '', email: '', contact: '', message: '', captchaInput: '' });
        setCaptcha(generateCaptcha());
      } catch (error) {
        console.error("Submission error:", error);
        setSubmitStatus('Failed to submit the form. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const submitForm = async () => {
    const payload = {
      myData: [
        { lead: 'right_sticky_contact_us' },
        { name: formData.name },
        { email: formData.email },
        { phone: formData.contact },
        { userMessage: formData.message },
        { page: window.location.href },
      ],
    };

    await fetch('https://achieversit.com/management/requestCallBack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const leadPayload = {
      myData: [
        { email: formData.email },
        { phone: formData.contact },
        { source: 'lovedReviews' },
        { page: 'UI Development Course in Bangalore' },
      ],
    };

    await fetch('https://achieversit.com/management/captureLeadRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload),
    });
  };

  const handleCaptchaRefresh = () => {
    setCaptcha(generateCaptcha());
    setFormData((prevData) => ({ ...prevData, captchaInput: '' }));
  };

  return (
    <div className="md:mx-12 bg-Bg2 bg-cover bg-no-repeat px-12 py-12 rounded-md shadow-glassShadow">
      <h3 className="text-lightgrey font-semibold text-2xl text-maincolor_1 mb-5">{contacttext}</h3>

      <form className="needs-validation" name="enrollmentForm" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
          {showNameField && (
            <div className="form-group font-bold">
              <label htmlFor="name" className="block text-maincolor_1 text-lg mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
              />
              {errors.name && <div className="text-maincolor_1 text-sm">{errors.name}</div>}
            </div>
          )}

          {showEmailField && (
            <div className="form-group font-bold">
              <label htmlFor="email" className="block text-maincolor_1 text-lg mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control user-email w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
              {errors.email && <div className="text-maincolor_1 text-sm">{errors.email}</div>}
            </div>
          )}

          <div className="form-group font-bold">
            <label htmlFor="contact" className="block text-maincolor_1 text-lg mb-2">Contact Number</label>
            <input
              type="tel"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="form-control user-phone w-full p-2 border border-gray-300 rounded-md"
              placeholder="Contact Number"
              pattern="^[6789]\d{9}$"
            />
            {errors.contact && <div className="text-maincolor_1 text-sm">{errors.contact}</div>}
          </div>

          {showMessageField && (
            <div className="form-group font-bold">
              <label htmlFor="message" className="block text-maincolor_1 text-lg mb-2">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-control w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Message"
              />
              {errors.message && <div className="text-maincolor_1 text-sm">{errors.message}</div>}
            </div>
          )}

          {showCaptchaField && (
            <div className="mb-0">
              <label htmlFor="captchaInput" className="block mb-2 font-semibold text-maincolor_1 text-lg">
                Captcha: <span className="font-mono text-lg bg-gray-200 px-2 rounded">{captcha}</span>
                <FontAwesomeIcon
                  icon={faRotate}
                  className="fa-rotate-270 cursor-pointer ml-2"
                  onClick={handleCaptchaRefresh}
                />
              </label>
              <input
                type="text"
                id="captchaInput"
                value={formData.captchaInput}
                onChange={handleInputChange}
                className={`w-full border p-2 ${errors.captchaInput ? 'border-maincolor_1' : ''}`}
              />
              {errors.captchaInput && <div className="text-maincolor_1 text-sm mt-1 font-bold">{errors.captchaInput}</div>}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-orangered curriculum-enroll mt-8 w-full py-2 px-4 bg-maincolor_1 text-white rounded-md hover:bg-orange-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : buttonText || 'Reach Us'}
          </button>
        </div>
      </form>

      {submitStatus && (
        <div className={`mt-4 text-center ${submitStatus.includes('successfully') ? 'text-green-600' : 'text-maincolor_1'}`}>
          {submitStatus}
        </div>
      )}
    </div>
  );
};

export default EnrollmentForm;
