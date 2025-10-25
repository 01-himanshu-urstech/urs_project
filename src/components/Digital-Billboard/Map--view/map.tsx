import React from "react";
import Image from "next/image";
const Map = ({ data }: { data: any }) => {
  return (
    <div className=" mx-6 md:mx-12">
      <div className="flex justify-between ">
        <div>
          <h1 className="text-[#E81856] font-bold text-lg lg:text-3xl">
            MAP VIEW
          </h1>
          <span className="text-[#070344] font-bold text-sm lg:text-xl">
            You'll advertise here
          </span>
        </div>
        <div className="flex gap-5  lg:pr-20 text-[11px] lg:mt-3">
          <div>
            <p className="text-[#070344] font-bold text-xs md:text-sm lg:text-xl mt-3">
              {data?.full_address},{data?.landmark}
            </p>
            <span className="text-[11px] lg:text-[14px] text-[#070344]  lg:pl-40">
              {data?.city}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-[450px] overflow-hidden rounded-lg  shadow-md">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            `${data?.full_address}, ${data?.landmark}, ${data?.city}`
          )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
