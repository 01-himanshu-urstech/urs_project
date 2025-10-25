"use client";
import Dropdown from "./dropdown";
import React, { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useLogout from "@/hooks/useLogout";
import { IoMdLogOut } from "react-icons/io";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [tokenGet, setTokenGet] = useState<string | null>(null);
  const logout = useLogout(() => setTokenGet(null));

  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    setTokenGet(token);
  }, []);

  return (
    <nav
      className="bg-gradient-to-b from-[#EE1858] to-[#880E32] fixed min-w-screen
     z-50 top-0 border-b border-gray-200 dark:border-gray-600"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/properties/white-logo.webp"
                alt="Logo"
                width={100} // Adjust width/height as needed
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex text-white gap-6 text-sm items-center">
            {/* {[
              "City",
              "Bill Board",
              "Digital Board",
              "Unipole",
              "Transit Media",
            ].map((item,i) => (
              <Dropdown
                label= {item}
                key={i}
                  options={[
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 4",
                    "Option 5",
                    "Option 6",
                    "Option 7",
                  ]}
                />

            ))} */}
            <Dropdown
              label="City"
              options={[
                "Delhi",
                "Noida",
                "Gurgaon",
                "Dehradun",
                "Mumbai",
                "Bangalore",
                "Lucknow",
                "Kolkata",
              ]}
            />
            <Dropdown
              label="Bill Boards"
              options={[
                "Unipole Billboards",
                "Wall Hoardings",
                "Mobile Billboards",
                "3D Billboards",
                "Bridge Panels",
              ]}
            />
            <Dropdown
              label="Digital Board"
              options={[
                "Large Digital Billboards",
                "Digital Gantries",
                "Digital Transit Screens",
                "Digital Mall Displays",
              ]}
            />

            <Dropdown
              label="Transit Media"
              options={[
                "Bus Wraps and Panels",
                "Metro & Train Ads",
                "Airport Media",
                "Cab/Rickshaw Branding",
                "Railway Station Hoardings",
              ]}
            />
            <Dropdown
              label="Place-Based Media"
              options={[
                "Malls & Retail Storefronts",
                "Cinema Advertising",
                "Corporate Parks/Tech Parks",
                "Restaurants, Cafes & Gyms",
                "Event Sponsorship Media",
              ]}
            />

            <Link href="/blogs" className="cursor-pointer">
              Blog
            </Link>
            <Link href="/about-us" className="cursor-pointer">
              About Us
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* <Link
              href="/listing"
              className="bg-blue-950 text-white rounded px-3 py-1 text-sm"
            >
              List your media
            </Link> */}

             <Link
              href="/listing-dashboard"
              className="bg-blue-950 text-white rounded px-3 py-1 text-sm"
            >
              {tokenGet ? "Dashboard" : "List your media"}
            </Link>

            {/* <Heart color="white" size={18} /> */}
            {/* <Link
              href="/login"
              className="bg-white text-[#EE1858] font-bold rounded px-3 py-1 text-sm"
            >
              Login
            </Link> */}

            {tokenGet ? (
              <button
                onClick={logout}
                className="hidden sm:block bg-blue-950 px-3 py-1 text-sm rounded hover:bg-gray-600 transition cursor-pointer text-gray-200 flex items-center gap-2"
              >
                Logout 
              </button>
            ) : (
              <Link
              href="/login"
              className="bg-white text-[#EE1858] font-bold rounded px-3 py-1 text-sm"
            >
              Login
            </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? (
                <X color="white" size={28} />
              ) : (
                <Menu color="white" size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-gradient-to-t from-[#EE1858] to-[#880E32] z-40 flex flex-col text-white px-6 py-6 text-sm overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            {/* <img src="/properties/White logo.webp" className="h-8" alt="Logo" /> */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/properties/White-logo.webp"
                  alt="Logo"
                  width={100} // Adjust width/height as needed
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <button onClick={toggleMenu}>
              <X color="white" size={28} />
            </button>
          </div>

          <div className="space-y-4">
            <Dropdown
              label="City"
              mobile
              options={[
                "Delhi",
                "Noida",
                "Gurgaon",
                "Dehradun",
                "Mumbai",
                "Bangalore",
                "Lucknow",
                "Kolkata",
              ]}
            />
            <Dropdown
              label="Bill Board"
              mobile
              options={["Traditional (Static)", "Board 2", "Board 3"]}
            />
            <Dropdown
              label="Digital Board"
              mobile
              options={["Traditional (Static)", "Board 2", "Board 3"]}
            />
            <Dropdown
              label="Unipole"
              mobile
              options={["Traditional (Static)", "Board 2", "Board 3"]}
            />
            <Dropdown
              label="Transit Media"
              mobile
              options={["Traditional (Static)", "Board 2", "Board 3"]}
            />
            <div>
              <Link href="/blogs" className="border-b border-white/20 pb-2">
                Blog
              </Link>
            </div>
            <div>
              <Link href="/about-us" className="border-b border-white/20 pb-2">
                About Us
              </Link>
            </div>
            {/* <div className="border-b border-white/20 pb-2">Blog</div>
            <div className="border-b border-white/20 pb-2">About Us</div> */}
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <Link
              href="/listing"
              className="bg-blue-950 text-white rounded px-4 py-2 text-sm"
            >
               {tokenGet ? "Dashboard" : "List your media"}
            </Link>
            {/* <Link
              href="/login"
              className="bg-white text-[#EE1858] font-bold rounded px-4 py-2 text-sm"
            >
              Login
            </Link> */}
            {tokenGet ? (
              <button
                onClick={logout}
                className="sm:block bg-blue-950 px-3 py-2 text-sm rounded hover:bg-gray-600 transition cursor-pointer text-gray-200 flex items-center gap-2"
              >
                Logout 
              </button>
            ) : (
              <Link
              href="/login"
              className="bg-white text-[#EE1858] font-bold rounded px-4 py-2 text-sm"
            >
              Login
            </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
