"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const url = process.env.NEXT_PUBLIC_BASE_URL;

interface BasicFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface TrainerDetailFormData {
  whatsapp: string;
  gender: string;
  age: string;
  blood_group: string;
  marital_status: string;
  state: string;
  city: string;
  designation: string;
  category_name: string;
  qualification: string;
  experience: string;
  about: string;
  aadhar_number: string;
  pan_number: string;
  linkedin_url: string;
  availability: string;
}

interface JobPosterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role_id: string;
}

const statesAndCities: { [key: string]: string[] } = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur"],
};

// ✅ Validation functions
const validateAadhar = (aadhar: string): boolean => {
  const aadharRegex = /^\d{12}$/;
  return aadharRegex.test(aadhar);
};

const validatePAN = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

const LoginSignupCard: React.FC = () => {
  const router = useRouter();

  const [basicForm, setBasicForm] = useState<BasicFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [trainerDetailForm, setTrainerDetailForm] = useState<TrainerDetailFormData>({
    whatsapp: "",
    gender: "",
    age: "",
    blood_group: "",
    marital_status: "",
    state: "",
    city: "",
    designation: "",
    category_name: "",
    qualification: "",
    experience: "",
    about: "",
    aadhar_number: "",
    pan_number: "",
    linkedin_url: "",
    availability: "",
  });

  const [jobPosterForm, setJobPosterForm] = useState<JobPosterFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role_id: "2",
  });

  const [otp, setOtp] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [step, setStep] = useState<"role" | "basic" | "otp" | "details" | "status">("role");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<{
    status: "approved" | "rejected" | "closed" | "under_process";
    message: string;
  } | null>(null);

  const states = Object.keys(statesAndCities);
  const cities = trainerDetailForm.state ? statesAndCities[trainerDetailForm.state] : [];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep("basic");
    setError("");
  };

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (selectedRole === "1") {
      setBasicForm({ ...basicForm, [name]: value });
    } else {
      setJobPosterForm({ ...jobPosterForm, [name]: value });
    }
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleTrainerDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrainerDetailForm({ ...trainerDetailForm, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateBasicForm = () => {
    let isValid = true;
    const errors: any = {};

    const name = selectedRole === "1" ? basicForm.name : jobPosterForm.name;
    const phone = selectedRole === "1" ? basicForm.phone : jobPosterForm.phone;
    const email = selectedRole === "1" ? basicForm.email : jobPosterForm.email;
    const password = selectedRole === "1" ? basicForm.password : jobPosterForm.password;

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone must be 10 digits";
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email";
      isValid = false;
    }
    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateTrainerDetailForm = () => {
    let isValid = true;
    const errors: any = {};

    if (trainerDetailForm.whatsapp && !/^\d{10}$/.test(trainerDetailForm.whatsapp)) {
      errors.whatsapp = "WhatsApp number must be 10 digits";
      isValid = false;
    }
    if (!trainerDetailForm.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }
    if (!trainerDetailForm.age.trim()) {
      errors.age = "Age is required";
      isValid = false;
    }
    if (!trainerDetailForm.state) {
      errors.state = "State is required";
      isValid = false;
    }
    if (!trainerDetailForm.city) {
      errors.city = "City is required";
      isValid = false;
    }
    if (!trainerDetailForm.category_name.trim()) {
      errors.category_name = "Category is required";
      isValid = false;
    }
    if (!trainerDetailForm.qualification.trim()) {
      errors.qualification = "Qualification is required";
      isValid = false;
    }
    if (!trainerDetailForm.experience.trim()) {
      errors.experience = "Experience is required";
      isValid = false;
    }

    // ✅ Validate Aadhar (12 digits)
    if (trainerDetailForm.aadhar_number && !validateAadhar(trainerDetailForm.aadhar_number)) {
      errors.aadhar_number = "Aadhar must be 12 digits";
      isValid = false;
    }

    // ✅ Validate PAN (5 letters + 4 digits + 1 letter)
    if (trainerDetailForm.pan_number && !validatePAN(trainerDetailForm.pan_number)) {
      errors.pan_number = "PAN format: 5 letters + 4 digits + 1 letter (e.g., AAAAA1234A)";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleBasicSignup = async () => {
    if (!validateBasicForm()) return;

    try {
      setLoading(true);
      setError("");

      const dataToSend = selectedRole === "1" ? basicForm : jobPosterForm;
      const res = await axios.post(`${url}/user-register`, {
        ...dataToSend,
        role_id: selectedRole,
      });

      if (res.data.success) {
        setStep("otp");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // const handleVerifyOtp = async () => {
  //   if (!otp.trim()) {
  //     setError("OTP is required");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     setError("");

  //     const email = selectedRole === "1" ? basicForm.email : jobPosterForm.email;
  //     const res = await axios.post(`${url}/verify-otp`, {
  //       email,
  //       otp,
  //     });

  //     if (res.data.success) {
  //       localStorage.removeItem("userTokenTrainerAgregator");
  //       localStorage.setItem("userTokenTrainerAgregator", res.data.token);

  //       if (selectedRole === "1") {
  //         setStep("details");
  //       } else {
  //         window.location.href = "/";
  //       }
  //     } else {
  //       setError(res.data.message || "OTP verification failed");
  //     }
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || "Server error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



const handleVerifyOtp = async () => {
  const otpTrimmed = otp.trim(); // ✅ Remove spaces
  
  if (!otpTrimmed) {
    setError("OTP is required");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const email = selectedRole === "1" ? basicForm.email : jobPosterForm.email;
    const res = await axios.post(`${url}/verify-otp`, {
      email,
      otp: otpTrimmed, // ✅ Send trimmed OTP
    });

    if (res.data.success) {
      localStorage.removeItem("userTokenTrainerAgregator");
      localStorage.setItem("userTokenTrainerAgregator", res.data.token);

      if (selectedRole === "1") {
        setStep("details");
      } else {
        window.location.href = "/";
      }
    } else {
      setError(res.data.message || "OTP verification failed");
    }
  } catch (err: any) {
    setError(err.response?.data?.message || "Server error");
  } finally {
    setLoading(false);
  }
};


  const handleSubmitTrainerDetails = async () => {
    if (!validateTrainerDetailForm()) return;

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("userTokenTrainerAgregator");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const res = await axios.put(
        `${baseUrl}/user-profile-update`,
        {
          name: basicForm.name,
          email: basicForm.email,
          phone: basicForm.phone,
          ...trainerDetailForm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setApplicationStatus({
          status: "under_process",
          message: "Your application is under review",
        });
        setStep("status");
      } else {
        setError(res.data.message || "Failed to submit details");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case "rejected":
        return <XCircle className="w-16 h-16 text-red-500" />;
      case "under_process":
        return <Clock className="w-16 h-16 text-blue-500" />;
      case "closed":
        return <AlertCircle className="w-16 h-16 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-green-200";
      case "rejected":
        return "bg-red-50 border-red-200";
      case "under_process":
        return "bg-blue-50 border-blue-200";
      case "closed":
        return "bg-gray-50 border-gray-200";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "under_process":
        return "Under Process";
      case "closed":
        return "Closed";
      default:
        return "";
    }
  };

  return (
    <div className="w-full min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:flex relative bg-white">
        <div
          className="absolute inset-0 rounded-r-3xl overflow-hidden"
          style={{
            backgroundImage: `url('/1.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-orange-400/40 rounded-r-3xl"></div>
        <div className="relative z-10 w-full flex flex-col justify-center items-center text-white text-center px-8 py-12">
          <h2 className="text-5xl font-bold mb-6">Hello, Friend!</h2>
          <p className="text-lg font-medium mb-8 max-w-sm leading-relaxed">
            {step === "role"
              ? "Choose your role to get started"
              : step === "basic"
              ? "Enter your basic information"
              : step === "otp"
              ? "Verify your account with OTP"
              : step === "details"
              ? "Complete your trainer profile"
              : "Check your application status"}
          </p>
          <Link
            href="/login"
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full bg-white px-6 md:px-12 lg:px-16 py-12 md:py-16 flex flex-col justify-center overflow-y-auto max-h-screen lg:max-h-full">
        
        {/* STEP 1: Role Selection */}
        {step === "role" && (
          <>
            <h2 className="text-4xl font-bold text-gray-800 mb-12">
              Join as <span className="text-orange-500">Skill Strategix</span>
            </h2>

            <div className="space-y-6">
              <button
                onClick={() => handleRoleSelect("1")}
                className="w-full p-6 border-2 border-orange-400 rounded-2xl hover:bg-orange-50 transition duration-300 text-left group"
              >
                <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-orange-500 transition">
                  🎓 Join as Trainer
                </h3>
                <p className="text-gray-600 text-sm">Share your expertise and teach others</p>
              </button>

              <button
                onClick={() => handleRoleSelect("2")}
                className="w-full p-6 border-2 border-orange-400 rounded-2xl hover:bg-orange-50 transition duration-300 text-left group"
              >
                <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-orange-500 transition">
                  💼 Join as Job Poster
                </h3>
                <p className="text-gray-600 text-sm">Post training requirements and hire trainers</p>
              </button>
            </div>
          </>
        )}

        {/* STEP 2: Basic Information */}
        {step === "basic" && (
          <>
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              {selectedRole === "1" ? "🎓 Trainer" : "💼 Job Poster"}{" "}
              <span className="text-orange-500">Registration</span>
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={selectedRole === "1" ? basicForm.name : jobPosterForm.name}
                  onChange={handleBasicChange}
                  className="border border-gray-300 w-full px-4 py-3 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={selectedRole === "1" ? basicForm.email : jobPosterForm.email}
                  onChange={handleBasicChange}
                  className="border border-gray-300 w-full px-4 py-3 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={selectedRole === "1" ? basicForm.phone : jobPosterForm.phone}
                  onChange={handleBasicChange}
                  className="border border-gray-300 w-full px-4 py-3 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={selectedRole === "1" ? basicForm.password : jobPosterForm.password}
                  onChange={handleBasicChange}
                  className="border border-gray-300 w-full px-4 py-3 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
              </div>

              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setStep("role")}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-white cursor-pointer font-bold px-6 py-3 rounded-lg transition duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleBasicSignup}
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer font-bold px-6 py-3 rounded-lg disabled:opacity-50 transition duration-300"
                >
                  {loading ? "Signing up..." : "Continue"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 3: OTP Verification */}
        {step === "otp" && (
          <>
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              Verify Your <span className="text-orange-500">Account</span>
            </h2>

            <div className="space-y-6">
              <p className="text-gray-600">We've sent an OTP to your email. Please enter it below.</p>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="border border-gray-300 w-full px-4 py-4 rounded-lg bg-gray-50 text-center text-3xl tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-400 font-semibold transition"
                />
              </div>

              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setStep("basic")}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-white cursor-pointer font-bold px-6 py-3 rounded-lg transition duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white cursor-pointer font-bold px-6 py-3 rounded-lg disabled:opacity-50 transition duration-300"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 4: Trainer Details Form */}
        {step === "details" && (
          <>
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              Complete Your <span className="text-orange-500">Profile</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={trainerDetailForm.whatsapp}
                  onChange={handleTrainerDetailChange}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {formErrors.whatsapp && <p className="text-red-500 text-xs mt-1">{formErrors.whatsapp}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={trainerDetailForm.gender}
                    onChange={handleTrainerDetailChange}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Age *</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={trainerDetailForm.age}
                    onChange={handleTrainerDetailChange}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                  {formErrors.age && <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Blood Group</label>
                  <select
                    name="blood_group"
                    value={trainerDetailForm.blood_group}
                    onChange={handleTrainerDetailChange}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Marital Status</label>
                  <select
                    name="marital_status"
                    value={trainerDetailForm.marital_status}
                    onChange={handleTrainerDetailChange}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">State *</label>
                  <select
                    name="state"
                    value={trainerDetailForm.state}
                    onChange={handleTrainerDetailChange}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  >
                    <option value="">Select State</option>
                    {Object.keys(statesAndCities).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">City *</label>
                  <select
                    name="city"
                    value={trainerDetailForm.city}
                    onChange={handleTrainerDetailChange}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
                    disabled={!trainerDetailForm.state}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g., Senior Developer"
                  value={trainerDetailForm.designation}
                  onChange={handleTrainerDetailChange}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Training Category *</label>
                <select
                  name="category_name"
                  value={trainerDetailForm.category_name}
                  onChange={handleTrainerDetailChange}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.category_name && <p className="text-red-500 text-xs mt-1">{formErrors.category_name}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g., B.Tech in CS"
                  value={trainerDetailForm.qualification}
                  onChange={handleTrainerDetailChange}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {formErrors.qualification && <p className="text-red-500 text-xs mt-1">{formErrors.qualification}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Years of Experience *</label>
                <input
                  type="text"
                  name="experience"
                  placeholder="e.g., 5 years"
                  value={trainerDetailForm.experience}
                  onChange={handleTrainerDetailChange}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {formErrors.experience && <p className="text-red-500 text-xs mt-1">{formErrors.experience}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">About You</label>
                <textarea
                  name="about"
                  placeholder="Tell us about yourself..."
                  value={trainerDetailForm.about}
                  onChange={handleTrainerDetailChange}
                  rows={3}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Aadhar Number <span className="text-orange-500">(12 digits)</span>
                  </label>
                  <input
                    type="text"
                    name="aadhar_number"
                    placeholder="e.g., 123456789012"
                    value={trainerDetailForm.aadhar_number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                      handleTrainerDetailChange({
                        target: { name: "aadhar_number", value },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    maxLength={12}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                  {formErrors.aadhar_number && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.aadhar_number}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">Format: 12 digits only</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    PAN Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pan_number"
                    placeholder="e.g., AAAAA1234A"
                    value={trainerDetailForm.pan_number.toUpperCase()}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      handleTrainerDetailChange({
                        target: { name: "pan_number", value },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    maxLength={10}
                    className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                  {formErrors.pan_number && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.pan_number}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">Format: AAAAA1234A</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">LinkedIn Profile URL</label>
                <input
                  type="url"
                  name="linkedin_url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={trainerDetailForm.linkedin_url}
                  onChange={handleTrainerDetailChange}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Availability</label>
                <select
                  name="availability"
                  value={trainerDetailForm.availability}
                  onChange={handleTrainerDetailChange}
                  className="border border-gray-300 w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                >
                  <option value="">Select</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setStep("otp")}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-white cursor-pointer font-bold px-6 py-3 rounded-lg transition duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitTrainerDetails}
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer font-bold px-6 py-3 rounded-lg disabled:opacity-50 transition duration-300"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 5: Application Status */}
        {step === "status" && applicationStatus && (
          <>
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-6">{getStatusIcon(applicationStatus.status)}</div>

              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Application <span className="text-orange-500">{getStatusText(applicationStatus.status)}</span>
              </h2>

              <div className={`w-full p-8 rounded-2xl border-2 text-center mb-8 ${getStatusColor(applicationStatus.status)}`}>
                <p className="text-lg font-semibold text-gray-800 mb-2">{applicationStatus.message}</p>
                <p className="text-sm text-gray-600">
                  {applicationStatus.status === "approved"
                    ? "Congratulations! You're now a verified trainer."
                    : applicationStatus.status === "rejected"
                    ? "Your application could not be approved. Please contact support for more details."
                    : applicationStatus.status === "under_process"
                    ? "We're reviewing your application. You'll receive an email soon."
                    : "Your application has been closed."}
                </p>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("userTokenTrainerAgregator");
                  window.location.href = "/";
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer font-bold px-8 py-3 rounded-lg transition duration-300"
              >
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignupCard;
