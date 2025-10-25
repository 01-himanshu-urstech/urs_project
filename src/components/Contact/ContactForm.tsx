'use client';
import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';

const url = process.env.NEXT_PUBLIC_BASE_URL;

// Type definitions
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: Partial<FormErrors> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!validator.isEmail(formData.email)) newErrors.email = 'Invalid email.';
    if (!validator.isMobilePhone(formData.phone, 'any')) newErrors.phone = 'Invalid phone number.';
    // if (!formData.message.trim()) newErrors.message = 'Message is required.';

    setErrors((prev) => ({ ...prev, ...newErrors }) as FormErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Inline validation
    switch (name) {
      case 'name':
        setErrors((prev) => ({
          ...prev,
          name: value.trim() ? '' : 'Name is required.',
        }));
        break;
      case 'email':
        setErrors((prev) => ({
          ...prev,
          email: validator.isEmail(value) ? '' : 'Invalid email.',
        }));
        break;
      case 'phone':
        setErrors((prev) => ({
          ...prev,
          phone: validator.isMobilePhone(value, 'any') ? '' : 'Invalid phone.',
        }));
        break;
      // case 'message':
      //   setErrors((prev) => ({
      //     ...prev,
      //     message: value.trim() ? '' : 'Message is required.',
      //   }));
      //   break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await axios.post(`${url}/contact-create`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        description: formData.message,
      });

      setResponseMsg('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setResponseMsg('Failed to send message.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResponseMsg(''), 3000);
    }
  };

  return (
    <form className="bg-white rounded-xl p-8 shadow-md flex-1" onSubmit={handleSubmit}>
      <h2 className="font-bold text-[#1c1c3c] mb-1 text-center text-4xl">
        Let's <span className="text-[#f61a69] text-4xl">Connect</span>
      </h2>
      <p className="text-black font-bold text-xs mb-6 text-center">
        Kindly provide your details below.
      </p>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name*</label>
        <input
          name="name"
          type="text"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full border-b border-gray-300 focus:outline-none p-1"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Email & Phone */}
      <div className="flex gap-6">
        <div className="mb-4 flex-1">
          <label className="block text-sm font-medium text-gray-700">Email*</label>
          <input
            name="email"
            type="email"
            placeholder="Your Mail ID"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border-b border-gray-300 focus:outline-none p-1"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="mb-4 flex-1">
          <label className="block text-sm font-medium text-gray-700">Phone*</label>
          <input
            name="phone"
            type="tel"
            placeholder="012 3456 789"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border-b border-gray-300 focus:outline-none p-1"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Message*</label>
        <input
          name="message"
          placeholder="Write your message."
          value={formData.message}
          onChange={handleChange}
          className="mt-1 w-full border-b border-gray-300 focus:outline-none p-1 resize-none"
        />
        {/* {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>} */}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#f61a69] text-white cursor-pointer py-2 rounded-md font-semibold w-full hover:bg-[#e0135b]"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {/* Response Message */}
      {responseMsg && (
        <p className="mt-4 text-center font-medium text-sm text-green-600">{responseMsg}</p>
      )}
    </form>
  );
};

export default ContactForm;
