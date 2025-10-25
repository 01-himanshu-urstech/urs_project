'use client';

import React, { useEffect, useState } from 'react';
import MediaCard from './mediaCards';
const url = process.env.NEXT_PUBLIC_BASE_URL;

const TrendingMedia = () => {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`${url}/media-get?page=1&limit=6&search=`);
        const data = await res.json();
        if (data.success) {
          setMediaData(data.data);
        }
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-2">
        <span className="text-[#EE1858]">Trending</span> Media
      </h2>
      <p className="text-center text-[#070344] font-bold mb-8 text-sm md:text-base">
        Discover high-performing media spaces with detailed insights and real-time previews.
      </p>

      {/* Desktop Grid */}
      <div className="max-md:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaData.map((media: any, index: number) => (
          <MediaCard
            key={index}
            badge={media?.tag_name || 'New'}
            badgeColor="#EE1858"
            imageSrc={media?.day_view_images[0] || '/Media/default.webp'}
            title={media.title}
            slug={media.slug}
            location={media?.landmark + ', ' + media?.city}
            media={media?.category_name}
            type={media?.lighting}
            size={media?.display_size}
          />
        ))}
      </div>

      {/* Mobile Scroll */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap rounded-lg">
        {mediaData.map((media: any, index: number) => (
          <div key={index} className="inline-block px-2">
            <MediaCard
              badge={media?.tag_name || 'New'}
              badgeColor="#EE1858"
              imageSrc={media?.day_view_images[0] || '/Media/default.webp'}
              title={media?.title}
            slug={media.slug}
              location={media?.landmark + ', ' + media?.city}
              media={media?.category_name}
              type={media?.lighting}
              size={media?.display_size}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingMedia;
