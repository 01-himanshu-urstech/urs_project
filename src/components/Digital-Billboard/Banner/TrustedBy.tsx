import Image from "next/image";
export default function TrustedBy() {
  return (
    <div className="bg-white rounded-tr-[80px] md:p-2 lg:p-6 shadow-lg md:pr-10 lg:pr-26 pl-3 md:pl-10 lg:pl-26">
      <h2 className="text-[#070344] font-bold max-md:text-[8px] lg:text-xl lg:mb-2">★★★★★</h2>
      <p className="text-[#070344] font-bold max-md:text-[8px] lg:text-2xl lg:mb-6">
        Trusted by more than 500+ Companies
      </p>
      <div className="flex flex-wrap justify-center gap-1 md:gap-1 lg:gap-6  items-center">
        <Image src="/Digital Billboard/Banner/Kotak.webp" width={50} height={100} alt="Kotak" className="max-md:h-3 max-md:w-10 lg:h-6  lg:w-20" />
        <Image src="/Digital Billboard/Banner/inox.webp" width={50} height={100} alt="INOX" className="max-md:h-6 max-md:w-10 h-10 w-20 max-lg:pl-2" />
        <Image src="/Digital Billboard/Banner/credable.webp" width={50} height={100} alt="Credable" className="max-md:h-5 max-md:w-10 h-10 w-25" />
        <Image src="/Digital Billboard/Banner/hector.webp" width={50} height={100} alt="Hector Beverages" className="max-md:h-4 max-md:w-12 h-10 w-25 max-md:pr-3 max-lg:pr-9" />
      </div>
    </div>
  );
}
