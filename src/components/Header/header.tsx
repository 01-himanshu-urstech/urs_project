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
  role_id: number; // 👈 role_id is inside the token
  exp?: number;
}
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const [roleId, setRoleId] = useState<number | null>(null); // 👈 store role_id
  const [tokenGet, setToken] = useState<string | null>(null);
  const logout = useLogout();

  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setToken(token);
        setRoleId(decoded.role_id); // 👈 get role_id from token
      } catch (err) {
        console.error("Invalid token", err);
        setToken(null);
        setRoleId(null);
      }
    }
  }, []);

  // ✅ Helper for active link
  const linkClass = (href: string) =>
    `px-5 py-1.5 rounded-full transition-all duration-200 ${
      pathname === href
        ? "border border-orange-300 text-orange-300 font-semibold"
        : "hover:border hover:border-orange-300 hover:text-orange-300"
    }`;

  return (
    <nav className="bg-white fixed w-full z-50 top-0 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/properties/logo.png"
                alt="Logo"
                width={160}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-md font-medium">
            <Link href="/about-us" className={linkClass("/about-us")}>
              About Us
            </Link>
            <Link href="/courses" className={linkClass("/courses")}>
              Courses
            </Link>
            {tokenGet ? (
              // ✅ User is logged in
              roleId == 1 ? (
                <Link
                  href="/dashboard"
                  className={linkClass("/dashboard")}
                >
                  Dashboard
                </Link>
              ) : roleId == 2 ? (
                <Link
                  href="/dashboard"
                  className={linkClass("/dashboard")}
                >
                  Dashboard
                </Link>
              ) : null
            ) : (
              // ❌ User is not logged in
              <>
                <Link
                  href="/login"
                  className={linkClass("/join-trainer")}
                >
                  Join As Trainer
                </Link>
                <Link
                  href="/login"
                  className={linkClass("/find-trainer")}
                >
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

          {/* Right Side Buttons */}
          {tokenGet ? (
            <button
              onClick={logout}
              className="hidden md:inline-block px-6 py-2 rounded-full border border-orange-300 hover:bg-orange-50 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-block px-6 py-2 rounded-full border border-orange-300 hover:bg-orange-50 transition"
            >
              Sign In ↗
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col px-6 py-4 gap-4 text-sm">
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

          {/* ✅ Condition for mobile too */}
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

          {/* Login / Logout */}
          {tokenGet ? (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="px-4 py-2 rounded-full border border-orange-300 hover:bg-orange-50 transition text-center"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={toggleMenu}
              className="px-4 py-2 rounded-full border border-orange-300 hover:bg-orange-50 transition text-center"
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
