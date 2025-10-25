"use client";
import { MapPin, Laptop } from "lucide-react";
import JobDetails from "./JobDetails";
import Link from "next/link";
import { useState } from "react";

interface JobCardProps {
  _id: string;
  department: string;
  title: string;
  location: string;
  type: string;
  slug: string;
  salary: string;
  jd: string;
  requirement: string[];
  responsibility: string[];
}

const JobCard: React.FC<JobCardProps> = ({
  _id,
  department,
  title,
  location,
  type,
  slug,
  salary,
  jd,
  requirement,
  responsibility,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#fefcfd] p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-semibold text-blue-800">
        {title}
      </h2>

      <div className="flex flex-wrap gap-4 mt-2 text-sm font-medium text-[#070344]">
        <div className="flex items-center gap-1">
          <MapPin size={16} /> {location}
        </div>
        <div className="flex items-center gap-1">
          <Laptop size={16} /> {type}
        </div>
      </div>

      <div className="flex flex-wrap flex-row-reverse gap-3 mt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-blue-100 rounded-3xl text-sm cursor-pointer font-semibold text-blue-800 px-4 py-2"
        >
          {showDetails ? "Hide details" : "See details →"}
        </button>

        {/* <Link href={`/careers/${slug}`}>
          <button className="bg-blue-100 rounded-3xl text-sm cursor-pointer font-semibold text-blue-800 px-4 py-2">
            Apply Now
          </button>
        </Link> */}
        <Link
          href={{
            pathname: `/careers/${slug}`,
            query: {
              id: _id, // career_id
              department,
            },
          }}
        >
          <button className="bg-blue-100 rounded-3xl text-sm cursor-pointer font-semibold text-blue-800 px-4 py-2">
            Apply Now
          </button>
        </Link>
      </div>

      {showDetails && (
        <JobDetails
          salary={salary}
          jd={jd}
          requirement={requirement}
          responsibility={responsibility}
        />
      )}
    </div>
  );
};

export default JobCard;
