// components/HeroBanner.tsx
import React from 'react';
import Image from 'next/image';

const AppBanner: React.FC = () => {
  return (
    <div className='relative py-8 md:py-10  lg:py-15  '>
      <div className=" absolute left-2 md:left-8 lg:left-35 top-0 lg:top-11 w-30 md:w-40 lg:w-60 z-1">
        <Image
          src="/properties/App.webp"
          alt="Rahane Media App"
          width={500}
          height={400}
          className="object-contain"
        />
      </div>
    <div className="flex md:flex-row items-center justify-between z-0 bg-[#EE1858] rounded-4xl lg:p-1 mx-2 lg:mx-20  lg:my-12 shadow-md">
      {/* Right Side - Text & Buttons */}
      <div className="flex-1 text-center bg-white my-2 mr-2  lg:m-4 lg:pb-10 lg:pt-6 lg:p-6 rounded-r-4xl z-0 md:text-left" style={{
          clipPath: 'polygon(30% 0,100% 0, 100% 100%, 18% 100%)',
        }}>
        <h2 className="text-[15px] max-md:mt-3 md:text-3xl font-bold text-[#0c0c3e] lg:mb-4 ml-30 md:ml-60 md:text-center md:mt-3 lg:ml-80">
          Kickstart <span className="text-[#EE1858] font-bold">Your Journey</span>{' '}
          Download <span className="text-[#EE1858] font-bold">the App</span> Now!
        </h2>
        <p className="text-[#0c0c3e] font-bold text-center max-md:text-[9px] ml-30 md:ml-55 md:mr-2 lg:ml-85  lg:mb-6">
          Discover media spots, monitor performance, and stay ahead, all from one app!
        </p>

        {/* App Store Buttons */}
        <div className="flex justify-center pl-25 md:pl-90 lg:pl-130 md:justify-start  max-md:py-3 md:py-3 gap-3 lg:gap-25">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <div className='w-20 md:w-30 lg:w-50'>
               <Image
              src="/Mobile/ios.webp" 
              alt="Download on the App Store"
              width={180}
              height={200}
            />
            </div>
           
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <div className='w-20 md:w-30 lg:w-50'>
             <Image
              src="/Mobile/Play.webp" 
              alt="Get it on Google Play"
              width={180}
              height={100}
            /> 
            </div>
            
          </a>
        </div>
      </div>
    </div>
    {/* Left Side - Mobile Image */}
      
    </div>
  );
};

export default AppBanner;
