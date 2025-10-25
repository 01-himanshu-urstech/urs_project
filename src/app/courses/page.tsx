"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";

const allCourses = [
  {
    title: "Generative AI Training Program - Live",
    level: "Beginner to Advanced",
    interested: "17k+ interested Geeks",
    rating: 4.8,
    seats: "2 seats left",
    tag: "LIVE COURSE",
    category: "AI & Data Science",
    img: "/Courses/genai.png",
  },
  {
    title: "Tech Interview 101 DSA to System Design - Live",
    level: "Beginner to Advanced",
    interested: "368k+ interested Geeks",
    rating: 4.9,
    tag: "LIVE COURSE",
    category: "DSA / Placements",
    img: "/Courses/interview.png",
  },
  {
    title: "Java Backend Development - Live",
    level: "Intermediate and Advanced",
    interested: "362k+ interested Geeks",
    rating: 4.6,
    tag: "LIVE COURSE",
    category: "Development",
    img: "/Courses/backend.png",
  },
  {
    title: "Complete Machine Learning and Data Science - Live",
    level: "Beginner to Advanced",
    interested: "531k+ interested Geeks",
    rating: 4.7,
    tag: "LIVE COURSE",
    category: "AI & Data Science",
    img: "/Courses/ml.png",
  },
  {
    title: "Java Backend Development - Live",
    level: "Intermediate and Advanced",
    interested: "362k+ interested Geeks",
    rating: 4.6,
    tag: "LIVE COURSE",
    category: "Development",
    img: "/Courses/backend.png",
  },
  {
    title: "Generative AI Training Program - Live",
    level: "Beginner to Advanced",
    interested: "17k+ interested Geeks",
    rating: 4.8,
    seats: "2 seats left",
    tag: "LIVE COURSE",
    category: "AI & Data Science",
    img: "/Courses/genai.png",
  },
  {
    title: "Tech Interview 101 DSA to System Design - Live",
    level: "Beginner to Advanced",
    interested: "368k+ interested Geeks",
    rating: 4.9,
    tag: "LIVE COURSE",
    category: "DSA / Placements",
    img: "/Courses/interview.png",
  },
];

const categories = [
  { name: "All", color: "bg-orange-400", icon: "📚" },
  { name: "DSA / Placements", color: "bg-blue-600", icon: "💼" },
  { name: "AI & Data Science", color: "bg-purple-900", icon: "🧠" },
  { name: "Development", color: "bg-green-600", icon: "💻" },
  { name: "Cloud / DevOps", color: "bg-teal-600", icon: "☁️" },
  { name: "Programming Languages", color: "bg-slate-500", icon: "⌨️" },
];

export default function Course() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter courses based on selected category
  const filteredCourses =
    selectedCategory === "All"
      ? allCourses
      : allCourses.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen  flex flex-col">
      

      {/* Main Content */}
      <main className="flex-grow  mx-auto mt-10 mb-10 bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {/* Based On Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Based On Your Interest
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${selectedCategory === cat.name
                  ? `${cat.color} text-white scale-105`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {selectedCategory === "All"
              ? "Our Courses"
              : `${selectedCategory} Courses`}
          </h2>
          <a
            href="#"
            className="text-green-600 font-medium hover:underline flex items-center gap-1"
          >
            View All →
          </a>
        </div>

        {/* Filtered Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
            >
              <div className="relative h-40 w-full">
                <img
                  src={course.img}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
                {/* <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold">
                  {course.tag}
                </span> */}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600">{course.level}</p>
                <div className="mt-3 flex justify-between items-center">
                  <Link
                    href={`/course/${course.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <button className="border border-green-600 text-green-600 px-3 py-1 rounded-lg hover:bg-green-600 hover:text-white transition text-sm font-medium">
                      Explore
                    </button>
                  </Link>


                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* <Footer/> */}
    </div>
  );
}
