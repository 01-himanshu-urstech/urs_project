"use client";

import { ArrowRight } from "lucide-react";

export default function TrainerContactBanner() {
  return (
    <div className="w-full bg-slate-50 py-20 sm:py-10">
      <div className="mx-auto max-w-2xl px-4 text-center">
        
        {/* Icon */}
        {/* <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600">
            <svg
              width="36"
              height="36"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g>
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="8"/>
                <circle cx="50" cy="50" r="5" fill="white"/>
              </g>
            </svg>
          </div>
        </div> */}

        {/* Text Content */}
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Partner With Us &mdash; Become a Trainer!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
          Showcase your expertise and reach thousands of learners. We provide the platform and tools you need to grow your audience.
        </p>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={() => { window.location.href = '/contact'; }}
            className="group inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:scale-105"
          >
            Contact Us
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
