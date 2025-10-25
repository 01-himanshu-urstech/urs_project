"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function PartnersCarousel() {
  const partners = [
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo1.jpg",
  ];

  return (
    <section className="w-full mt-2">
      {/* Title block */}
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        {/* <h6 className="text-[#ff7722] font-semibold text-center mb-1 tracking-wide uppercase text-sm">
          Partners
        </h6> */}
        <h2 className="text-center font-bold mb-2 sm:mb-4 text-2xl mt-3">
          Our <span className="text-[#ff4422]">Partners</span>
        </h2>
      </div>

      {/* Slider block with symmetric gutters + extra bottom space */}
      {/* Centered half-width viewport */}
      <div className=" w-1/2 mx-auto px-0 sm:px-0">
        <div className="relative w-full overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView="auto"
            spaceBetween={20}
            loop
            centeredSlides={false}
            centerInsufficientSlides={false}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={false}
            className="!pb-6"
          >
            {partners.map((src, i) => (
              <SwiperSlide key={i} className="!w-auto">
                <div className="min-h-[110px] sm:min-h-[120px] flex items-center">
                  <div
                    className="partners-swiper mx-3 bg-gradient-to-br from-[#fff6f0] to-[#ffe9e2] rounded-full border-2 shadow
                              w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24
                              flex items-center justify-center
                              transition-transform duration-300 hover:scale-110 hover:shadow-2xl group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="Partner logo"
                      width={112}
                      height={112}
                      sizes="(max-width:640px) 72px, (max-width:1024px) 88px, 96px"
                      className="object-contain contrast-125 grayscale group-hover:grayscale-0 transition-all duration-300 max-w-[70%] max-h-[70%]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>



    </section>
  );
}
