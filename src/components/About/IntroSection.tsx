"use client";
import { motion } from "framer-motion";
import Image from "next/image"

export default function IntroSection() {
  return (
    <section className="relative w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-6 lg:py-10">
              {/* Intro Section */}
                <div className="w-full max-w-6xl mx-auto py-8 sm:py-6 md:py-6 px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                    {/* Left Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                        className="flex justify-center lg:justify-start"
                    >
                        <div className="relative w-full max-w-sm">
                        {/* Prefer Next/Image for responsiveness and CLS */}
                        <Image
                            src="/About/founder.jpg"
                            alt="Founder"
                            width={700}
                            height={900}
                            priority={false}
                            className="object-contain w-full h-auto z-10 rounded-2xl  border-4 border-[#ff7722]/40 drop-shadow-lg"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 350px"
                        />
                        </div>
                    </motion.div>
        
                    {/* Right Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
                        className="w-full text-left pt-8 sm:pt-10 lg:pt-0"
                    >
                        <p className="text-xs  text-[#ff7722] font-semibold tracking-widest uppercase mb-2 flex items-center">
                        <svg className="w-4 h-4 text-[#ff7722] mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Get to Know Us
                        </p>
        
                        <h1 className="font-bold text-gray-900 mb-4 sm:mb-6 leading-tight text-2xl">
                        Your Trusted <br className="hidden md:block" /> Partner in Trainer Aggregator
                        </h1>
        
                        <p className="text-gray-700 leading-relaxed mb-6  [font-size:clamp(1rem,2.2vw,1.0625rem)]">
                        <span className="inline-block align-middle text-[#ff7722] mr-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.04A11.955 11.955 0 0012 21.012a11.955 11.955 0 008.618-4.016z"></path>
                            </svg>
                        </span>
                        At <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b> Praesentium temporibus aspernatur consequatur non, totam adipisci dicta cumque enim necessitatibus? Mollitia commodi dolorem perspiciatis repellat aliquid quibusdam eos suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi a facere nam quaerat minima ducimus repudiandae veniam rem maxime dolorum sit amet laborum, quam cupiditate molestias placeat recusandae fugit accusamus!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        </p>
                        <p className="text-gray-700 font-medium mb-8 flex items-start  [font-size:clamp(1rem,2.2vw,1.0625rem)]">
                        <span className="inline-block align-middle text-[#ff7722] mr-2 pt-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.04A11.955 11.955 0 0012 21.012a11.955 11.955 0 008.618-4.016z"></path>
                            </svg>
                        </span>
                        <b>Lorem ipsum dolor sit amet</b> – Let&apos;s build a better future together.
                        </p>
        
                        <a href="/contact" className="inline-block">
                        <button className="px-7 sm:px-8 py-3 bg-[#ff7722] text-white font-bold  [font-size:clamp(1rem,2.2vw,1.0625rem)] rounded-lg shadow-xl hover:bg-[#ff4422] transition duration-300 hover:scale-[1.03]">
                            Enroll Now
                        </button>
                        </a>
                    </motion.div>
                    </div>
                </div>
    </section>
  );
}
