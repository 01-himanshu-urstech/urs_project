"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Sun, Moon, X, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./card";

const ImageIcons = [
  {
    name: "image1",
    imageUrl: "/Digital Billboard/Hero/image2.webp",
    day: "Day",
    view: Sun,
  },
  {
    name: "image2",
    imageUrl: "/Digital Billboard/Hero/image3.webp",
    day: "Day",
    view: Sun,
  },
  {
    name: "image3",
    imageUrl: "/Digital Billboard/Hero/image4.webp",
    day: "Night",
    view: Moon,
  },
  {
    name: "image4",
    imageUrl: "/Digital Billboard/Hero/image5.webp",
    day: "Night",
    view: Moon,
  },
];

const Hero = ({ data }: { data: any }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openPreview = (index: number) => {
    setActiveIndex(index);
  };

  const closePreview = () => {
    setActiveIndex(null);
  };

  const nextImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev! + 1) % ImageIcons.length);
    }
  };

  const prevImage = () => {
    if (activeIndex !== null) {
      setActiveIndex(
        (prev) => (prev! - 1 + ImageIcons.length) % ImageIcons.length
      );
    }
  };

  return (
    <div className="px-6 lg:px-20">
      {/* Desktop view */}
      <div className="flex md:gap-2 lg:gap-2 lg:mt-5 max-md:hidden">
        <Image
          src="/Digital Billboard/Hero/image1.webp"
          alt="main"
          width={600}
          height={600}
          className="md:w-[350px] md:h-[510px] lg:w-[550px] lg:h-[510px] rounded-xl cursor-pointer"
          onClick={() => openPreview(0)}
        />
        <div className="grid grid-cols-2 gap-2">
          {ImageIcons.map((img, index) => (
            <div className="relative" key={index}>
              <Image
                src={img.imageUrl}
                alt={img.name}
                width={320}
                height={300}
                className="rounded-xl h-60 w-full cursor-pointer"
                onClick={() => openPreview(index)}
              />
              <button className="absolute text-[11px] py-1 px-3 rounded bg-gray-50 bottom-3 right-2">
                <div className="flex gap-2 items-center">
                  <img.view size={15} color="black" />
                  {img.day} view
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap p-4 rounded-lg">
        {ImageIcons.map((ele, index) => (
          <div
            key={index}
            className="inline-block px-2"
            onClick={() => openPreview(index)}
          >
            <Card
              name={ele.name}
              imageUrl={ele.imageUrl}
              view={ele.view}
              day={ele.day}
            />
          </div>
        ))}
      </div>

      {/* Modal / Preview */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="relative w-full max-w-4xl mx-auto p-4">
            <button
              className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-1 hover:bg-red-600"
              onClick={closePreview}
            >
              <X size={24} />
            </button>

            <Image
              src={ImageIcons[activeIndex].imageUrl}
              alt="preview"
              width={1000}
              height={700}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
