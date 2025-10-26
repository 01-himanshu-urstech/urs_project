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
    "/About/partnerlogo2.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo2.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo2.jpg",
    "/About/partnerlogo1.jpg",
    "/About/partnerlogo2.jpg",
    "/About/partnerlogo1.jpg",
  ];

  return (
    <section className="w-full mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-12">
      {/* Title block */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-center font-bold text-2xl sm:text-3xl lg:text-4xl">
          Our <span className="text-[#ff4422]">Partners</span>
        </h2>
      </div>

      {/* Slider block - Full width on mobile, contained on larger screens */}
      <div className="w-full px-4 sm:px-0 sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto">
        <div className="relative w-full overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={2.5}
            spaceBetween={16}
            loop
            centeredSlides={false}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={false}
            breakpoints={{
              // Mobile (0-639px): 2.5 logos visible
              0: {
                slidesPerView: 2.5,
                spaceBetween: 12,
              },
              // Small tablets (640-767px): 3 logos visible
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              // Tablets (768-1023px): 4 logos visible
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              // Desktop (1024+): 5 logos visible
              1024: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="!pb-4"
          >
            {partners.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="flex items-center justify-center py-4 sm:py-6">
                  <div
                    className="partners-swiper bg-gradient-to-br from-[#fff6f0] to-[#ffe9e2] shadow-md rounded-xl
                              w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                              flex items-center justify-center
                              transition-transform duration-300 hover:scale-110 hover:shadow-xl group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="Partner logo"
                      width={128}
                      height={128}
                      sizes="(max-width:640px) 80px, (max-width:768px) 96px, (max-width:1024px) 112px, 128px"
                      className="object-contain contrast-125 grayscale group-hover:grayscale-0 transition-all duration-300 max-w-[75%] max-h-[75%]"
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
