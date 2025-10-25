"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BillboardNav from "../../app/filters/FilterClientLocation";
import Hero from "./Herosection/page";
import About from "./about/page";
import Map from "./Map--view/map";
import ExploreSimilarSection from "./Explore-similar/ExploreSimilarSection";
import Banner from "./Banner/page";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const Billboard = () => {
  const [listingData, setListingData] = useState(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/media-listing/slug/${slug}`);
        const data = await res.json();
        console.log("Fetched data:", data); // Check structure
        if (data.success) {
          setListingData(data.data); // May need `data.data[0]` depending on API
        }
      } catch (error) {
        console.log("error fetching media data", error);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <div>
      <BillboardNav />
      {listingData ? (
        <>
          <Hero data={listingData} />
          <About data={listingData} />
          <Map data={listingData} />
          <ExploreSimilarSection />
          <Banner />
        </>
      ) : (
        <div className="text-center py-20">Loading...</div>
      )}
    </div>
  );
};

export default Billboard;
