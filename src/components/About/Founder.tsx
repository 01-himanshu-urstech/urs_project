"use client";
import { motion } from "framer-motion";
import Image from 'next/image'

export default function Founder() {
  return (
    <>
        <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg gap-6 md:gap-10">
            {/* Left: Founder Image + Badge */}
            <div className="relative md:w-1/2 w-full flex justify-center md:justify-start">
            <img
                src="/About/founder.jpg"
                alt="Founder"
                className="rounded-xl w-[280px] sm:w-[320px] md:w-[370px] h-[360px] sm:h-[430px] md:h-[470px] object-cover border-4 border-[#ff7722]/40 drop-shadow-lg"
            />
            <div className="absolute right-4 sm:right-6 md:right-8 -bottom-2 rounded-xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col items-center shadow-xl w-[160px] sm:w-[180px] md:w-[200px] bg-gradient-to-br from-[#ff7722] to-[#ff4422] border-4 border-white">
                <svg className="mb-2" fill="white" viewBox="0 0 32 16" width="100" height="40">
                <path d="M2,10 L6,10 L8,12 L10,6 L14,7 L18,5 L22,8 L24,6 L30,8" stroke="#fff" strokeWidth="3" fill="none"/>
                </svg>
                <div className="text-white font-extrabold text-3xl sm:text-4xl mb-1 drop-shadow">14+</div>
                <div className="text-white text-sm sm:text-base font-bold leading-tight text-center drop-shadow">Years Of Experience</div>
            </div>
            </div>

            {/* Right: Founder Info */}
            <div className="md:w-1/2 w-full md:pl-0">
            <div className="mb-4 sm:mb-5 flex items-center gap-3">
                <div className="w-2 h-10 bg-gradient-to-b from-[#ff7722] to-[#ff4422] rounded"></div>
                <h3 className="text-[#ff4422] font-semibold tracking-widest uppercase text-sm sm:text-base">About Founder</h3>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight text-[#ff7722] drop-shadow-lg">
                Deepika Bansal
            </h1>
            <h2 className="text-sm sm:text-base md:text-md font-medium text-gray-700 mb-4">
                Founder & CEO at <span className="text-[#ff4422] font-bold">Skill Strategix</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">        
Co-founder & Managing Director | InfoSurge Expert LLP
CFA | MBA | Entrepreneur | Mother of Two
Deepika Bansal is a visionary entrepreneur and co-founder of InfoSurge Expert LLP, where she leads with purpose, innovation, and strategic foresight. With a strong academic foundation as a Chartered Financial Analyst (CFA) and MBA, she brings analytical depth and business acumen to every venture.
Her journey spans over 14 years across market research, consulting, and academic mentoring. As a leader, she champions digital transformation, fosters a culture of continuous learning, and empowers teams to build scalable, tech-driven solutions.<span className="text-[#ff7722] font-semibold"> Deepika’s entrepreneurial mindset is rooted in adaptability, creativity, and a commitment to solving real-world challenges — </span> all while gracefully balancing her role as a devoted mother of two<span className="text-[#ff4422] font-semibold"></span> 
            </p>
            </div>
        </div>
    </>
  );
}
