import StatsGrid from "./StatsGrid";
import TrustedBy from "./TrustedBy";
import Image from "next/image";
export default function Banner() {
  return (
     <main className="bg-[#DC1651] text-white font-sans">
      <div className=" ">
        <div className="flex  flex-row-reverse lg:gap-10">
          <div className=" flex lg:min-w-170 ">
            <div className=" max-md:hidden lg:min-w-65">
              <StatsGrid />
            </div>
          <div className=" bg-white pt-5 md:pt-10 lg:pt-15 pb-5 md:pb-10 lg:pb-15 pl-5 md:pl-10 lg:pl-17 pr-1 md:pr-2 lg:pr-6 rounded-l-[400px] ">
            <Image src="/Digital Billboard/Banner/logo.webp" width={100} height={100} alt="Logo" className=" md:w-35 lg:w-80 md:h-35 lg:h-80 " />
          </div>
          </div>
          <div className=" mt-2 md:mt-2 lg:mt-8 ">
            <div className=" pl-3 md:pl-10 lg:pl-20">
              <h1 className="text-[9px] md:text-[17px] lg:text-2xl font-bold  lg:mb-4">
                Boost your Visibility, Reach & Conversions with 
                <span className="text-white"> Rahane Media</span>
            </h1>
            <p className="text-[9px] md:text-[17px] lg:text-2xl font-bold md:mb-1 lg:mb-4">
                #1 for Outdoor & Transit Ads <br />
                Pan-India coverage. Instant bookings.
            </p>
            <div className="flex gap-4 md:gap-8 lg:gap-30 pt-1 md:pt-2 lg:pt-8">
                <button className="bg-white text-[#070344] max-md:text-[7px] max-lg:text-[12px] font-bold  lg:py-2 px-1 md:px-1 lg:px-4 md:rounded-sm lg:rounded-md hover:opacity-90">
                List Your Ad Space
                </button>
                <button className="bg-white text-[#070344] max-md:text-[7px] max-lg:text-[12px] font-bold lg:py-2 px-1 md:px-1 lg:px-4 md:rounded-sm lg:rounded-md hover:opacity-90">
                Explore Media Plans
                </button>
            </div>
            </div>
            <div className="pt-2 md:pt-4 lg:pt-8 ">
              <TrustedBy />
            </div>
          </div>          
        </div>
      </div>
    </main>
    
  );
}
