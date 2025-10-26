"use client";
import { motion } from "framer-motion";
import Image from 'next/image'


export default function CoreValues() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mt-12 sm:mt-16 lg:mt-20 mb-10 sm:mb-12 lg:mb-16 text-center w-full"
      >
        <h1 className="font-bold mb-8 sm:mb-10 lg:mb-12 text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
          Our Core Values
        </h1>
        <ul className="grid gap-6 sm:gap-7 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-base sm:text-lg">
          {[
            { emoji: "💡", title: "Innovation", desc: "We embrace creativity and forward-thinking." },
            { emoji: "🤝", title: "Collaboration", desc: "Together, we achieve more with mutual respect." },
            { emoji: "🌱", title: "Growth", desc: "We believe in learning and evolving continuously." },
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.15 * index, duration: 0.5 }}
              className="bg-gradient-to-r from-[#ff7722]/10 via-[#ff7722]/20 to-[#ff4422]/20 border border-gray-300 p-5 sm:p-6 lg:p-7 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-400 ease-out text-gray-800"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{item.emoji}</div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1.5 sm:mb-2 text-gray-800">{item.title}</h4>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">{item.desc}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
