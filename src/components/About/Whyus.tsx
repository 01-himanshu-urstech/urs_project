"use client";
import { motion } from "framer-motion";
import Image from "next/image"
export default function WhyChooseUs() {
    return (
        <div className="max-w-7xl mx-auto py-12 px-2 md:px-8">
        {/* Section Title */}
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
            className="mb-10"
        >
            <h5 className="text-[#ff7722] font-semibold mb-2 uppercase tracking-wide text-xs flex items-center gap-2">
            <span>▸</span> WHY CHOOSE US
            </h5>
            <h1 className="text-2xl md:text-2xl font-bold leading-snug text-[#222]">
            We Only Provide Quality Results
            </h1>
        </motion.div>
        {/* Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Center Card */}
            <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: false }}
            className="rounded-xl border-2 border-[#ff7722] p-6 flex flex-col bg-white min-h-[340px] shadow"
            >
            <div className="bg-gradient-to-r from-[#ff7722bb] to-[#ff4422cc] rounded-lg px-4 py-2 mb-4 text-white border border-[#ff7722]/50">
                <div className="font-semibold text-base mb-2">Let's Go for :</div>
                <div className="flex gap-4 text-sm">
                <span className="px-2 py-1 bg-white/20 rounded-full border border-[#ff7722]">Employment</span>
                <span className="px-2 py-1 bg-white/20 rounded-full border border-[#ff7722]">Growth</span>
                <span className="px-2 py-1 bg-white/20 rounded-full border border-[#ff4422]">Skills</span>
                </div>
            </div>
            {/*  Img */}
            <div className="w-full flex justify-center mb-6">
            {/* limit width so it sits nicely inside the card */}
            <div className="relative w-[92%] sm:w-5/6 md:w-2/3">
                {/* fixed ratio on small to avoid zero height, then let content grow on md+ */}
                <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-[200px] lg:h-[250px]">
                <Image
                    src="/About/image.jpg"
                    alt="hero-image"
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 768px) 83vw, 66vw"
                    className="rounded-lg shadow-lg scale-95 hover:scale-100 transition object-cover"
                    priority={false}
                />
                </div>
            </div>
            </div>
            {/* Stats */}
            <div className="flex items-end justify-around px-2 mt-auto pt-1">
                <motion.div whileInView={{ scale: [1.2, 1] }} transition={{ duration: 0.4 }} viewport={{ once: false }}>
                <div className="text-[#ff7722] text-3xl font-extrabold drop-shadow">800+</div>
                <div className="font-bold text-gray-800 text-base">lorem ipsum</div>
                </motion.div>
                <motion.div whileInView={{ scale: [1.2, 1] }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: false }}>
                <div className="text-[#ff4422] text-3xl font-extrabold drop-shadow">150+</div>
                <div className="font-bold text-gray-800 text-base">Lorem ipsum dolor</div>
                </motion.div>
            </div>
            </motion.div>
            {/* Right Stats */}
            <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: false }}
            className="space-y-6 flex flex-col h-full"
            >
            <div className="bg-gradient-to-br from-[#ff7722] to-[#ff4422] rounded-xl text-white px-7 py-12 flex flex-col justify-center min-h-[150px] shadow-lg w-full border border-[#ff4422]/20">
                <div className="text-4xl font-extrabold mb-2 tracking-wide drop-shadow">500+</div>
                <div className="text-lg font-bold mb-2">Trusted Clients Across India</div>
                <div className="text-sm opacity-90">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis mollitia minus voluptatibus suscipit ab aliquam iusto, illo distinctio..</div>
            </div>
            <div className="bg-gradient-to-br from-[#ff7722] to-[#ff4422] rounded-xl text-white px-7 py-12 flex flex-col justify-center min-h-[140px] shadow-lg w-full border border-[#ff7722]/20">
                <div className="text-4xl font-extrabold mb-2 tracking-wide drop-shadow">250+</div>
                <div className="text-lg font-bold mb-2">Qualified Employees</div>
                <div className="text-sm opacity-90">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit aliquid ducimus velit obcaecati deserunt quas odio voluptatum consequatur.</div>
            </div>
            </motion.div>
        </div>
        </div>
    );
}
