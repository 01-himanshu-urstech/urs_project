"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CourseListByCategory from "./CourseListByCategory";
import { allCourses, categories } from "@/app/data/course";

export default function Course() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen py-12">
      <main className="mx-auto w-full max-w-[1600px] px-6">
        {/* --- HEADER --- */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            A Broad Selection of Courses
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from 10+ online video courses with new additions published every month.
          </p>
        </div>

        {/* --- CATEGORY BUTTONS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[...categories].map((cat, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 backdrop-blur-md
                ${
                  selectedCategory === cat.name
                    ? `${cat.color} text-white shadow-lg`
                    : "bg-white/80 text-gray-800 border border-gray-200 hover:bg-gray-100"
                }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* --- COURSE LIST --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {selectedCategory === "All" ? (
              <div className="space-y-14">
                <CourseListByCategory category={"AI & Data Science"} />
                {/* {categories.map((cat) => (
                  <CourseListByCategory key={cat.name} category={cat.name} />
                ))} */}
              </div>
            ) : (
              <CourseListByCategory category={selectedCategory} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
