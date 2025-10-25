"use client";
import React, { useEffect, useState } from "react";
import BillboardCard from "./BillboardCard";
const url = process.env.NEXT_PUBLIC_BASE_URL;

interface MediaListing {
  _id: string;
  tag_name: string;
  title: string;
  slug: string;
  city: string;
  landmark: string;
  display_size: string;
  category_name: string;
  day_view_images: string[];
  createdAt: string;
}

const ExploreSimilarSection: React.FC = () => {
  const [mediaData, setMediaData] = useState<MediaListing[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`${url}/media-listings/filter`);
        const json = await res.json();

        if (json.success) {
          const sorted = json.data
            .sort(
              (a: MediaListing, b: MediaListing) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 4);
          setMediaData(sorted);
        }
      } catch (error) {
        console.error("Error fetching media listings:", error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <section className="my-10 px-4 sm:px-6 lg:px-20">
      <h2 className="text-2xl font-bold text-[#070344] mb-6">
        Explore Similar Media
      </h2>

      {/* Desktop and Tablet View */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaData.map((item, index) => (
          <BillboardCard
            key={index}
            tag={item.tag_name || "New"}
            tagColor="green"
            title={item.title}
            slug={item.slug}
            location={`${item.landmark}, ${item.city}`}
            size={item.display_size || "N/A"}
            type={item.category_name || "Bill Board"}
            imageUrl={item.day_view_images?.[0] || "/placeholder.jpg"}
          />
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {mediaData.map((item, index) => (
            <div key={index} className="min-w-[220px]">
              <BillboardCard
                tag={item.tag_name || "New"}
                tagColor="green"
                title={item.title}
                slug={item.slug}
                location={`${item.landmark}, ${item.city}`}
                size={item.display_size || "N/A"}
                type={item.category_name || "Bill Board"}
                imageUrl={item.day_view_images?.[0] || "/placeholder.jpg"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSimilarSection;
