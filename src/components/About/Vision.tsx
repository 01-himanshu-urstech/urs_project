"use client";
import { motion } from "framer-motion";
import Image from 'next/image'
export default function IntroSection() {
  return (
    <>
                {/* Vision Section */}
                <div className="mt-8 sm:mt-6 grid gap-10 md:grid-cols-2 items-center max-w-6xl px-4 sm:px-6 md:px-0 mx-auto">
                    <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-4 sm:space-y-5"
                    >
                    <h1 className="border-l-4 border-[#ff7722] pl-3 font-semibold text-gray-900 text-2xl">
                        Our Vision
                    </h1>
                    <p className="text-gray-700 [font-size:clamp(1rem,2.2vw,1.0625rem)]">
                        To create products that inspire creativity, improve productivity, and drive sustainable growth with a human-centered design approach. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, nemo. Vero facilis recusandae quam tenetur, qui quaerat quas esse. Delectus voluptate ea quam earum quaerat pariatur eveniet, necessitatibus exercitationem esse!
                    </p>
                    </motion.div>
        
                    <motion.div
                    initial={{ x: 40, opacity: 0, scale: 0.97 }}
                    whileInView={{ x: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-transform duration-500"
                    >
                    <Image
                        src="/About/vision.jpg"
                        alt="Our Team"
                        width={1200}
                        height={800}
                        className="object-cover w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    </motion.div>
                </div>
    </>
  );
}
