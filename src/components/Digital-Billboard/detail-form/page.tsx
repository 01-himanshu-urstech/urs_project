"use client";

import axios from "axios";
import React, { useState } from "react";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    media_type: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Enter a valid 10-digit phone number";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate all fields before submission
    const newErrors = {
      name: !formData.name.trim() ? "Name is required" : "",
      email: !formData.email
        ? "Email is required"
        : !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
        ? "Invalid email"
        : "",
      phone: !formData.phone
        ? "Phone is required"
        : !/^\d{10}$/.test(formData.phone)
        ? "Invalid phone"
        : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/contact-create`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setMessage("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          media_type: "",
          description: "",
        });
        setErrors({ name: "", email: "", phone: "" });
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || "Something went wrong.");
      } else {
        setMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile*"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        <input
          type="text"
          name="media_type"
          value={formData.media_type}
          onChange={handleChange}
          placeholder="Media Type"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Preferred City/Location"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-[#E7135C] text-white font-semibold rounded-md py-2 mt-4 hover:bg-[#c10e4c] transition text-sm"
        >
          {loading ? "Submitting..." : "Get a Quote"}
        </button>
        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Page;
