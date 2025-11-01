"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Loader2, AlertCircle, Bug } from "lucide-react";
import TrainerProfile from "@/components/Profile/TrainerProfile";
import JobPosterProfile from "@/components/Profile/JobPoster";

interface DecodedToken {
  id: string;
  role_id: number | string;
  name?: string;
  email?: string;
  exp?: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [roleId, setRoleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadProfile = async () => {
      const token = localStorage.getItem("userTokenTrainerAgregator");
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const parsedRoleId = Number(decoded.role_id);
        
        setRoleId(parsedRoleId);
        setLoading(false);
      } catch (err) {
        console.error("Token decode error:", err);
        router.replace("/login");
      }
    };

    loadProfile();
  }, [router, mounted]);

  // Loading state
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="text-center px-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto">
              <Loader2 className="w-full h-full text-orange-500 animate-spin" />
            </div>
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto border-4 border-orange-200 rounded-full animate-pulse"></div>
          </div>
          <h3 className="mt-6 text-lg sm:text-xl font-semibold text-gray-800">
            Loading Profile
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Please wait while we fetch your information...
          </p>
        </div>
      </div>
    );
  }

  // Invalid role state
  if (roleId !== 1 && roleId !== 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-6 sm:p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>

            {/* Error Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-center text-red-600 mb-4">
              Invalid Role Detected
            </h3>

            {/* Error Details */}
            <div className="bg-red-50 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Role ID:</span>
                <span className="font-semibold text-gray-800">{roleId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Type:</span>
                <span className="font-semibold text-gray-800">{typeof roleId}</span>
              </div>
              <div className="border-t border-red-200 pt-2 mt-2">
                <p className="text-xs text-gray-600 text-center">
                  Expected: <strong className="text-orange-600">1 (Trainer)</strong> or{" "}
                  <strong className="text-orange-600">2 (Job Poster)</strong>
                </p>
              </div>
            </div>

            {/* Debug Button */}
            <button
              onClick={() => {
                const token = localStorage.getItem("userTokenTrainerAgregator");
                console.log("🔍 Debug Info:");
                console.log("Token:", token);
                if (token) {
                  const decoded = jwtDecode(token);
                  console.log("Decoded:", decoded);
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Bug className="w-5 h-5" />
              <span>Debug in Console</span>
            </button>

            {/* Back Button */}
            <button
              onClick={() => router.push("/")}
              className="w-full mt-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render appropriate profile
  return (
    <div className="mt-16 sm:mt-20">
      {roleId === 1 ? <TrainerProfile /> : <JobPosterProfile />}
    </div>
  );
}
