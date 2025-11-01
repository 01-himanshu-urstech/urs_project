"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  Plus,
  Search,
  Loader2,
  FileText,
  Eye,
  DollarSign,
  Calendar,
  Clock,
  AlertCircle,
  ExternalLink,
  Edit3,
  Trash2,
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
  jobPosterId: string;
}

const RequirementsList = () => {
  const router = useRouter();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [filteredRequirements, setFilteredRequirements] = useState<
    Requirement[]
  >([]);
  const [activeTab, setActiveTab] = useState<
    "All" | "Submitted" | "Sent to Trainers" | "In Progress" | "Completed" | "Closed"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [roleId, setRoleId] = useState<number | null>(null);

  // ✅ Check authentication and fetch requirements
  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
      setRoleId(Number(decoded.role_id));
      fetchRequirements(decoded.id);
    } catch (error) {
      console.error("Invalid token:", error);
      router.push("/login");
    }
  }, [router]);

  // ✅ Fetch requirements from backend
  const fetchRequirements = async (userId: string) => {
    try {
      const token = localStorage.getItem("userTokenTrainerAgregator");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!token) {
        console.error("❌ No token found");
        throw new Error("Authentication token missing");
      }

      if (!baseUrl) {
        console.error("❌ NEXT_PUBLIC_BASE_URL not set");
        throw new Error("Base URL not configured");
      }

      const endpoint = `${baseUrl}/requirement-my`;
      console.log("🚀 Fetching from:", endpoint);

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📊 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ HTTP Error:", response.status, errorText);
        throw new Error(`Failed to fetch requirements: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Raw API response:", data);

      // ✅ Handle response correctly
      if (data.success && Array.isArray(data.data)) {
        if (data.data.length > 0) {
          console.log("✅ Found", data.data.length, "requirements");
          setRequirements(data.data);
          setFilteredRequirements(data.data);
        } else {
          console.warn("⚠️ No requirements found");
          setRequirements([]);
          setFilteredRequirements([]);
        }
      } else {
        console.warn("⚠️ Unexpected response format", data);
        setRequirements([]);
        setFilteredRequirements([]);
      }
    } catch (error) {
      console.error("❌ Error fetching requirements:", error);
      setRequirements([]);
      setFilteredRequirements([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter requirements based on tab and search
  const filterRequirements = useCallback(() => {
    let filtered = [...requirements];

    // Filter by status tab
    if (activeTab !== "All") {
      filtered = filtered.filter((req) => req.status === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.title.toLowerCase().includes(query) ||
          req.category.toLowerCase().includes(query) ||
          req.description.toLowerCase().includes(query)
      );
    }

    setFilteredRequirements(filtered);
  }, [requirements, activeTab, searchQuery]);

  useEffect(() => {
    filterRequirements();
  }, [activeTab, searchQuery, filterRequirements]);

  // ✅ Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Submitted: "bg-gradient-to-r from-blue-400 to-blue-500",
      "Sent to Trainers": "bg-gradient-to-r from-yellow-400 to-yellow-500",
      "In Progress": "bg-gradient-to-r from-green-400 to-green-500",
      Completed: "bg-gradient-to-r from-purple-400 to-purple-500",
      Closed: "bg-gradient-to-r from-gray-400 to-gray-500",
    };
    return colors[status] || "bg-gradient-to-r from-gray-400 to-gray-500";
  };

  // ✅ Get urgency color
  const getUrgencyColor = (urgency: string) => {
    const colors: Record<string, string> = {
      Low: "text-green-600 bg-green-50 border-green-200",
      Medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
      High: "text-orange-600 bg-orange-50 border-orange-200",
      Urgent: "text-red-600 bg-red-50 border-red-200",
    };
    return colors[urgency] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
        <div className="text-center px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto">
            <Loader2 className="w-full h-full text-orange-500 animate-spin" />
          </div>
          <h3 className="mt-6 text-lg sm:text-xl font-semibold text-gray-800">
            Loading Requirements
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Please wait while we fetch your requirements...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-5 shadow-lg fixed top-16 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h3 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
            My Requirements
          </h3>
          {/* ✅ Only show create button for Job Posters (roleId 2) */}
          {roleId === 2 && (
            <button
              onClick={() => router.push("/requirements/create")}
              className="bg-white text-orange-600 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold hover:bg-orange-50 transition flex items-center gap-2 shadow-md text-sm sm:text-base mt-4"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 " />
              Add Requirement
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 mt-10">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6 border border-orange-100">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
          {[
            "All",
            "Submitted",
            "Sent to Trainers",
            "In Progress",
            "Completed",
            "Closed",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab as
                    | "All"
                    | "Submitted"
                    | "Sent to Trainers"
                    | "In Progress"
                    | "Completed"
                    | "Closed"
                )
              }
              className={`px-3 sm:px-4 py-2 rounded-full font-medium transition text-xs sm:text-sm ${
                activeTab === tab
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Requirements List */}
        {filteredRequirements.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center border border-orange-100">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              No requirements found
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              {searchQuery
                ? "Try adjusting your search criteria"
                : roleId === 2
                ? "Start by posting your first requirement"
                : "No requirements assigned to you yet"}
            </p>
            {roleId === 2 && !searchQuery && (
              <button
                onClick={() => router.push("/requirements/create")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 sm:py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-lg flex items-center gap-2 mx-auto text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                Post Requirement
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredRequirements.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl p-4 sm:p-6 transition border border-orange-100"
              >
                {/* Title and Status */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 line-clamp-2">
                      {req.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                      {req.category}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1.5 ${getStatusColor(
                      req.status
                    )} text-white rounded-full text-xs sm:text-sm font-medium flex-shrink-0 shadow-md`}
                  >
                    {req.status}
                  </span>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1 bg-orange-50 px-2 sm:px-3 py-1 rounded-lg border border-orange-100">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                    {req.mode}
                  </div>
                  {req.budget && req.budget !== "Negotiable" && (
                    <div className="flex items-center gap-1 bg-orange-50 px-2 sm:px-3 py-1 rounded-lg border border-orange-100">
                      <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                      ₹{req.budget}
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-orange-50 px-2 sm:px-3 py-1 rounded-lg border border-orange-100">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                    {req.duration}
                  </div>
                </div>

                {/* Details Box */}
                <div className="bg-gradient-to-r from-orange-50 to-white rounded-lg p-3 sm:p-4 mb-4 border border-orange-100">
                  <h4 className="font-semibold text-gray-700 mb-2 text-xs sm:text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    Requirements
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      Duration: {req.duration}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      Batch Size: {req.batchSize} participants
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium border ${getUrgencyColor(
                          req.urgency
                        )}`}
                      >
                        {req.urgency}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Description Preview */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {req.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Posted:{" "}
                    {new Date(req.createdAt).toLocaleDateString("en-GB")}
                  </div>

                  {/* ✅ Action Buttons - Only for Job Poster who owns the requirement */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/requirements/${req._id}`)}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </button>

                    {/* ✅ Edit & Delete for requirement owner */}
                    {roleId === 2 && req.jobPosterId === userId && (
                      <>
                        <button
                          onClick={() =>
                            router.push(`/requirements/${req._id}?edit=true`)
                          }
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-2 rounded-lg transition text-xs sm:text-sm"
                          title="Edit requirement"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/requirements/${req._id}?delete=true`
                            )
                          }
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-2 rounded-lg transition text-xs sm:text-sm"
                          title="Delete requirement"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequirementsList;
