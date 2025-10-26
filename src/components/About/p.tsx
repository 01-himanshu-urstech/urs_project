"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    linkedin: string;
}

export default function Team() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const teamMembers: TeamMember[] = [
        {id:1, name: "abc", role: "Founder & CEO", image: "/About/founder.jpg", linkedin: "#" },
        {id:2, name: "abc", role: "Technical", image: "/About/founder.jpg", linkedin: "#" },
        {id:3, name: "abc", role: "Founder & CEO", image: "/About/founder.jpg", linkedin: "#" },
        {id:4, name: "abc", role: "Founder & CEO", image: "/About/founder.jpg", linkedin: "#" },
    ];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
        >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-900">
                Core <span className="text-[#ff7722]">Team</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                {/* Left Side: Team Description & Features */}
                <motion.div 
                    className="order-2 lg:order-1 space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Meet Our Expert Team
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            Our talented team brings together diverse expertise in training, 
                            technology, and education to deliver exceptional learning experiences 
                            that transform careers and organizations.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-[#ff7722]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7722]/20 transition-colors">
                                <svg className="w-5 h-5 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Industry Experts</h4>
                                <p className="text-gray-600 text-sm">
                                    Years of hands-on experience in their respective fields
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-[#ff7722]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7722]/20 transition-colors">
                                <svg className="w-5 h-5 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Passionate Educators</h4>
                                <p className="text-gray-600 text-sm">
                                    Dedicated to student success and continuous improvement
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-[#ff7722]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7722]/20 transition-colors">
                                <svg className="w-5 h-5 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Innovation Driven</h4>
                                <p className="text-gray-600 text-sm">
                                    Constantly updating curriculum with latest industry trends
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-[#ff7722]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7722]/20 transition-colors">
                                <svg className="w-5 h-5 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Student-Centric Approach</h4>
                                <p className="text-gray-600 text-sm">
                                    Personalized mentorship and career guidance for every learner
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-[#ff7722] mb-1">
                                {teamMembers.length}+
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Team Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-[#ff7722] mb-1">15+</div>
                            <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-[#ff7722] mb-1">500+</div>
                            <div className="text-xs sm:text-sm text-gray-600">Students Trained</div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Carousel */}
                <motion.div 
                    className="relative order-1 lg:order-2"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {/* Decorative Background Blur */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/4 -right-12 w-64 h-64 bg-[#ff7722]/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 -left-12 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative h-[450px] sm:h-[500px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 bg-gradient-to-tr from-gray-400 via-gray-100 to-[#ff4422]/20"
                            >
                                {/* Team Member Card Content */}
                                <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-10">
                                    {/* Profile Image */}
                                    <div className="relative rounded-full overflow-hidden ring-4 ring-[#ff7722]/50 mb-6 sm:mb-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 shadow-xl">
                                        <Image 
                                            src={teamMembers[currentIndex].image} 
                                            alt={teamMembers[currentIndex].name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Team Member Info */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="text-center"
                                    >
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                                            {teamMembers[currentIndex].name}
                                        </h3>
                                        <p className="text-black text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                                            {teamMembers[currentIndex].role}
                                        </p>

                                        {/* LinkedIn Button */}
                                        <Link
                                            href={teamMembers[currentIndex].linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ff7722] hover:bg-[#ff4422] text-white transition-all duration-300 hover:scale-110 shadow-lg"
                                            aria-label={`LinkedIn profile of ${teamMembers[currentIndex].name}`}
                                        >
                                            <FaLinkedinIn className="text-xl sm:text-2xl" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff7722] focus:ring-offset-2 z-10"
                        aria-label="Previous team member"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff7722] focus:ring-offset-2 z-10"
                        aria-label="Next team member"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {teamMembers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff7722] focus:ring-offset-2 ${
                                    index === currentIndex
                                        ? "w-8 md:w-10 h-2 md:h-2.5 bg-[#ff7722]"
                                        : "w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-400 hover:bg-gray-600"
                                }`}
                                aria-label={`Go to team member ${index + 1}`}
                                aria-current={index === currentIndex ? "true" : "false"}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
