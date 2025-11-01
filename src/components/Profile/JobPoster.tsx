"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  Edit3,
  Check,
  X,
  FileText,
  CheckCircle,
  Users,
  Award,
  MapPin,
  Calendar,
  Briefcase,
  Eye,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface DecodedToken {
  id: string;
  name?: string;
  email?: string;
}

interface JobPosterProfileData {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  companyWebsite?: string;
  industry?: string;
  companySize?: string;
  city?: string;
  state?: string;
  designation?: string;
  bio?: string;
  linkedinProfile?: string;
  createdAt?: string;
  stats?: {
    jobsPosted: number;
    activeJobs: number;
    applicants: number;
    hired: number;
  };
}

const JobPosterProfile = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [profile, setProfile] = useState<JobPosterProfileData>({
    name: "",
    email: "",
    stats: {
      jobsPosted: 0,
      activeJobs: 0,
      applicants: 0,
      hired: 0,
    },
  });

  const [editedProfile, setEditedProfile] = useState<JobPosterProfileData>(profile);

  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("userTokenTrainerAgregator");
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!token || !baseUrl) {
          console.error("Missing token or base URL");
          return;
        }

        const response = await fetch(`${baseUrl}/user-profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log("✅ Profile fetched:", data);

        if (data.success && data.data) {
          const profileData = data.data;
          setProfile(profileData);
          setEditedProfile(profileData);
        } else {
          setError("Failed to load profile data");
        }
      } catch (err: any) {
        console.error("❌ Error fetching profile:", err);
        setError(err.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = async () => {
    if (isEditing) {
      // Save profile
      await saveProfile();
    }
    setIsEditing(!isEditing);
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("userTokenTrainerAgregator");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!token || !baseUrl) {
        console.error("Missing token or base URL");
        setError("Configuration error");
        return;
      }

      // Prepare data for backend
      const updatedData = {
        name: editedProfile.name,
        email: editedProfile.email,
        phone: editedProfile.phone,
        companyName: editedProfile.companyName,
        companyWebsite: editedProfile.companyWebsite,
        industry: editedProfile.industry,
        companySize: editedProfile.companySize,
        city: editedProfile.city,
        state: editedProfile.state,
        designation: editedProfile.designation,
        bio: editedProfile.bio,
        linkedinProfile: editedProfile.linkedinProfile,
      };

      console.log("📤 Updating profile:", updatedData);

      const response = await fetch(`${baseUrl}/user-profile-update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log("✅ Profile updated:", data);

      if (data.success) {
        setProfile(editedProfile);
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err: any) {
      console.error("❌ Error saving profile:", err);
      setError(err.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof JobPosterProfileData, value: string) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setError("");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Success Message */}
      {success && (
        <div className="fixed top-4 left-4 right-4 z-50 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-700 text-sm sm:text-base">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 left-4 right-4 z-50 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm sm:text-base">{error}</p>
        </div>
      )}

      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 sm:pt-10 pb-24 sm:pb-28 md:pb-32 rounded-b-3xl shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Avatar - Just Initial */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {profile.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>

            {/* User Info */}
            <div className="flex-1 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{profile.name}</h1>
                <span className="px-3 py-1 bg-orange-700/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium w-fit">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                  Job Poster
                </span>
              </div>
              <p className="text-white/90 text-sm sm:text-base mb-2">{profile.email}</p>
              {profile.city && profile.state && (
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">
                    {profile.city}, {profile.state}
                  </span>
                </div>
              )}
            </div>
          </div>

          {profile.bio && (
            <p className="mt-4 sm:mt-6 text-white/90 text-sm sm:text-base leading-relaxed max-w-3xl">
              {profile.bio}
            </p>
          )}

          {profile.createdAt && (
            <div className="flex items-center gap-2 mt-3 sm:mt-4">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm text-white/90">Joined {formatDate(profile.createdAt)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 -mt-20 sm:-mt-24 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Stats + Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Stats Card */}
            {profile.stats && (
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-orange-100">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  Recruitment Statistics
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  <div className="flex flex-col items-center p-3 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-md">
                      <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {profile.stats.jobsPosted || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center">Jobs Posted</p>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-md">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {profile.stats.activeJobs || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center">Active Jobs</p>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-md">
                      <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {profile.stats.applicants || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center">Applicants</p>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-md">
                      <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {profile.stats.hired || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center">Hired</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Details - Editable Sections */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-orange-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  Profile Details
                </h3>
                {!isEditing ? (
                  <button
                    onClick={handleEditToggle}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition flex items-center gap-2 shadow-md text-sm sm:text-base w-full sm:w-auto justify-center"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 justify-center text-sm sm:text-base disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleEditToggle}
                      disabled={saving}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition flex items-center gap-2 shadow-md justify-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Account Information - READ ONLY */}
              <div className="mb-6 pb-6 border-b border-orange-100">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                    Account Information
                  </h3>
                  <span className="text-xs text-gray-500">(Cannot Edit)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Name
                    </label>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-lg text-gray-800 text-sm sm:text-base">
                      {profile.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Email
                    </label>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-lg text-gray-800 text-sm sm:text-base truncate">
                      {profile.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Phone
                    </label>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-lg text-gray-800 text-sm sm:text-base">
                      {profile.phone || "Not provided"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details - EDITABLE */}
              <div className="mb-6 pb-6 border-b border-orange-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Company Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.companyName || ""}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Enter company name"
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base">
                        {profile.companyName || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Company Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedProfile.companyWebsite || ""}
                        onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="https://example.com"
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base truncate">
                        {profile.companyWebsite || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Industry
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.industry || ""}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="e.g., IT, Education"
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base">
                        {profile.industry || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Company Size
                    </label>
                    {isEditing ? (
                      <select
                        value={editedProfile.companySize || ""}
                        onChange={(e) => handleInputChange("companySize", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Select size</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="500+">500+</option>
                      </select>
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base">
                        {profile.companySize || "Not specified"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Location - EDITABLE */}
              <div className="mb-6 pb-6 border-b border-orange-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">City</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.city || ""}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Enter city"
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base">
                        {profile.city || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">State</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.state || ""}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Enter state"
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base">
                        {profile.state || "Not specified"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details - EDITABLE */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Personal Details</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Your Designation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.designation || ""}
                        onChange={(e) => handleInputChange("designation", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="e.g., HR Manager, CEO"
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base">
                        {profile.designation || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={editedProfile.bio || ""}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Tell us about your company..."
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base">
                        {profile.bio || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      LinkedIn Profile
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedProfile.linkedinProfile || ""}
                        onChange={(e) => handleInputChange("linkedinProfile", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="LinkedIn profile URL"
                      />
                    ) : (
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 rounded-lg text-gray-800 border border-orange-100 text-sm sm:text-base truncate">
                        {profile.linkedinProfile || "Not specified"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-orange-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/requirements/create")}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition font-medium shadow-md flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4" />
                  Post Requirement
                </button>
                <button
                  onClick={() => router.push("/requirements")}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition font-medium shadow-md flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Eye className="w-4 h-4" />
                  View Requirements
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-orange-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                Recent Activity
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Profile updated
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Account active
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Email verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosterProfile;
