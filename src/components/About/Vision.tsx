"use client";
import { motion } from "framer-motion";
import Image from 'next/image'

export default function IntroSection() {
  return (
    <>
      {/* Vision Section */}
      <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-8 sm:gap-10 lg:gap-12 xl:gap-16 grid-cols-1 md:grid-cols-2 items-center w-full">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4 sm:space-y-5 lg:space-y-6"
        >
          <h1 className="border-l-4 border-[#ff7722] pl-3 sm:pl-4 font-semibold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
            Our Vision
          </h1>
          <p className="text-gray-700 text-base sm:text-lg lg:text-[1.0625rem] leading-relaxed">
            To be India’s leading platform for accessible , industry aligned skill development , empowering youth from every community with expert led training that bridges gap between classroom knowledge and and real-world application
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0, scale: 0.97 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
        >
          <Image
            src="/About/vision-1.jpg"
            alt="Our Team"
            width={1200}
            height={800}
            className="object-cover w-full h-auto"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </motion.div>
      </div>
    </>
  );
}
