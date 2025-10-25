"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

interface BlogType {
  _id: string;
  title: string;
  image: string;
  short_description: string;
  description: string;
  createdAt: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
}

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [data, setData] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Slug from useParams:", slug); // DEBUG LINE
    if (!slug) return;
    axios
      .get(`${url}/blog-get-by-slug/${slug}`)
      .then((res) => {
        console.log("API Response:", res.data); // DEBUG LINE
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((err) => console.log("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!data) {
    return (
      <h2 className="text-center text-xl text-gray-700 mt-10">
        Blog not found
      </h2>
    );
  }

  return (
    <>
      <Head>
        <title>{data.meta_title || data.title}</title>
        <meta
          name="description"
          content={data.meta_description || data.short_description}
        />
        {data.meta_keywords && (
          <meta name="keywords" content={data.meta_keywords.join(", ")} />
        )}
      </Head>

      <div className="pb-5 px-4 md:px-24 xl:max-w-[1500px] mx-auto">
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-w-7xl h-[300px] object-cover rounded-xl shadow-lg mb-8 mx-auto"
        />
        <h1
          className={`${poppins.className} text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center`}
        >
          {data.title}
        </h1>

        <p className="text-sm text-gray-500 text-center mb-4">
          {new Date(data.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        {data.short_description && (
          <p
            className="text-lg text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: data.short_description }}
          ></p>
        )}

        {data.description && (
          <div
            className="prose max-w-none prose-blue"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        )}
      </div>
    </>
  );
}
