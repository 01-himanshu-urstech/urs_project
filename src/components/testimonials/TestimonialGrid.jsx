"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const testimonials = [
  {
    name: "Sneha Gupta",
    title: "Data Scientist, TCS",
    content:
      "I loved the hands-on approach—real industry case studies and instant support from instructors helped me transition into my dream job.",
    avatar: "/avatars/sneha.jpg",
    verified: true,
  },
  {
    name: "Aarav Mehra",
    title: "Product Manager, Swiggy",
    content:
      "The platform gave me practical skills and opened new opportunities. The mentors are top-notch and the course structure is just right.",
    avatar: "/avatars/aarav.jpg",
    verified: true,
  },
  {
    name: "Rahul Sharma",
    title: "Full Stack Developer, Genpact",
    content:
      "The peer community and resume reviews made a big difference for my career switch. Highly recommended.",
    avatar: "/avatars/rahul.jpg",
    verified: true,
  },
  {
    name: "Akanksha Patel",
    title: "AI Researcher, Wipro",
    content:
      "Exceptional placement support and an innovative, project-based curriculum helped me get placed in my dream company.",
    avatar: "/avatars/akanksha.jpg",
    verified: true,
  },
  {
    name: "Priya Singh",
    title: "Marketing Analyst, Uber",
    content:
      "A must for anyone wanting a practical upskilling. Smooth learning, fantastic mentors, and real-world results.",
    avatar: "/avatars/priya.jpg",
    verified: true,
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="relative flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-xl border border-orange-100 hover:border-orange-300 transition-transform duration-300 hover:-translate-y-1 p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={t.avatar}
          alt={t.name}
          className="rounded-full h-12 w-12 object-cover border border-orange-200"
        />
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{t.name}</h3>
          <p className="text-gray-500 text-sm">{t.title}</p>
        </div>
      </div>
      <p className="text-gray-700 text-[15px] leading-relaxed font-medium">
        {t.content}
      </p>
    </div>
  );
}

export default function TestimonialGrid() {
  return (
    <section className="w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 md:py-16 px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Stories From <span className="text-orange-600">Satisfied Learners</span>
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-700 font-medium max-w-2xl mx-auto">
          Real feedback from professionals across the country.
        </p>
      </div>

      {/* ✅ Swiper on Mobile */}
      <div className="block md:hidden">
        <Swiper
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Grid on Tablet & Desktop */}
      <div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} t={t} />
        ))}
      </div>
    </section>
  );
}
