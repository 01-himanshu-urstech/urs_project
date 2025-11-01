"use client";
import React, { useState, useEffect } from "react";
import { Search } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ Service Icons with Emojis (Hardcoded)
const serviceIcons = [
  { id: 1, title: 'Development', icon: '💾' },
  { id: 2, title: 'IT', icon: '🖥' },
  { id: 3, title: 'Design', icon: '🎨' },
  { id: 4, title: 'Marketing', icon: '📈' },
  { id: 5, title: 'Management', icon: '👨‍💼' },
  { id: 6, title: 'AI / ML', icon: '🤖' },
  { id: 7, title: 'Civil', icon: '🔨' },
  { id: 8, title: 'Cybersecurity', icon: '🛡' },
  { id: 9, title: 'Animation', icon: '🎬' },
  { id: 10, title: 'Finance', icon: '💰' },
];

const Hero = () => {
  const [location, setLocation] = useState("");
  const [mediaType, setMediaType] = useState("");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Right section images
  const sliderImages = ["/Hero.jpg", "/1.png", "/3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("search", location);
    if (mediaType) params.append("category_name", mediaType);
    router.push(`/filters?${params.toString()}`);
  };

  return (
    <div className="lg:relative md:flex md:justify-between lg:grid lg:grid-cols-2 md:gap-5 lg:gap-6 items-center">
      {/* LEFT SECTION */}
      <div className="pl-4 pr-3 md:pl-10 lg:pl-15 mt-14 max-md:pt-5 lg:mt-16">
        <h3 className="text-orange-400 font-bold text-lg lg:text-sm md:text-base">
          Skill Building, Simplified
        </h3>
        <h3 className="font-bold text-3xl md:text-lg lg:text-4xl mt-2">
          India's Top Trainers <span className="text-orange-400">Experts</span>
        </h3>

        {/* Search Bar */}
        <div className="flex mt-2 lg:mt-6 gap-3 md:gap-1 lg:gap-2 w-full md:max-w-90 lg:max-w-xl border border-gray-200 rounded-md shadow p-2">
          <div className="flex flex-1 items-center bg-gray-200 rounded-md overflow-hidden">
            <Search
              color="gray"
              className="bg-gray-300 md:size-6 lg:size-8 p-1 lg:p-2 rounded-l"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search your Location"
              className="bg-gray-200 w-full text-[8px] md:text-[9px] lg:text-[11px] py-1 lg:px-2 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="cursor-pointer rounded-md bg-orange-400 px-2 md:px-6 py-1 text-white text-[9px] md:text-sm font-medium"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col">
          {/* ✅ Icons Grid - Using Emoji Icons */}
          <div className="grid grid-cols-5 gap-4 mt-6 min-h-[90px]">
            {serviceIcons.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center hover:scale-110 transition duration-300 cursor-pointer"
              >
                {/* Emoji Icon */}
                <div className="text-4xl md:text-3xl lg:text-4xl mb-2">
                  {item.icon}
                </div>
                {/* Title */}
                <p className="mt-1 text-[11px] md:text-[9px] max-w-[60px] font-semibold text-gray-800">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Text (Never moves up) */}
          <div className="mt-2">
            <p className="text-[11px] text-[#070344] pl-10 font-bold">
              Choose from over <span className="text-orange-300">100,00+</span> courses,
              trainers, and programs — all at your fingertips
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SLIDER */}
      <div className="absolute top-0 right-0 max-md:hidden flex flex-col items-center">
        {/* Slider Image */}
        <img
          src={sliderImages[currentIndex]}
          alt="Hero Banner"
          className="w-90 lg:min-w-170 h-70 md:h-72 lg:h-96 rounded-bl-[100px] border-b-8 border-orange-300 transition-all duration-700 ease-in-out mb-2"
        />

        {/* ✅ Dots Navigation */}
        <div className="flex gap-2 mt-3">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-orange-400 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
