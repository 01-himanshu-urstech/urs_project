import React from "react";
import { Image, MapPin } from "lucide-react";
import DetailsForm from '../detail-form/page';
const About = ({ data }: { data: any }) => {
  return (
    <div className="px-6 lg:px-20 py-10">
      {/* Heading & Action Buttons */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <h1 className="text-[#070344] font-bold text-xl lg:text-2xl">
          Airport media advertising - {data?.title || "Loading..."}
        </h1>
        <div className="flex gap-4 font-semibold text-xs lg:mt-1">
          <div className="flex items-center gap-1">
            <MapPin color="#E81856" className="size-4" />
            {/* <button className="text-[#E81856]">View on Map</button> */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${data?.full_address}, ${data?.landmark}, ${data?.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E81856]"
            >
              {/* <ImLocation2 className="text-blue-950 mr-1" /> */}
              View on Map
            </a>
          </div>
        </div>
      </div>

      {/* Layout Container */}
      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        {/* Left Section: Description & Details */}
        <div className="flex-1">
          <div className="text-[#070344] font-semibold text-sm">
            <h3>{data?.full_address || ""}</h3>
            <h3>
              {data?.landmark || ""},{data?.city || ""}
            </h3>
          </div>

          <hr className="my-4" />

          <h3 className="text-base font-bold text-[#070344]">
            About this Media Spot
          </h3>
          <p className="text-sm text-[#070344] mt-2">
            {data?.about_media || ""}
          </p>

          <h3 className="text-base font-bold text-[#070344] mt-6">
            Media Details
          </h3>
          <div className="grid grid-cols-2 gap-x-6 text-xs text-[#070344] font-semibold mt-4">
            <div>
              <div className="pb-4">
                <p>Media Id</p>
                <p>{data?.media_id || ""}</p>
              </div>
              <div className="pb-4">
                <p>Media Type</p>
                <p>{data?.category_name || ""}</p>
              </div>
              <div className="pb-4">
                <p>Visibility</p>
                <p>{data?.visibility || ""}</p>
              </div>
              <div className="pb-4">
                <p>Campaign Types</p>
                <p>{data?.campaign_type || ""}</p>
              </div>
              <div className="pb-4">
                <p>Smart Features</p>
                <p>{data?.smart_feature || ""}</p>
              </div>
             
            </div>
            <div>
              <div className="pb-4">
                <p>Lighting</p>
                <p>{data?.lighting || ""}</p>
              </div>
              
              <div className="pb-4">
                <p>Display Size</p>
                <p>{data?.display_size || "15 x 10 ft (150 sq. ft.)"}</p>
              </div>
               <div className="pb-4">
                <p>Live Monitoring</p>
                <p>{data?.live_monitoring || ""}</p>
              </div>
              <div className="pb-4">
                <p>Placement Type</p>
                <p>
                  {data?.placement_type ||
                    "Eye-Level / Elevated / Corner Facing"}
                </p>
              </div>
              <div className="pb-4">
                <p>Loop Duration</p>
                <p>{data?.loop_duration || "60s (max 6 brands/loop)"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Quote Form */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white shadow-[-1px_1px_6px_10px_rgba(0,_0,_0,_0.1)] rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#070344] leading-tight">
              Get a <span className="text-[#E7135C]">Tailored Quote</span> for
              Your
            </h2>
            <h2 className="text-xl font-bold text-[#070344] mb-3">
              Next Campaign
            </h2>

            <p className="text-xs text-[#070344] mb-5">
              Let us know what you're looking for, and we'll deliver a
              customized media solution built for your brand's goals. Fill in
              your details and our team will reach out shortly.
            </p>
            <DetailsForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
