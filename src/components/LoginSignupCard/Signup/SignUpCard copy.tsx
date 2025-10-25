"use client";

import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
const url = process.env.NEXT_PUBLIC_BASE_URL;

const LoginSignupCard: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role_id: "", // Added role_id
  });

  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role_id: "", // Added role_id error
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const errors: any = {};

    if (!form.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(form.phone)) {
      errors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!form.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!form.role_id) {
      errors.role_id = "Please select a role";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${url}/user-register`, form);

      if (res.data.success) {
        // localStorage.setItem("userTokenTrainerAgregator", res.data.token);
        window.location.href = "/login"; // This forces a full reload and shows logout button
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[32rem] max-w-6xl mx-auto mt-32 shadow-2xl rounded-3xl overflow-hidden">
      {/* Left Side */}
      <div className="w-1/2 relative flex flex-col justify-center items-center px-8 py-8 text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/1.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Orange overlay with opacity */}
        <div className="absolute inset-0 bg-[#fdba74]/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-base font-medium mb-6 max-w-xs">
            Enter your personal details and start your journey with us
          </p>
          <Link
            href="/login"
            className="bg-white text-orange-300 font-bold px-8 py-2 rounded-full"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white px-12 py-16 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#0B0534] mb-9">
          SignUp to <span className="text-orange-300">Trainer Aggregator</span>
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border w-full px-4 py-3 rounded-md mb-2 bg-gray-100 text-sm"
        />
        {formErrors.name && (
          <p className="text-red-500 text-xs mb-2">{formErrors.name}</p>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border w-full px-4 py-3 rounded-md mb-2 bg-gray-100 text-sm"
        />
        {formErrors.phone && (
          <p className="text-red-500 text-xs mb-2">{formErrors.phone}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full px-4 py-3 rounded-md mb-2 bg-gray-100 text-sm"
        />
        {formErrors.email && (
          <p className="text-red-500 text-xs mb-2">{formErrors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border w-full px-4 py-3 rounded-md mb-2 bg-gray-100 text-sm"
        />
        {formErrors.password && (
          <p className="text-red-500 text-xs mb-2">{formErrors.password}</p>
        )}

        {/* Dropdown for Role */}
        <select
          name="role_id"
          value={form.role_id}
          onChange={handleChange}
          className="border w-full px-4 py-3 rounded-md mb-2 bg-gray-100 text-sm"
        >
          <option value="">Select Role</option>
          <option value="1">Join as Trainer</option>
          <option value="2">Join as Job Poster</option>
        </select>
        {formErrors.role_id && (
          <p className="text-red-500 text-xs mb-2">{formErrors.role_id}</p>
        )}

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-orange-300 text-white cursor-pointer font-bold px-8 py-2 rounded-full disabled:opacity-50"
        >
          {loading ? "Signing up..." : "SIGNUP"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignupCard;
