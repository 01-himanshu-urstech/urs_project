"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdMyLocation } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function FilterBar() {
  const [location, setLocation] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  // ✅ Function to update URL query params
  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (location) queryParams.set("city", location);
    if (mediaType) queryParams.set("category_name", mediaType);
    if (search) queryParams.set("search", search);

    // Navigate to same page with query params
    router.push(`/filters?${queryParams.toString()}`);
  };

  return (
    <div className="w-full flex justify-end pr-14 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] bg-white">
      <div className="flex items-center gap-2 mt-6">
        {/* Location Dropdown */}
        <select
          className="h-[32px] min-w-[160px] px-4 bg-[#F9F9F9] text-[12px] font-semibold text-[#0B0534] rounded-md cursor-pointer"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Gurgaon">Gurugram</option>
          <option value="Dehradun">Dehradun</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Kolkata">Kolkata</option>
        </select>

        {/* Media Type Dropdown */}
        <select
          className="h-[32px] min-w-[200px] px-4 bg-[#F9F9F9] text-[12px] font-semibold text-[#0B0534] rounded-md cursor-pointer"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="">Select Your Media Type</option>
          <option value="Pole Kiosks">Pole Kiosks	</option>
          <option value="Lift Branding">Lift Branding	</option>
          <option value="Mall Media">Mall Media</option>
          <option value="Transit Media">Transit Media</option>
          <option value="Event Sponsorship Media">Event Sponsorship Media</option>
          <option value="Restaurants, Cafes & Gyms">Restaurants, Cafes & Gyms</option>
          <option value="Corporate Parks/Tech Parks">Corporate Parks/Tech Parks</option>
          <option value="Cinema Advertising">Cinema Advertising</option>
          <option value="Place-Based Media">Place-Based Media</option>
          <option value="Railway Station Hoardings">Railway Station Hoardings</option>
          <option value="Cab/Rickshaw Branding">Cab/Rickshaw Branding</option>
          <option value="Airport Media">Airport Media</option>
          <option value="Metro & Train Ads">Metro & Train Ads</option>
          <option value="Digital Transit Screens">Digital Transit Screens</option>
          <option value="Digital Gantries">Digital Gantries</option>
          <option value="3D Billboards">3D Billboards</option>
          <option value="Mobile Billboards">Mobile Billboards</option>
          <option value="Unipole Billboards">Unipole Billboards</option>
          <option value="Digital BillBoard">Digital BillBoard</option>
          <option value="BillBoard">BillBoard</option>

        </select>

        {/* Search Bar */}
        <div className="flex items-center h-[32px] bg-[#F9F9F9] border border-gray-200 rounded-md overflow-hidden">
          <span className="px-3 text-[#0B0534] text-lg">
            <MdMyLocation />
          </span>
          <input
            type="text"
            placeholder="Search your location"
            className="px-2 text-sm bg-[#F9F9F9] text-[#0B0534] focus:outline-none w-[200px] "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-[#0B0534] text-white px-4 h-full flex items-center justify-center hover:bg-[#1a174d] transition cursor-pointer"
            onClick={handleSearch}
          >
            <FiSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
