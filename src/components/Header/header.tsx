"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import useLogout from "@/hooks/useLogout";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role_id: number;
  exp?: number;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const [roleId, setRoleId] = useState<number | null>(null);
  const [tokenGet, setToken] = useState<string | null>(null);
  const logout = useLogout();

  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setToken(token);
        setRoleId(decoded.role_id);
      } catch (err) {
        console.error("Invalid token", err);
        setToken(null);
        setRoleId(null);
      }
    }
  }, []);

  // ✅ Updated helper with tighter spacing at md: breakpoint
  const linkClass = (href: string) =>
    `px-2 md:px-3 lg:px-5 py-1.5 rounded-full transition-all duration-200 text-xs md:text-sm lg:text-base ${
      pathname === href
        ? "border border-orange-300 text-orange-300 font-semibold"
        : "hover:border hover:border-orange-300 hover:text-orange-300"
    }`;

  return (
    <nav className="bg-white fixed w-full z-50 top-0 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/properties/logo.png"
                alt="Logo"
                width={160}
                height={60}
                className="h-10 sm:h-11 lg:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu - reduced gap and font size at md: */}
          <div className="hidden md:flex items-center gap-1 md:gap-2 lg:gap-4 xl:gap-6 text-xs md:text-sm lg:text-base font-medium">
            <Link href="/about-us" className={linkClass("/about-us")}>
              About Us
            </Link>
            <Link href="/courses" className={linkClass("/courses")}>
              Courses
            </Link>
            {tokenGet ? (
              roleId == 1 ? (
                <Link href="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                </Link>
              ) : roleId == 2 ? (
                <Link href="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                </Link>
              ) : null
            ) : (
              <>
                <Link href="/login" className={linkClass("/join-trainer")}>
                  Join As Trainer
                </Link>
                <Link href="/login" className={linkClass("/find-trainer")}>
                  Job Poster
                </Link>
              </>
            )}
            <Link href="/blogs" className={linkClass("/blogs")}>
              Blogs
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact Us
            </Link>
          </div>

          {/* Right Side Buttons - reduced spacing at md: */}
          {tokenGet ? (
            <button
              onClick={logout}
              className="hidden md:inline-block px-3 md:px-4 lg:px-5 xl:px-6 py-1.5 md:py-2 text-xs md:text-sm lg:text-base rounded-full border border-orange-300 hover:bg-orange-50 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-block px-3 md:px-4 lg:px-5 xl:px-6 py-1.5 md:py-2 text-xs md:text-sm lg:text-base rounded-full border border-orange-300 hover:bg-orange-50 transition"
            >
              Sign In ↗
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col px-4 sm:px-6 py-4 gap-3 sm:gap-4 text-sm sm:text-base">
          <Link
            href="/about-us"
            onClick={toggleMenu}
            className={linkClass("/about-us")}
          >
            About Us
          </Link>
          <Link
            href="/courses"
            onClick={toggleMenu}
            className={linkClass("/courses")}
          >
            Courses
          </Link>
          <Link
            href="/find-trainer"
            onClick={toggleMenu}
            className={linkClass("/find-trainer")}
          >
            Find Trainer
          </Link>

          {tokenGet ? (
            <Link
              href="/dashboard"
              onClick={toggleMenu}
              className={linkClass("/dashboard")}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/join-trainer"
              onClick={toggleMenu}
              className={linkClass("/join-trainer")}
            >
              Join As Trainer
            </Link>
          )}

          <Link
            href="/blogs"
            onClick={toggleMenu}
            className={linkClass("/blogs")}
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className={linkClass("/contact")}
          >
            Contact Us
          </Link>

          {tokenGet ? (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="px-4 py-2 sm:py-2.5 rounded-full border border-orange-300 hover:bg-orange-50 transition text-center mt-2"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={toggleMenu}
              className="px-4 py-2 sm:py-2.5 rounded-full border border-orange-300 hover:bg-orange-50 transition text-center mt-2"
            >
              Sign In ↗
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
