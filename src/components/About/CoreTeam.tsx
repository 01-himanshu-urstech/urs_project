"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";

const teamMembers = [
  { name: "abc", role: "Founder & CEO", img: "/About/founder.jpg", linkedin: "#" },
  { name: "abc", role: "Technical", img: "/About/founder.jpg", linkedin: "#" },
  { name: "abc", role: "Founder & CEO", img: "/About/founder.jpg", linkedin: "#" },
  { name: "abc", role: "Founder & CEO", img: "/About/founder.jpg", linkedin: "#" },
];

export default function CoreTeam() {
  return (
    <section className="mt-12 mb-4 text-center max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-10">
        Core <span className="text-[#ff7722]">Team</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-14 lg:gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="
              bg-gradient-to-tr from-gray-400 via-gray-100 to-[#ff4422]/20
              rounded-3xl shadow-lg hover:shadow-2xl
              p-12 md:p-10 lg:p-16
              flex flex-col items-center
              transition-transform duration-300
              hover:-translate-y-2 hover:scale-[1.03] md:hover:scale-[1.02]
            "
          >
            <div className="relative rounded-full overflow-hidden ring-4 ring-[#ff7722]/50 hover:ring-[#ff4422] transition-all duration-300 mb-3 md:mb-4 w-35 h-35 md:w-30 md:h-30 lg:w-36 lg:h-36">
              <Image src={member.img} alt={member.name} fill className="object-cover" />
            </div>

            <h3 className="text-base md:text-sm lg:text-lg font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-black text-xs md:text-xs lg:text-sm mb-2 md:mb-3">
              {member.role}
            </p>

            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff7722] hover:text-[#ff4422] transition duration-300 text-lg md:text-base"
              aria-label={`LinkedIn profile of ${member.name}`}
            >
              <FaLinkedinIn />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
