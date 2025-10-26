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
    <section className="mt-12 sm:mt-16 lg:mt-20 mb-6 sm:mb-8 lg:mb-12 text-center w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10">
        Core <span className="text-[#ff7722]">Team</span>
      </h1>

      {/* Mobile: Horizontal Scroll */}
      <div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-4 min-w-max">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="
                bg-gradient-to-tr from-gray-400 via-gray-100 to-[#ff4422]/20
                rounded-3xl shadow-lg
                p-8
                flex flex-col items-center
                transition-transform duration-300
                hover:shadow-xl
                w-[280px] flex-shrink-0
              "
            >
              <div className="relative rounded-full overflow-hidden ring-4 ring-[#ff7722]/50 transition-all duration-300 mb-4 w-32 h-32">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-black text-sm mb-3">
                {member.role}
              </p>

              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff7722] hover:text-[#ff4422] transition duration-300 text-xl"
                aria-label={`LinkedIn profile of ${member.name}`}
              >
                <FaLinkedinIn />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tablet & Desktop: Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
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
              p-8 md:p-10 lg:p-12
              flex flex-col items-center
              transition-transform duration-300
              hover:-translate-y-2 hover:scale-[1.03]
            "
          >
            <div className="relative rounded-full overflow-hidden ring-4 ring-[#ff7722]/50 hover:ring-[#ff4422] transition-all duration-300 mb-4 md:mb-5 w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
              <Image src={member.img} alt={member.name} fill className="object-cover" />
            </div>

            <h3 className="text-lg md:text-xl lg:text-xl font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-black text-sm md:text-base lg:text-base mb-3 md:mb-4">
              {member.role}
            </p>

            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff7722] hover:text-[#ff4422] transition duration-300 text-xl md:text-2xl"
              aria-label={`LinkedIn profile of ${member.name}`}
              >
              <FaLinkedinIn />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
