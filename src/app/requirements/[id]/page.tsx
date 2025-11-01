"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  ArrowLeft,
  Loader2,
  Calendar,
  AlertCircle,
  Edit3,
  Trash2,
  Save,
  X,
  FileText,
  DollarSign,
  Users,
  Clock,
  Tag,
  CheckCircle,
} from "lucide-react";

interface DecodedToken {
  id: string;
  role_id: number;
}

interface Requirement {
  _id: string;
  title: string;
  category: string;
  mode: string;
  budget?: string;
  duration: string;
  startDate: string;
  endDate: string;
  batchSize: number;
  urgency: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  jobPosterId: string;
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

const RequirementDetail = () => {
  const router = useRouter();
  const params = useParams();
  const requirementId = params.id as string;

  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [isOwner, setIsOwner] = useState(false);

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
    budget: "",
  });

  // ✅ Fetch requirement details
  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
      fetchRequirement(decoded.id, token);
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/login");
    }
  }, [requirementId]);

  const fetchRequirement = async (userId: string, token: string) => {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!baseUrl) {
        throw new Error("Base URL not configured");
      }

      // Fetch all user's requirements
      const endpoint = `${baseUrl}/requirement-my`;
      console.log("🚀 Fetching requirements from:", endpoint);

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch requirements");
      }

      const data = await response.json();
      console.log("✅ Requirements response:", data);

      if (data.success && Array.isArray(data.data)) {
        // Find the specific requirement by ID
        const req = data.data.find((r: Requirement) => r._id === requirementId);

        if (req) {
          setRequirement(req);
          setFormData({
            title: req.title,
            category: req.category,
            mode: req.mode as "Online" | "Offline" | "Hybrid",
            duration: req.duration,
            startDate: req.startDate.split("T")[0], // Format date for input
            endDate: req.endDate.split("T")[0], // Format date for input
            batchSize: req.batchSize.toString(),
            description: req.description,
            urgency: req.urgency as "Low" | "Medium" | "High" | "Urgent",
            budget: req.budget || "",
          });

          // Check if current user is the owner
          setIsOwner(req.jobPosterId === userId);
        } else {
          setError("Requirement not found");
        }
      } else {
        setError("Failed to load requirement");
      }
    } catch (err: any) {
      console.error("❌ Error fetching requirement:", err);
      setError(err.message || "Failed to load requirement");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle form changes
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
  };

  // ✅ Validate form
  const validateForm = (): boolean => {
    if (
      !formData.title ||
      !formData.category ||
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

  // ✅ Handle update requirement
  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }

    setUpdating(true);
    setError("");

    try {
      const token = localStorage.getItem("userTokenTrainerAgregator");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!token || !baseUrl) {
        throw new Error("Missing authentication");
      }

      const updateData = {
        title: formData.title.trim(),
        category: formData.category,
        mode: formData.mode,
        duration: formData.duration,
        startDate: formData.startDate,
        endDate: formData.endDate,
        batchSize: parseInt(formData.batchSize, 10),
        description: formData.description.trim(),
        urgency: formData.urgency,
        budget: formData.budget.trim() || "Negotiable",
      };

      console.log("📤 Updating requirement:", updateData);

      // Note: Your backend doesn't have an update endpoint yet
      // This is prepared for when you add PUT /requirement/:id endpoint
      const endpoint = `${baseUrl}/requirement/${requirementId}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update requirement");
        setUpdating(false);
        return;
      }

      if (data.success) {
        setRequirement(data.data);
        setIsEditing(false);
        alert("Requirement updated successfully!");
      } else {
        setError(data.message || "Failed to update requirement");
        setUpdating(false);
      }
    } catch (err: any) {
      console.error("❌ Error updating requirement:", err);
      setError(err.message || "Failed to update requirement");
      setUpdating(false);
    }
  };

  // ✅ Handle delete requirement
  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    try {
      const token = localStorage.getItem("userTokenTrainerAgregator");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!token || !baseUrl) {
        throw new Error("Missing authentication");
      }

      console.log("🗑️ Deleting requirement:", requirementId);

      // Note: Your backend doesn't have a delete endpoint yet
      // This is prepared for when you add DELETE /requirement/:id endpoint
      const endpoint = `${baseUrl}/requirement/${requirementId}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to delete requirement");
        setDeleting(false);
        setShowDeleteModal(false);
        return;
      }

      if (data.success) {
        alert("Requirement deleted successfully!");
        router.push("/requirements");
      } else {
        setError(data.message || "Failed to delete requirement");
        setDeleting(false);
        setShowDeleteModal(false);
      }
    } catch (err: any) {
      console.error("❌ Error deleting requirement:", err);
      setError(err.message || "Failed to delete requirement");
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      "Submitted": { bg: "bg-blue-100", text: "text-blue-800" },
      "Sent to Trainers": { bg: "bg-yellow-100", text: "text-yellow-800" },
      "In Progress": { bg: "bg-green-100", text: "text-green-800" },
      "Completed": { bg: "bg-purple-100", text: "text-purple-800" },
      "Closed": { bg: "bg-gray-100", text: "text-gray-800" },
    };
    const badge = badges[status] || badges["Submitted"];
    return `${badge.bg} ${badge.text}`;
  };

  const getUrgencyColor = (urgency: string) => {
    const colors: Record<string, string> = {
      "Low": "text-green-700 bg-green-50",
      "Medium": "text-yellow-700 bg-yellow-50",
      "High": "text-orange-700 bg-orange-50",
      "Urgent": "text-red-700 bg-red-50",
    };
    return colors[urgency] || "text-gray-700 bg-gray-50";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading requirement details...</p>
        </div>
      </div>
    );
  }

  if (error && !requirement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!requirement) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-6 sm:py-8 shadow-lg fixed top-16 left-0 right-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="hover:bg-orange-700 p-2 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold flex-1">
            {isEditing ? "Edit Requirement" : "Requirement Details"}
          </h1>
          {!isEditing && isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition font-medium"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 mt-20">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-orange-100">
          {!isEditing ? (
            <>
              {/* Title and Status */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {requirement.title}
                  </h2>
                  <span
                    className={`px-4 py-2 rounded-full font-semibold text-sm border w-fit ${getStatusBadge(
                      requirement.status
                    )}`}
                  >
                    {requirement.status}
                  </span>
                </div>
                <p className="text-gray-600 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-500" />
                  {requirement.category}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-sm text-gray-600 mb-1">Training Mode</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    {requirement.mode}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    {requirement.duration}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-sm text-gray-600 mb-1">Batch Size</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    {requirement.batchSize} participants
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-sm text-gray-600 mb-1">Budget</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-orange-500" />
                    {requirement.budget || "Negotiable"}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </p>
                  <p className="font-semibold text-gray-800">
                    {new Date(requirement.startDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </p>
                  <p className="font-semibold text-gray-800">
                    {new Date(requirement.endDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>

              {/* Urgency */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-2">Urgency Level</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(
                    requirement.urgency
                  )}`}
                >
                  {requirement.urgency} Priority
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Description
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {requirement.description}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
                <p>
                  Posted on:{" "}
                  <span className="font-medium">
                    {new Date(requirement.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </p>
                {requirement.updatedAt && (
                  <p>
                    Last updated:{" "}
                    <span className="font-medium">
                      {new Date(requirement.updatedAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Edit Form */}
              <form className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>

                {/* Category & Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mode <span className="text-red-500">*</span>
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

                {/* Duration & Dates */}
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
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>

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

                {/* Batch Size & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Batch Size <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="batchSize"
                      value={formData.batchSize}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 min-h-[140px] resize-none"
                    minLength={50}
                  />
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urgency
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={updating}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-orange-200 text-gray-700 rounded-lg font-semibold hover:bg-orange-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Delete Requirement?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this requirement? This action
              cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementDetail;
