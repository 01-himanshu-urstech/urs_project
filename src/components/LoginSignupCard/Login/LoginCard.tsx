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
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${url}/user-login`, form);

      if (res.data.success) {
        localStorage.removeItem("userTokenTrainerAgregator");
        localStorage.setItem("userTokenTrainerAgregator", res.data.token);
        window.location.href = "/"; // This forces a full reload and shows logout button
      } else {
        setError(res.data.message || "Login failed");
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
            href="/signup"
            className="bg-white text-orange-500 font-bold px-8 py-2 rounded-full"
          >
            SIGNUP
          </Link>
        </div>
      </div>


      {/* Right Side (Login Form) */}
      <div className="w-1/2 bg-white px-12 py-16 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#0B0534] mb-9">
          Log in to <span className="text-orange-500">Skill Strategix</span>
        </h2>
       

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full px-4 py-3 rounded-md mb-4 bg-gray-100 text-sm"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border w-full px-4 py-3 rounded-md mb-2 bg-gray-100 text-sm"
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-orange-500 text-white cursor-pointer font-bold px-8 py-2 rounded-full disabled:opacity-50"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignupCard;
