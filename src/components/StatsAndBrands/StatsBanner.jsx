"use client";

import { motion } from "framer-motion";

// Stat Card Component
function StatCard({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cursor-pointer rounded-2xl bg-white/10 p-6 text-center border border-white/30 backdrop-blur-sm shadow-lg 
        transition hover:bg-white/20"
    >
      <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-base sm:text-lg  text-gray-200">{label}</p>
    </motion.div>
  );
}

const universities = [
  { name: "Delhi University", svg: "/university-logos/delhi-uni.svg" },
  { name: "IIT Kanpur", svg: "/university-logos/iit-kanpur.svg" },
  { name: "IIM Ahmedabad", svg: "/university-logos/iim-ahmedabad.svg" },
  { name: "JNU", svg: "/university-logos/jnu.svg" },
  { name: "BITS Pilani", svg: "/university-logos/bits-pilani.svg" },
  { name: "Anna University", svg: "/university-logos/anna-uni.svg" },
  { name: "NIT Trichy", svg: "/university-logos/nit-trichy.svg" },
  { name: "SRCC", svg: "/university-logos/srcc.svg" },
];

export default function StatsBanner() {
  const stats = [
    { value: "1,000+", label: "Number of Trainers" },
{ value: "300+", label: "Successful Training Deliveries" },
{ value: "50+", label: "Working with Universities" },
{ value: "500+", label: "Our Courses" },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-[#FF9600] via-[#FF5F3C] to-[#FF784B] pb-16">
      {/* Top Content */}
      <div className="mx-auto max-w-2xl text-center pt-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Trusted by Thousands of Learners Worldwide
        </h2>
        <p className="mt-4 text-lg leading-8 text-white/80">
          Our commitment to quality and excellence is reflected in our numbers.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label} index={index} />
          ))}
        </dl>
      </div>

      {/* Universities Logos Grid */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8">
        <h3 className="mb-8 text-center text-lg font-semibold text-white/80">
          Trusted By Leading Universities
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {universities.map((uni) => (
            <div key={uni.name} className="opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-200">
              <img src={uni.svg} alt={uni.name} className="h-12 w-auto object-contain max-w-[110px]"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
