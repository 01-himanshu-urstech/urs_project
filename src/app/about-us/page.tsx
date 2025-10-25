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

export default function AboutPage() {

    return (
        
        <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 flex flex-col items-center">
            {/* Hero Banner */}
            <div className="w-full min-h-[16vh] md:min-h-[18vh] lg:min-h-[24vh] about-hero bg-cover bg-center flex items-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

                <motion.h1
                initial={{ opacity: 0, y: -40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative text-white pl-6 sm:pl-10 md:pl-16 drop-shadow-2xl tracking-wider"
                >
                <span className="block font-extrabold mt-5 leading-tight text-2xl">
                    India&apos;s Top Trainers
                </span>
                <span className="block font-extrabold text-[#ff7722] mt-2 leading-tight text-2xl">
                    Experts
                </span>
                </motion.h1>
            </div>
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
            {/* core Team */}
            <CoreTeam />
            {/* Partners Section */}
            <PartnersCarousel />
            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-10 sm:mt-12 mb-2 text-center px-4"
            >
                <h3 className="font-semibold mb-4 text-gray-900 text-2xl">
                Want to collaborate with us?
                </h3>
                <Link
                href="/contact"
                className="bg-[#ff7722] hover:bg-[#ff4422] text-white text-xl px-7 sm:px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1 inline-block"
                >
                Contact Us
                </Link>
            </motion.div>
        </section>
    );
}
