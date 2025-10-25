import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Trainer Agregators | Find Top Trainers & Coaches for Every Skill",
  description:
    "Discover expert trainers and coaches for coding, design, fitness, and more. SkillConnect helps learners connect with verified educators and trainers for online and offline sessions.",
  keywords:
    "find trainers, online coaching, education platform, skill training, coding mentors, fitness trainers, design coaching, verified educators, trainer marketplace",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className="bg-white text-black overflow-x-hidden overflow-y-auto w-full">
        <Header />
        <main className="min-h-screen mt-11">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
