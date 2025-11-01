"use client";
import { motion } from "framer-motion";
import Image from "next/image"

export default function IntroSection() {
  return (
    <section className="relative w-full py-8 sm:py-10 md:py-12 lg:py-16">
      {/* Intro Section */}
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Aspect ratio container for better alignment */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border-4 border-[#ff7722]/40 shadow-2xl">
  <Image
    src="/About/heroImg.jpg"
    alt="Founder"
    fill
    priority={true}
    className="object-cover hover:scale-105 transition-transform duration-500"
  />
</div>

            </div>
          </motion.div>

          {/* Right Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
            className="w-full text-left flex flex-col justify-center order-1 lg:order-2"
          >
            <p className="text-xs sm:text-sm text-[#ff7722] font-semibold tracking-widest uppercase mb-3 sm:mb-4 flex items-center">
              <svg className="w-4 h-4 text-[#ff7722] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Get to Know Us
            </p>

            <h1 className="font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight text-2xl sm:text-3xl lg:text-4xl">
              Your Trusted <br className="hidden md:block" /> Skill Strategix
            </h1>

            <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-7 lg:mb-8">
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-[1.0625rem] flex items-start">
                <span className="inline-block text-[#ff7722] mr-2 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.04A11.955 11.955 0 0012 21.012a11.955 11.955 0 008.618-4.016z"></path>
                  </svg>
                </span>
                <span>
                  “We believe that learning should be accessible, personalized, and empowering,” said a spokesperson from InfosurgeExpert. “SKILL STRATEGIX is our answer to the growing demand for credible, flexible, and impactful skill-building experiences.”
                </span>
              </p>
              
              <p className="text-gray-700 font-medium text-base sm:text-lg lg:text-[1.0625rem] flex items-start">
                <span className="inline-block text-[#ff7722] mr-2 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.04A11.955 11.955 0 0012 21.012a11.955 11.955 0 008.618-4.016z"></path>
                  </svg>
                </span>
                <span>
                   – Let&apos;s build a better future together.
                </span>
              </p>
            </div>

            <div>
              <a href="/contact" className="inline-block">
                <button className="px-6 sm:px-7 lg:px-9 py-3 sm:py-3.5 bg-[#ff7722] text-white font-bold text-base sm:text-lg lg:text-xl rounded-lg shadow-xl hover:bg-[#ff4422] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                  Enroll Now
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
