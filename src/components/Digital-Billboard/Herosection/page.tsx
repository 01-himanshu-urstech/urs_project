"use client";
import React from "react";
import Image from "next/image";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Poppins } from "next/font/google";
import { Image as ImgIcon } from "lucide-react";

const poppins = Poppins({
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const Section1 = ({ data }: { data: any }) => {
  return (
    <div className="mt-4">
      {/* Photo Gallery */}
      <PhotoProvider className="">
        <div className="relative grid grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-2 gap-1.5 sm:gap-2.5 h-[50vh] sm:h-[55vh] md:h-[55vh] lg:h-[70vh]">
          {data.media_video ? (
            <div className="col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 group relative overflow-hidden cursor-pointer rounded-md lg:rounded-2xl">
              <video
                src={data?.media_video}
                controls
                autoPlay
                loop
                muted
                className="w-full h-full object-cover object-center rounded-md lg:rounded-2xl"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            // Large Hero Video
            <PhotoView src={data?.day_view_images?.[0]}>
              <div className="col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 group relative overflow-hidden cursor-pointer rounded-md lg:rounded-2xl">
                <Image
                  src={data?.day_view_images?.[0]}
                  alt="property image"
                  fill
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 rounded-md lg:rounded-2xl"
                />
              </div>
            </PhotoView>
          )}
        

          {/* Top Right */}
          <PhotoView src={data?.day_view_images?.[1]}>
            <div className="hidden sm:block sm:col-start-3 sm:row-start-1 group relative overflow-hidden cursor-pointer rounded-md lg:rounded-2xl">
              <Image
                src={data?.day_view_images?.[1]}
                alt="property image"
                fill
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 rounded-md lg:rounded-2xl"
              />
            </div>
          </PhotoView>

          {/* Bottom Middle */}
          <PhotoView src={data?.night_view_images?.[0]}>
            <div className="hidden sm:block sm:col-start-3 sm:row-start-2 group relative overflow-hidden cursor-pointer rounded-md lg:rounded-2xl">
              <Image
                src={data?.night_view_images?.[0]}
                alt="property image"
                fill
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 rounded-md lg:rounded-2xl"
              />
            </div>
          </PhotoView>

          {/* Bottom Right Large with View All */}
          <PhotoView src={data?.night_view_images?.[1]}>
            <div className="hidden sm:block sm:col-start-4 sm:row-start-1 sm:row-span-2 group relative overflow-hidden cursor-pointer rounded-md lg:rounded-2xl">
              <Image
                src={data?.night_view_images?.[1]}
                alt="property image"
                fill
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 rounded-md lg:rounded-2xl"
              />
              <button
                className={`${poppins.className} absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/90 text-black text-xs sm:text-sm font-medium tracking-wide shadow hover:bg-white`}
              >
                <ImgIcon className="w-4 h-4" />
                View all photos
              </button>
            </div>
          </PhotoView>

          {/* Hidden additional images for PhotoView */}
          {data?.image?.slice(4).map((item: string, i: number) => (
            <PhotoView src={item} key={i}>
              <div className="hidden" />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>

      {/* Property Tags */}
    </div>
  );
};

export default Section1;
