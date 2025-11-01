"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Plus,
} from "lucide-react";

interface DecodedToken {
  id: string;
  role_id: number;
}

interface FormData {
  title: string;
  category: string;
  mode: "Online" | "Offline" | "Hybrid";
  duration: string;
  startDate: string;
  endDate: string;
  batchSize: string;
  description: string;
  urgency: "Low" | "Medium" | "High" | "Urgent";
  budget: string;
}

const CreateRequirement = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    mode: "Online",
    duration: "",
    startDate: "",
    endDate: "",
    batchSize: "",
    description: "",
    urgency: "Medium",
    budget: "Negotiable",
  });

  // ✅ Check authentication and role
  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const parsedRoleId = Number(decoded.role_id);

      // Only Job Posters (roleId 2) can create requirements
      if (parsedRoleId !== 2) {
        console.error("❌ Only Job Posters can create requirements");
        router.push("/");
        return;
      }

      setRoleId(parsedRoleId);
      setLoading(false);
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/login");
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const validateForm = (): boolean => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.mode ||
      !formData.duration ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.batchSize ||
      !formData.description
    ) {
      setError("All required fields must be filled");
      return false;
    }

    if (formData.title.trim().length < 10) {
      setError("Title must be at least 10 characters");
      return false;
    }

    if (formData.description.trim().length < 50) {
      setError("Description must be at least 50 characters");
      return false;
    }

    if (isNaN(parseInt(formData.batchSize))) {
      setError("Batch size must be a valid number");
      return false;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate <= startDate) {
      setError("End date must be after start date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("userTokenTrainerAgregator");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!token) {
        console.error("❌ No token found");
        router.push("/login");
        return;
      }

      if (!baseUrl) {
        console.error("❌ NEXT_PUBLIC_BASE_URL not configured");
        setError("Configuration error. Please contact support.");
        setSubmitting(false);
        return;
      }

      // ✅ Prepare data exactly as backend expects
      const requirementData = {
        title: formData.title.trim(),
        category: formData.category,
        mode: formData.mode,
        duration: formData.duration,
        startDate: formData.startDate, // Backend converts this to Date
        endDate: formData.endDate, // Backend converts this to Date
        batchSize: parseInt(formData.batchSize, 10),
        description: formData.description.trim(),
        urgency: formData.urgency,
        budget: formData.budget.trim() || "Negotiable",
      };
      console.log("📤 Submitting requirement data:", requirementData);
      const endpoint = `${baseUrl}/requirement-create`;
      console.log("🚀 Posting to:", endpoint);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requirementData),
      });

      console.log("📊 Response status:", response.status);
      const data = await response.json();
      console.log("✅ Response data:", data);
      if (!response.ok) {
        console.error("❌ Server error:", data);
        setError(
          data.message ||
            data.error?.message ||
            "Failed to create requirement"
        );
        setSubmitting(false);
        return;
      }

      if (data.success) {
        setSuccess("Requirement posted successfully! Redirecting...");
        console.log("✅ Requirement created:", data.data);
        
        // Redirect to requirements list after 2 seconds
        setTimeout(() => {
          router.push("/requirements");
        }, 2000);
      } else {
        setError(data.message || "Failed to create requirement");
        setSubmitting(false);
      }
    } catch (error: any) {
      console.error("❌ Error creating requirement:", error);
      setError(
        error.message || "Failed to create requirement. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-6 sm:py-8 shadow-lg fixed top-16 left-0 right-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="hover:bg-orange-700 p-2 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h4 className="text-2xl sm:text-3xl font-bold">
            Post New Training Requirement
          </h4>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 mt-20">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-orange-100">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-orange-500" />
                Basic Information
              </h2>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Training Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Advanced React Development for Beginners"
                    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    minLength={10}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.title.length}/10 characters minimum
                  </p>
                </div>

                {/* Category & Mode - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">-- Select category --</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">
                        Mobile Development
                      </option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Mode */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Training Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Duration & Dates */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📅 Duration & Dates
              </h2>
              <div className="space-y-4">
                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">-- Select duration --</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>

                {/* Start & End Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Batch & Budget */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                👥 Batch Size & Budget
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Batch Size */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Batch Size (Participants){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="batchSize"
                    value={formData.batchSize}
                    onChange={handleChange}
                    placeholder="e.g., 20"
                    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    min="1"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget (Optional)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., 50000 or Negotiable"
                    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📝 Description
              </h2>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about your training requirements, learning objectives, target audience, etc."
                className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 min-h-[140px] resize-none"
                minLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/50 characters minimum
              </p>
            </div>

            {/* Section 5: Urgency Level */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                ⚡ Urgency Level
              </h2>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium (Recommended)</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Post Requirement
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-orange-200 text-gray-700 rounded-lg font-semibold hover:bg-orange-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequirement;
