import Link from "next/link";
import Image from "next/image";
import { Linkedin, X, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#ff6411] to-[#FF8C42] text-white py-12 px-4">
      {/* Main content: 4 columns with one empty for spacing */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {/* Logo and Description */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className=" rounded-full p-2">
              <Image 
                src="/properties/icononly_transparent_nobuffer.png" 
                alt="skill strategix" 
                width={40} 
                height={40}
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-wide">Skill Strategix</span>
          </div>
          <p className="text-sm text-white/95 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aliquam hic ipsa labore quisquam iusto ipsum atque veritatis? Quis quam, at nisi possimus quod beatae totam corporis esse explicabo, ipsam, autem officia ea!
          </p>
        </div>

        {/* Empty column for spacing */}
        <div className="hidden lg:block"></div>

        {/* Contact Information */}
        <div>
          <h4 className="font-bold text-lg mb-4 tracking-wide">CONTACTS</h4>
          <div className="space-y-3 text-sm text-white/95">
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:+919310240714" className="hover:underline hover:text-white">
                  +91 98112 55599
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:contact@urstechsolution.com" className="hover:underline hover:text-white break-all">
                  connect@infosurgeexpert.co.in
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Address: </span>Infosurge Expert LLP 15th Floor, E SQUARE, C2, Sector 96,
                <br />
                Noida, Uttar Pradesh 201304
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-bold text-lg mb-4 tracking-wide">SOCIAL MEDIA</h4>
          <div className="flex gap-4 mb-4">
            <a 
              href="#" 
              aria-label="LinkedIn" 
              className="hover:scale-110 transition-transform duration-200 hover:opacity-80"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              aria-label="X" 
              className="hover:scale-110 transition-transform duration-200 hover:opacity-80"
            >
              <X className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              aria-label="Facebook" 
              className="hover:scale-110 transition-transform duration-200 hover:opacity-80"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              aria-label="Instagram" 
              className="hover:scale-110 transition-transform duration-200 hover:opacity-80"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-white/95">
            Follow us on social media for more updates.
          </p>
        </div>
      </div>

      {/* Bottom Footer Links */}
      <div className="max-w-7xl mx-auto border-t border-white/50 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm gap-3">
        <div className="text-white/90">
          © Copyright 2024 | All rights reserved.
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link 
            href="/career" 
            className="text-white hover:underline hover:text-white/90 transition-all duration-200"
          >
            Career
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-white hover:underline hover:text-white/90 transition-all duration-200"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms-conditions" 
            className="text-white hover:underline hover:text-white/90 transition-all duration-200"
          >
            Terms &amp; Conditions
          </Link>
          <Link 
            href="/payment-policy" 
            className="text-white hover:underline hover:text-white/90 transition-all duration-200"
          >
            Payment Policy
          </Link>
        </div>

      </div>
    </footer>
  );
}