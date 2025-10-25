export default function StatsGrid() {
  return (
    <div className="text-center ">
        <div className=" flex flex-col md:py-2 lg:py-8 md:gap-1 lg:gap-6 text-white  ">
          <div className="ml-10 md:ml-10 lg:ml-20 ">
            <div className="text-xs md:text-xl lg:text-4xl font-bold  ">10,000+</div>
            <p className="text-[8px] md:text-[10px] lg:text-[11px] font-bold lg:mt-2 rounded-sm py-1 shadow-lg bg-white text-[#F7175B]">VERIFIED AD SLOTS</p>
          </div>
          <div className="mr-6 max-md:ml-5 md:mr-10 lg:mr-20">
            <div className="text-xs md:text-xl lg:text-4xl font-bold ">500+</div>
            <p className="text-[8px] md:text-[10px] lg:text-[11px] font-bold lg:mt-2 rounded-sm py-1 shadow-lg bg-white text-[#F7175B]">ACTIVE CITIES</p>
          </div>
          <div className="mr-6 max-md:ml-5 md:mr-10 lg:mr-20">
            <div className="text-xs md:text-xl lg:text-4xl font-bold ">1,000+</div>
            <p className="text-[8px] md:text-[10px] lg:text-[11px] font-bold lg:mt-2 rounded-sm py-1 shadow-lg bg-white text-[#F7175B]">PREMIUM LOCATIONS</p>
          </div>
          <div className=" ml-10 md:ml-9 lg:ml-20">
            <div className="text-xs md:text-xl lg:text-4xl font-bold ">150+</div>
            <p className="text-[8px] md:text-[10px] lg:text-[11px] font-bold lg:mt-2 rounded-sm md:px-1 py-1 shadow-lg bg-white text-[#F7175B]">TRUSTED MEDIA PARTNERS</p>
          </div>  
        </div>
    </div>
  );
}
