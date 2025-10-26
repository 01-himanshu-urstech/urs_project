"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trainer {
    id: number;
    name: string;
    title: string;
    image: string;
    description: string;
}

export default function TrainersCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const trainers: Trainer[] = [
        {
            id: 1,
            name: "John Doe",
            title: "lorem ispim",
            image: "/About/trainer.jpg",
            description: "lorem ipsum ashkhjcaksb bjsnbk bja  hsb k solen iti?. lorm dolor"
        },
        {
            id: 2,
            name: "Johnii Doe",
            title: "lorem ispimst",
            image: "/About/trainer.jpg",
            description: "lorem ipsum ashkhjcaksb bjsnbk bja  hsb k solen iti?. lorm dolorin levels."
        },
        {
            id: 3,
            name: "John Doey",
            title: "Crlorem ispim",
            image: "/About/trainer.jpg",
            description: "lorem ipsum ashkhjcaksb bjsnbk bja  hsb k solen iti?. lorm dolor"
        }
    ];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? trainers.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === trainers.length - 1 ? 0 : prevIndex + 1
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
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
        >
            <h2 className="text-3xl md:text-lg lg:text-4xl font-bold text-center mb-10 text-gray-900">
                Meet Our <span className="text-[#ff7722]">Expert Trainers</span>
            </h2>

            <div className="relative w-full">
                {/* Carousel Container */}
                <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            {/* Trainer Image */}
                            <img
                                src={trainers[currentIndex].image}
                                alt={trainers[currentIndex].name}
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Trainer Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        {trainers[currentIndex].name}
                                    </h3>
                                    <p className="text-[#ff7722] font-semibold text-lg md:text-xl mb-3">
                                        {trainers[currentIndex].title}
                                    </p>
                                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                                        {trainers[currentIndex].description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Previous Button */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff7722] focus:ring-offset-2"
                    aria-label="Previous slide"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Button */}
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff7722] focus:ring-offset-2"
                    aria-label="Next slide"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {trainers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff7722] focus:ring-offset-2 ${
                                index === currentIndex
                                    ? "w-8 md:w-10 h-2 md:h-2.5 bg-[#ff7722]"
                                    : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/60 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentIndex ? "true" : "false"}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
