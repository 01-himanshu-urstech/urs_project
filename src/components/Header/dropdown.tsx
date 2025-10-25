"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation"; // For Next.js router

interface DropdownProps {
  label: string;
  options: string[];
  mobile?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRedirect = (option: string) => {
    let query = "";

    // Define query parameter keys based on label
    if (label.toLowerCase().includes("city")) {
      query = `city=${encodeURIComponent(option)}`;
    } else if (label.toLowerCase().includes("landmark")) {
      query = `landmark=${encodeURIComponent(option)}`;
    } else {
      // fallback as category_name
      query = `category_name=${encodeURIComponent(option)}`;
    }

    const url = `/filters?${query}`;
    router.push(url);
  };

  return (
    <div
      className={`relative  ${mobile ? "w-full" : "inline-block text-left"}`}
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className={`flex justify-between items-center w-full ${
          mobile ? "py-2 border-b border-white/20 text-left" : ""
        } text-black text-sm font-medium cursor-pointer`}
      >
        {label}
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div
          className={`z-50 mt-2 ${
            mobile ? "w-full" : "absolute w-40 origin-top-right right-0"
          } rounded-md shadow-lg bg-white text-black`}
        >
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleRedirect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-blue-600 cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
