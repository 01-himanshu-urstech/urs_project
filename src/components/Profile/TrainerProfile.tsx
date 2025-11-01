"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

    interface DecodedToken {
    id: string;
    name?: string;
    email?: string;
    }

    interface TrainerProfileData {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    bio?: string;
    avatar?: string;
    joinedDate: string;
    stats: {
        trainings: number;
        completed: number;
        hours: number;
        certificates: number;
    };
    }

    const TrainerProfile = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<TrainerProfileData>({
        name: "Loading...",
        email: "",
        joinedDate: "",
        stats: { trainings: 0, completed: 0, hours: 0, certificates: 0 },
    });

    useEffect(() => {
        const token = localStorage.getItem("userTokenTrainerAgregator");
        if (token) {
        try {
            const decoded: DecodedToken = jwtDecode(token);
            
            // TODO: Fetch trainer profile from API
            // const response = await axios.get(`/api/trainer/profile/${decoded.id}`);
            
            // Mock data for now
            setProfile({
            name: decoded.name || "Trainer Name",
            email: decoded.email || "trainer@example.com",
            phone: "+91 98765 43210",
            location: "Mumbai, Maharashtra",
            bio: "Experienced trainer specializing in web development and mobile app development.",
            avatar: "/avatar-placeholder.png",
            joinedDate: "15/6/2025",
            stats: {
                trainings: 12,
                completed: 8,
                hours: 156,
                certificates: 5,
            },
            });
        } catch (error) {
            console.error("Error loading profile:", error);
        }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-12 lg:px-20 pt-10 pb-32 rounded-b-3xl">
            <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center overflow-hidden">
                    {profile.avatar ? (
                    <Image
                        src={profile.avatar}
                        alt={profile.name}
                        width={112}
                        height={112}
                        className="object-cover"
                    />
                    ) : (
                    <span className="text-5xl font-bold text-white">
                        {profile.name.charAt(0).toUpperCase()}
                    </span>
                    )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
                </div>

                {/* User Info */}
                <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-3xl md:text-4xl font-bold">{profile.name}</h4>
                    <span className="px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-sm font-medium">
                    Trainer
                    </span>
                </div>
                <p className="text-white/90 text-base mb-2">{profile.email}</p>
                <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{profile.location}</span>
                </div>
                </div>
            </div>

            {/* Bio */}
            <p className="mt-6 text-white/90 text-base leading-relaxed max-w-3xl">{profile.bio}</p>

            {/* Joined Date */}
            <div className="flex items-center gap-2 mt-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-white/90">Joined {profile.joinedDate}</span>
            </div>
            </div>
        </div>

        {/* Stats and Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 -mt-24 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Training Stats */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Training Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Trainings Conducted */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{profile.stats.trainings}</p>
                    <p className="text-sm text-gray-600 mt-1">Trainings</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{profile.stats.completed}</p>
                    <p className="text-sm text-gray-600 mt-1">Completed</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{profile.stats.hours}</p>
                    <p className="text-sm text-gray-600 mt-1">Hours</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{profile.stats.certificates}</p>
                    <p className="text-sm text-gray-600 mt-1">Certificates</p>
                </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium">
                    View Job Posts
                    </button>
                    <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
                    My Applications
                    </button>
                    <button
                    onClick={() => router.push("/profile/edit")}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                    Edit Profile
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default TrainerProfile;
