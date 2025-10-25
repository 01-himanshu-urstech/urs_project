"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_BASE_URL;

// Department ID to name mapping
const departments = [
  { id: "all", name: "All" },
  { id: 1, name: "Engineering" },
  { id: 2, name: "Sales" },
  { id: 3, name: "Human Resources" },
  { id: 4, name: "Purchase" },
];

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${url}/career-get`,
        {
          params: {
            page: 1,
            limit: 20,
            search: searchTerm,
          },
        }
      );

      if (response.data.success) {
        setJobs(response.data.data);
        setFilteredJobs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm]);

  // useEffect(() => {
  //   const filtered = jobs.filter((job) => {
  //     const matchesDepartment =
  //       selectedDeptId === "all" || job.department == selectedDeptId;

  //     const matchesSearch =
  //       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       job.slug.toLowerCase().includes(searchTerm.toLowerCase());

  //     return matchesDepartment && matchesSearch;
  //   });

  //   setFilteredJobs(filtered);
  // }, [selectedDeptId, searchTerm, jobs]);

  return (
    <>
      <Head>
        <title>Join Our Team</title>
      </Head>

      <main className="min-h-screen px-4 py-8 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mt-8">
              Join Our <span className="text-[#EE1858]">Team</span>
            </h1>
          </div>

          {/* Filters */}
          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="bg-gray-50 py-2 px-3 rounded-md text-sm font-medium border border-gray-300 w-full sm:w-auto"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search job title or slug"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-sm placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-md w-full sm:w-auto"
            />
          </div> */}

          {/* Job List */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job: any) => <JobCard key={job._id} {...job} />)
            ) : (
              <p className="text-center text-gray-500">No jobs found.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
