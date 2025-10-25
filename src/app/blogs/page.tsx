"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

interface BlogType {
  _id: string;
  title: string;
  slug: string;
  image: string;
  short_description: string;
  description: string;
  createdAt: string;
}

const url = process.env.NEXT_PUBLIC_BASE_URL;

const Page: React.FC = () => {
  const [data, setData] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}/blog-get?page=1&limit=10`)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((err) => console.log("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-8 md:py-12 px-4 md:px-24 xl:max-w-[1500px] mx-auto">
      <div className="flex flex-col gap-3">
        <h2
          className={`${poppins.className} text-4xl text-center text-[#EE1858] tracking-wider font-[700] mb-2`}
        >
          Blogs
        </h2>

        <div className="w-full mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-8 lg:gap-y-12">
          {loading ? (
            <p className="col-span-3 text-center py-10">Loading...</p>
          ) : data.length > 0 ? (
            data.map((item) => (
              <Link href={`/blogs/${item.slug}`} key={item._id}>
                <div className="bg-white rounded-xl overflow-hidden w-full h-[360px] shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between h-[calc(100%-15rem)]">
                    <h3 className="text-base font-semibold text-blue-900 hover:text-blue-600 leading-snug">
                      {item.title.split(" ").length > 6
                        ? item.title.split(" ").slice(0, 6).join(" ") + "..."
                        : item.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {item.short_description.split(" ").length > 12
                        ? item.short_description
                            .split(" ")
                            .slice(0, 12)
                            .join(" ") + "..."
                        : item.short_description}{" "}
                    </p>

                    <p className="text-sm text-blue-900 mt-auto pt-4">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h2
              className={`${poppins.className} text-xl text-center text-gray-800 tracking-wider font-[500] mb-2 col-span-3`}
            >
              No <span className="text-blue-800">Blogs</span>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
