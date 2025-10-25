"use client";

import Image from "next/image";

const CampaignBanner = () => {
  return (
    <div className="bg-white rounded-xl shadow-[-1px_-2px_6px_0px_rgba(0,_0,_0,_0.1)] border-b-6 border-orange-400 flex   items-center justify-between  md:gap-8 max-w-[750px] mx-4 md:mx-10 lg:mx-auto my-2 p-2 md:p-4">
      {/* Left: Icon */}
      <div className="flex justify-center items-center md:items-center w-[80px] h-[80px] md:w-auto md:h-auto mb-2 md:mb-0">
        <Image
          src="/properties/Banner.webp"
          alt="Target Icon"
          width={130}
          height={130}
        />
      </div>

      {/* Middle: Text */}
      <div className="text-center ">
        <h2 className="text-xs md:text-lg lg:text-xl font-bold text-orange-400 mb-2 md:mb-6 mt-2 md:mt-4  mx-auto md:mx-0">
          Find Your{" "}
          <span className="text-orange-400 font-bold">Trainer</span> —{" "}
          With Us!
        </h2>
        <p className="text-[7px] md:text-[13px] text-black mt-2 md:mt-4 font-bold">
          Get noticed! Enjoy a feature for your training program. <br />
          Boost your visibility with learners instantly.*
        </p>
      </div>

      {/* Right: Button */}
      <div className="mt-2 md:mt-0">
        <button className="bg-orange-400 text-[7px] md:text-[12px] text-white font-semibold px-3 md:px-6 py-2.5 rounded-md shadow hover:bg-pink-700 transition">
          Start NOW
        </button>
      </div>
    </div>
  );
};

export default CampaignBanner;
