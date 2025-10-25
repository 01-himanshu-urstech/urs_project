"use client";

import { useState } from "react";
import { Send, Mail, User, Phone } from "lucide-react";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);

  const inputWrapperStyle = "relative mt-4";
  const inputStyle = "w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-base font-medium text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent";
  const iconStyle = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400";

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your form submission logic here (e.g., API call)
    console.log("Enquiry Submitted:", form);
    setSubmitted(true); // Show a success message
  };

  // If the form has been submitted, show a thank you message
  if (submitted) {
    return (
      <div className="text-center py-10">
        <h3 className="text-2xl font-bold text-green-600">Thank You!</h3>
        <p className="mt-2 text-gray-600">Your enquiry has been received. We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Have Questions?</h2>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            Fill out the form below to get in touch with our team. We're here to help you choose the right course.
          </p>
        </div>

        <div className="mt-10 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className={inputWrapperStyle}>
              <User className={iconStyle} size={20} />
              <input type="text" placeholder="Your Name *" className={inputStyle} value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>

            <div className={inputWrapperStyle}>
              <Mail className={iconStyle} size={20} />
              <input type="email" placeholder="Your Email *" className={inputStyle} value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />
            </div>

            <div className={inputWrapperStyle}>
              <Phone className={iconStyle} size={20} />
              <input type="tel" placeholder="Your Phone Number" className={inputStyle} value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>

            <div className="mt-4">
              <textarea placeholder="Your Message" rows={4} className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600" value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
            </div>

            <div className="mt-6 flex items-start gap-3">
              <input type="checkbox" id="consent" checked={form.consent} required onChange={(e) => handleChange("consent", e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
              <label htmlFor="consent" className="text-sm text-gray-600">
                I agree to receive email communications and offers about courses.
              </label>
            </div>

            <button type="submit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-base font-bold text-white shadow-md transition-transform duration-300 hover:bg-blue-700 hover:scale-105">
              Send Enquiry
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
