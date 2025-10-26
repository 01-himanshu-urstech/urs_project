"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import IntroSection from "../../components/About/IntroSection"
import Vision from "../../components/About/Vision"
import CoreValues from "../../components/About/CoreValues"
import CoreTeam from "../../components/About/CoreTeam";
import PartnersCarousel from "../../components/About/Partner";
import WhyChooseUs from "../../components/About/Whyus"
import Founder from "../../components/About/Founder"
import About from "@/components/Digital-Billboard/about/page";
import TrainersCarousel from "../../components/About/TrainersCarousel"
import Team from "../../components/About/p"



export default function AboutPage() {


    return (
        
        <section className="min-h-screen  bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 flex flex-col items-center">
            {/* Hero Banner */}
            <div className="w-full min-h-[18vh] md:min-h-[20vh] lg:min-h-[24vh] about-hero bg-cover bg-center flex items-center relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>


                <motion.h1
                initial={{ opacity: 0, y: -40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative text-white pl-8 sm:pl-12 md:pl-16 md:pt-5 lg:pl-20 xl:pl-24 drop-shadow-2xl tracking-wider"
                >
                <span className="block font-extrabold mt-5 sm:mt-8 leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    India&apos;s Top Trainers
                </span>
                <span className="block font-extrabold text-[#ff7722] mt-2 leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Experts
                </span>
                </motion.h1>
            </div>

            {/* Content Container with Responsive Margins */}
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 ml-4 mr-4">   
                {/* introduction section */}
                <IntroSection/>
                
                {/* Vision Section */}
                <Vision/>
                
                {/* Core Values */}
                <CoreValues/>


                {/* why choose us */}
                <WhyChooseUs />


                {/* about founder Section */}
                <Founder/>


                {/* Trainers Carousel - NEW */}
                <TrainersCarousel />


                {/* core Team */}
                {/* <CoreTeam /> */}
                <Team/>

                {/* Partners Section */}
                <PartnersCarousel />
            </div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-10 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 text-center px-6 sm:px-8 md:px-10 lg:px-12"
            >
                <h3 className="font-semibold mb-4 sm:mb-6 text-gray-900 text-xl sm:text-2xl lg:text-3xl">
                Want to collaborate with us?
                </h3>
                <Link
                href="/contact"
                className="bg-[#ff7722] hover:bg-[#ff4422] text-white text-base sm:text-lg lg:text-xl px-6 sm:px-7 lg:px-9 py-2.5 sm:py-3 lg:py-3.5 rounded-full shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1 inline-block mb-3"
                >
                Contact Us
                </Link>
            </motion.div>
        </section>
    );
}
