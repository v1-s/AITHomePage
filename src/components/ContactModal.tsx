"use client";
import { useState, useRef, useEffect } from 'react';

interface ContactModalProps {
  toggleModal: () => void; // This will be used to close the modal
}

const ContactModal = ({ toggleModal }: ContactModalProps) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reference to the modal content to check for clicks outside
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear errors as user types
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validateForm = () => {
    const newErrors: { name: string; email: string } = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitted(true);
    toggleModal(); // Close modal on submit

    console.log('Form Submitted:', formData);
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleModal(); // Close the modal if click is outside of the modal content
      }
    };

    // Add event listener for click events
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [toggleModal]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      id="contactModal"
      tabIndex={-1}
      aria-labelledby="contactModalLabel"
      aria-hidden="false"
    >
      <div
        ref={modalRef} // Reference to the modal content
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 absolute lg:left-[30%] top-[30%]"
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold" id="contactModalLabel">
            {isSubmitted ? 'Thank you for your submission' : 'Contact Form'}
          </h5>
          <button
            type="button"
            className="text-2xl text-gray-500 hover:text-gray-700"
            onClick={toggleModal}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          {isSubmitted ? (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ) : (
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full p-3 border ${
                    errors.name ? 'border-maincolor_1' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.name ? 'focus:ring-maincolor_1' : 'focus:ring-blue-500'
                  }`}
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="text-maincolor_1 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full p-3 border ${
                    errors.email ? 'border-maincolor_1' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? 'focus:ring-maincolor_1' : 'focus:ring-blue-500'
                  }`}
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="text-maincolor_1 text-sm">{errors.email}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
