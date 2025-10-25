"use client";
import React, { useState, useEffect } from "react";
import FilterBar from "./FilterClientLocation";
const url = process.env.NEXT_PUBLIC_BASE_URL;
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ✅ Define MediaItem interface
interface MediaItem {
  _id: string;
  title: string;
  slug: string;
  city: string;
  landmark: string;
  full_address: string;
  category_name: string;
  tag_name: string;
  day_view_images: string[];
  costing: number;
}

// ✅ Define API response type
interface ApiResponse {
  success: boolean;
  count: number;
  data: MediaItem[];
}

const tagColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-orange-500",
];

function getRandomColor(seed: string): string {
  // Basic hash function to make color stable for same tag
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % tagColors.length;
  return tagColors[index];
}

export default function MediaListingStatic() {
  const searchParams = useSearchParams();

  // ✅ Get URL query parameters
  const city = searchParams.get("city") || "";
  const search = searchParams.get("search") || "";
  const categoryName = searchParams.get("category_name") || "";
  const landmark = searchParams.get("landmark") || "";

  const [mediaData, setMediaData] = useState<MediaItem[]>([]);
  const [mediaTabs, setMediaTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");

  // ✅ Fetch data from API dynamically
  const fetchMediaListings = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${url}/media-listings/filter?search=${search}&city=${city}&category_name=${categoryName}&landmark=${landmark}`
      );
      const result: ApiResponse = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setMediaData(result.data);

        // ✅ Extract unique category names safely
        const categories: string[] = Array.from(
          new Set(result.data.map((item) => String(item.category_name)))
        );
        setMediaTabs(["All", ...categories]);
      }
    } catch (error) {
      console.error("Error fetching media listings:", error);
    }
  };

  useEffect(() => {
    fetchMediaListings();
    // ✅ Refetch whenever query parameters change
  }, [search, city, categoryName, landmark]);

  // ✅ Filter data based on selected tab
  const filteredData =
    activeTab === "All"
      ? mediaData
      : mediaData.filter((item) => item.category_name === activeTab);

  return (
    <div className="">
      {/* Filter Bar */}
      <FilterBar />

      <div className="p-4 sm:p-6 md:mx-12">
        {/* Tabs */}
        {filteredData?.length > 0 ? (
          <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto whitespace-nowrap">
            {mediaTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition border-2 cursor-pointer 
           ${
             activeTab === tab
               ? "bg-blue-900 text-white border-blue-900 font-bold"
               : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
           }`}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center col-span-4 text-gray-500"></p>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-3"
              >
                {/* Image with tag overlay */}
                <div className="relative w-full h-48">
                  <img
                    src={item.day_view_images[0]}
                    alt={item.title}
                    className="rounded-lg w-full h-full object-cover"
                  />
                  {/* {item.tag_name && (
                    <span className="absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-md text-white bg-orange-500">
                      {item.tag_name}
                    </span>
                  )} */}
                  {item.tag_name && (
                    <span
                      className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-md text-white ${getRandomColor(
                        item.tag_name
                      )}`}
                    >
                      {item.tag_name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                <p className="text-gray-500 text-sm">
                  {item.city}, {item.landmark}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  {item.full_address}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[#EE1858] font-semibold text-sm">
                    {item.category_name}
                  </span>
                  <Link
                    href={`details-media/${item?.slug}`}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">
              No media found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
