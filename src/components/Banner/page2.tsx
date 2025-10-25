"use client";
import React from "react";
import Image from "next/image";

const StatsAndBrands = () => {  
  return (
    <section className="mx-5 md:mx-20 lg:mx-30 mb-10 shadow-xl text-white rounded-[3rem] pb-2 text-center" style={{ backgroundImage: "url('/Pink/Bing.webp')" }}>
        <div className="bg-white rounded-[3rem]">
            <div className="rounded-[3rem] px-4 pt-8 pb-6" style={{ backgroundImage: "url('/Pink/Bing.webp')", backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
                 <h2 className="text-[18px] md:text-[3rem] font-bold mb-2 md:mb-8">
                    Let Us Find Your Perfect Ad Spot
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-1 md:mb-10">
                        <div>
                            <h3 className="text-xl md:text-4xl font-bold">10,000+</h3>
                            <p className="bg-white text-[#EE1858] font-bold px-4 py-1 rounded inline-block text-[9px] md:text-[11px] mt-2">
                                VERIFIED AD SLOTS
                            </p>
                            </div>
                            <div>
                            <h3 className="text-xl md:text-4xl font-bold">1,000+</h3>
                            <p className="bg-white text-[#EE1858] font-bold px-3 py-1 rounded inline-block text-[9px] md:text-[11px] mt-2">
                                PREMIUM LOCATIONS
                            </p>
                            </div>
                            <div>
                            <h3 className="text-xl md:text-4xl font-bold ">500+</h3>
                            <p className="bg-white text-[#EE1858] font-bold px-5 py-1 rounded inline-block text-[9px] md:text-[11px] mt-2 ">
                                ACTIVE CITIES
                            </p>
                            </div>
                            <div>
                            <h3 className="text-xl md:text-4xl font-bold">150+</h3>
                            <p className="bg-white text-[#EE1858] font-bold px-1 md:px-3 py-1 rounded inline-block text-[9px] md:text-[11px] mt-2">
                                TRUSTED MEDIA PARTNERS
                            </p>
            </div>
        </div>
            </div>
             <div className="bg-white  text-blue-950 py-6 mb-4 rounded-b-[3rem]">
        <h3 className="text-md md:text-3xl font-bold text-center ">
          Trusted by more than <span className="text-[#EE1858]">500+</span> Companies
        </h3>

        <div className="grid grid-cols-5 md:grid-cols-5 w-80 md:w-140 lg:w-250  place-items-center ml-3 gap-2 md:gap-2 md:ml-4  lg:ml-10 ">
          <Image src="/Pink/Cocacola.webp" alt="CocaCola" width={150} height={50} />
          <Image src="/Pink/Kodak.webp" alt="Kodak" width={150} height={50} />
          <Image src="/Pink/Kotak.webp" alt="Kotak" width={150} height={50} />
          <Image src="/Pink/inox.webp" alt="Inox" width={150} height={50} />
          <Image src="/Pink/Godrej.webp" alt="Godrej" width={150} height={50} />
          <Image src="/Pink/Cocacola.webp" alt="CocaCola" width={150} height={50} />
          <Image src="/Pink/Kodak.webp" alt="Kodak" width={150} height={50} />
          <Image src="/Pink/Kotak.webp" alt="Kotak" width={150} height={50} />
          <Image src="/Pink/inox.webp" alt="Inox" width={150} height={50} />
          <Image src="/Pink/Godrej.webp" alt="Godrej" width={150} height={50} />
        </div>
        </div>
      </div>
    </section>
  );
};

export default StatsAndBrands;
