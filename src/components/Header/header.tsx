"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, CheckCircle, FileText, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useLogout from "@/hooks/useLogout";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role_id: number;
  name?: string;
  email?: string;
  exp?: number;
}

interface TrainerStats {
  pendingRequirements: number;
  acceptedRequirements: number;
  rejectedRequirements: number;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTrainerStatsOpen, setIsTrainerStatsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const router = useRouter();
  const [roleId, setRoleId] = useState<number | null>(null);
  const [tokenGet, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [trainerStats, setTrainerStats] = useState<TrainerStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const logout = useLogout();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem("userTokenTrainerAgregator");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const parsedRoleId = Number(decoded.role_id);
        setToken(token);
        setRoleId(parsedRoleId);
        setUserName(decoded.name || "User");
        setUserEmail(decoded.email || "");
        console.log("Decoded Token:", decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setToken(null);
        setRoleId(null);
      }
    }
  }, [mounted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (statsRef.current && !statsRef.current.contains(event.target as Node)) {
        setIsTrainerStatsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (href: string) =>
    `px-2 md:px-3 lg:px-4 py-1.5 rounded-full transition-all duration-200 text-xs md:text-sm lg:text-base ${
      pathname === href
        ? "border border-orange-300 text-orange-300 font-semibold"
        : "text-gray-700 hover:border hover:border-orange-300 hover:text-orange-300"
    }`;

  const getRoleLabel = () => {
    if (roleId === 1) return "Trainer";
    if (roleId === 2) return "Job Poster";
    return "User";
  };

  const fetchTrainerStats = async () => {
    try {
      setLoadingStats(true);
      const token = localStorage.getItem("userTokenTrainerAgregator");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!token || !baseUrl) {
        console.error("Missing token or base URL");
        return;
      }

      const endpoint = `${baseUrl}/requirement-trainer`;
      console.log("🚀 Fetching trainer stats from:", endpoint);

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trainer stats");
      }

      const data = await response.json();
      console.log("✅ Trainer stats response:", data);

      if (data.success && Array.isArray(data.data)) {
        const stats: TrainerStats = {
          pendingRequirements: data.data.filter(
            (req: any) => req.trainerStatus === "Pending"
          ).length,
          acceptedRequirements: data.data.filter(
            (req: any) => req.trainerStatus === "Accepted"
          ).length,
          rejectedRequirements: data.data.filter(
            (req: any) => req.trainerStatus === "Rejected"
          ).length,
        };

        setTrainerStats(stats);
      }
    } catch (error) {
      console.error("❌ Error fetching trainer stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleStatusClick = () => {
    if (!isTrainerStatsOpen) {
      fetchTrainerStats();
    }
    setIsTrainerStatsOpen(!isTrainerStatsOpen);
  };

  return (
    <nav className="bg-white fixed w-full z-50 top-0 border-b border-gray-200">
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo (Left) */}
          <Link href="/" className="flex-shrink-0 pl-3 sm:pl-5 lg:pl-10">
            <Image
              src="/properties/fulllogo_transparent_nobuffer.png"
              alt="Logo"
              width={160}
              height={60}
              className="h-10 sm:h-11 lg:h-12 w-auto"
            />
          </Link>

          {/* Navigation Links + Actions (Right) */}
          <div className="hidden md:flex items-center gap-1 md:gap-2 lg:gap-4 text-xs md:text-sm lg:text-base font-medium">
            {/* Navigation Links */}
            <Link href="/courses" className={linkClass("/courses")}>
              Our Courses
            </Link>
            <Link href="/about-us" className={linkClass("/about-us")}>
              About Us
            </Link>
            <Link href="/blogs" className={linkClass("/blogs")}>
              Blogs
            </Link>
            <Link 
              href="/contact" 
              className="px-2 md:px-3 lg:px-4 py-1.5 rounded-full border border-orange-300 text-orange-400 hover:bg-orange-50 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium"
            >
              Contact Us
            </Link>


            {/* Join Links - Only for non-logged users */}
            {mounted && !tokenGet && (
              <>
                <Link href="/login" className={linkClass("/join-trainer")}>
                  Join As Trainer
                </Link>
                <Link href="/login" className={linkClass("/find-trainer")}>
                  Join as Job Poster
                </Link>
              </>
            )}

            {/* Separator */}
            {mounted && tokenGet && <div className="w-px h-6 bg-gray-200 mx-1 lg:mx-2"></div>}

            {/* Trainer-Specific Buttons */}
            {mounted && tokenGet && roleId === 1 && (
              <>
                {/* Status Button */}
                {/* <div className="relative" ref={statsRef}>
                  <button
                    onClick={handleStatusClick}
                    className="flex items-center gap-1.5 px-2.5 md:px-3 lg:px-4 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-medium text-xs md:text-sm lg:text-base whitespace-nowrap"
                    title="View requirement status"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden lg:inline">Status</span>
                    <ChevronDown
                      className={`w-3 h-3 lg:w-4 lg:h-4 transition flex-shrink-0 ${
                        isTrainerStatsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  Status Dropdown
                  {isTrainerStatsOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-orange-100 z-50">
                      {loadingStats ? (
                        <div className="p-4 text-center">
                          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-xs text-gray-600 mt-2">
                            Loading stats...
                          </p>
                        </div>
                      ) : trainerStats ? (
                        <div className="p-4 space-y-3">
                          <h3 className="font-semibold text-gray-800 text-sm mb-3">
                            Your Requirement Status
                          </h3>

                          <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-gray-700">
                                Pending Responses
                              </span>
                              <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                {trainerStats.pendingRequirements}
                              </span>
                            </div>
                          </div>

                          <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-gray-700">
                                Accepted
                              </span>
                              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                {trainerStats.acceptedRequirements}
                              </span>
                            </div>
                          </div>

                          <div className="p-2 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-gray-700">
                                Rejected
                              </span>
                              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                {trainerStats.rejectedRequirements}
                              </span>
                            </div>
                          </div>

                          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-gray-700">
                                Total Requests
                              </span>
                              <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                {trainerStats.pendingRequirements +
                                  trainerStats.acceptedRequirements +
                                  trainerStats.rejectedRequirements}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-xs text-gray-600">
                            No data available
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div> */}

                {/* Requirements Button */}
                <button
                  onClick={() => router.push("/trainer/requirements")}
                  className="flex items-center gap-1.5 px-2.5 md:px-3 lg:px-4 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-lg transition font-medium text-xs md:text-sm lg:text-base whitespace-nowrap"
                  title="View all requirements"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden lg:inline">View Requirements</span>
                </button>
              </>
            )}

            {/* Post Requirement Button for Job Posters */}
            {mounted && tokenGet && roleId === 2 && (
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-semibold px-3 md:px-4 lg:px-5 py-1.5 rounded-lg shadow transition whitespace-nowrap"
                onClick={() => (window.location.href = "/requirements/create")}
              >
                + Post Requirement
              </button>
            )}

            {/* Profile Section */}
            {mounted && tokenGet ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1.5 px-2 md:px-2.5 lg:px-3 py-1.5 rounded-full border border-orange-300 hover:bg-orange-50 transition"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm flex-shrink-0">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 hidden lg:inline">
                    {userName}
                  </span>
                  <svg
                    className={`w-3 h-3 md:w-4 md:h-4 text-gray-600 transition-transform flex-shrink-0 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {getRoleLabel()}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                      >
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          View Profile
                        </span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition w-full text-left"
                      >
                        <svg
                          className="w-4 h-4 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="text-sm text-red-600 font-medium">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 md:px-3.5 lg:px-4 py-1.5 text-xs md:text-sm lg:text-base rounded-full border border-orange-300 hover:bg-orange-50 transition whitespace-nowrap"
              >
                Sign In ↗
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col px-4 sm:px-6 py-4 gap-3 sm:gap-4 text-sm sm:text-base">
          <Link
            href="/about-us"
            onClick={toggleMenu}
            className={linkClass("/about-us")}
          >
            About Us
          </Link>
          <Link
            href="/courses"
            onClick={toggleMenu}
            className={linkClass("/courses")}
          >
            Courses
          </Link>
          <Link
            href="/blogs"
            onClick={toggleMenu}
            className={linkClass("/blogs")}
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className={linkClass("/contact")}
          >
            Contact Us
          </Link>

          {/* Join Links for non-logged users (Mobile) */}
          {mounted && !tokenGet && (
            <>
              <Link
                href="/login"
                onClick={toggleMenu}
                className={linkClass("/join-trainer")}
              >
                Join As Trainer
              </Link>
              <Link
                href="/login"
                onClick={toggleMenu}
                className={linkClass("/find-trainer")}
              >
                Join as Job Poster
              </Link>
            </>
          )}

          {/* Trainer-Specific Buttons (Mobile) */}
          {mounted && tokenGet && roleId === 1 && (
            <>
              {/* <button
                onClick={() => {
                  handleStatusClick();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-medium w-full"
              >
                <CheckCircle className="w-4 h-4" />
                Status
              </button> */}
              <button
                onClick={() => {
                  router.push("/trainer/requirements");
                  toggleMenu();
                }}
                className="flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-lg transition font-medium w-full"
              >
                <FileText className="w-4 h-4" />
                Requirements
              </button>
            </>
          )}

          {/* Post Requirement Button for Job Posters (Mobile) */}
          {mounted && tokenGet && roleId === 2 && (
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow mt-2 transition"
              onClick={() => {
                window.location.href = "/requirements/create";
                toggleMenu();
              }}
            >
              + Post Requirement
            </button>
          )}

          {/* Profile Link (Mobile) */}
          {mounted && tokenGet && (
            <Link
              href="/profile"
              onClick={toggleMenu}
              className={linkClass("/profile")}
            >
              Profile
            </Link>
          )}

          {/* Logout/Sign In (Mobile) */}
          {mounted && (
            <>
              {tokenGet ? (
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full px-4 py-2 sm:py-2.5 rounded-full border border-orange-300 hover:bg-orange-50 transition mt-2"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="w-full px-4 py-2 sm:py-2.5 rounded-full border border-orange-300 hover:bg-orange-50 transition text-center mt-2 block"
                >
                  Sign In ↗
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
