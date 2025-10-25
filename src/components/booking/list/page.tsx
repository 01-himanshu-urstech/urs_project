"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";
import Link from "next/link";

const url = process.env.NEXT_PUBLIC_BASE_URL;

interface Tag {
  _id: string;
  media_id: string;
  total_cost: string;
  adding_cost: string[];
  listed_by: string;
  purchase_media_user_name: string;
  booking_status: string | number;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
}

const List: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
const [listedBy, setListedBy] = useState<string>("");

  const limit = 10;

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userTokenTrainerAgregator"); // or wherever you store your token

      const response = await axios.get(`${url}/booking-getuserwise`, {
        params: { page, limit, search },
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in Authorization header
        },
      });

      // if (response.data.success) {
      //   setTags(response.data.data);
      //   setTotalPages(response.data.pagination?.totalPages || 1);
      // }

      // After fetching data
if (response.data.success) {
  setTags(response.data.data);

  // pick first booking's listed_by (all will be same)
  if (response.data.data.length > 0) {
    const listedByName = response.data.data[0].listed_by;
    setListedBy(listedByName); // <-- save in state
  }

  setTotalPages(response.data.pagination?.totalPages || 1);
}

    } catch (error) {
      console.error("Error fetching booking:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${url}/booking-delete/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const renderStatus = (status: string | number) => {
    const statusNum = Number(status);
    if (statusNum === 1)
      return <span className="text-green-600 font-semibold">Active</span>;
    if (statusNum === 0)
      return <span className="text-yellow-600 font-semibold">Suspended</span>;
    if (statusNum === 2)
      return <span className="text-red-600 font-semibold">Not Available</span>;
    return <span className="text-gray-600 font-semibold">Unknown</span>;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "--";
    return new Date(dateString)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  };

  const calculateLeftCost = (total: string, addingCosts: string[]) => {
    const totalCost = Number(total) || 0;
    const addedTotal = addingCosts.reduce(
      (sum, cost) => sum + (Number(cost) || 0),
      0
    );
    return totalCost - addedTotal;
  };

  return (
    <div className="md:px-10 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* <Link
          href="/booking-media/create"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-lg relative"
        >
          Create Booking
          <span className="ml-2 text-red-700 bg-blue-100 text-sm font-bold px-2 py-0.5 rounded-full">
            {tags.length}
          </span>
        </Link> */}
       {/* Header */}
<div className="flex items-center justify-between mb-4">
  <div className="inline-flex items-center text-gray-700 font-medium px-3 py-1 rounded-lg relative">
    Hey,&nbsp;
    <span className="text-sm font-bold  py-0.5 rounded-full">
      {listedBy
  ? listedBy.charAt(0).toUpperCase() + listedBy.slice(1).toLowerCase()
  : "User"}

    </span>
  </div>
</div>

      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search media..."
          className="w-full md:w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-3 border-b">Media Id</th>
              <th className="px-4 py-3 border-b">Total / Left Payment</th>
              <th className="px-4 py-3 border-b">Payment Received History</th>
              {/* <th className="px-4 py-3 border-b">Listed By</th> */}
              {/* <th className="px-4 py-3 border-b">Client Name</th> */}
              <th className="px-4 py-3 border-b"> Status</th>
              <th className="px-4 py-3 border-b">Start Date</th>
              <th className="px-4 py-3 border-b">End Date</th>
              {/* <th className="px-4 py-3 border-b">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : tags.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-4">
                  No bookings found.
                </td>
              </tr>
            ) : (
              tags.map((cat) => {
                const statusNum = Number(cat.booking_status);
                const costLeft = calculateLeftCost(
                  cat.total_cost,
                  cat.adding_cost
                );
                return (
                  <tr
                    key={cat._id}
                    className="text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 border-b">{cat.media_id}</td>
                    <td className="px-4 py-2 border-b">
                      <div>Total : ₹ {cat?.total_cost}</div>
                      <div className="text-green-700">Left : ₹ {costLeft}</div>
                    </td>
                    <td className="px-4 py-2 border-b align-top">
                      {cat.adding_cost.length > 0 ? (
                        <ol
                          style={{ listStyleType: "lower-roman" }}
                          className="list-inside"
                        >
                          {cat.adding_cost.map((cost, index) => (
                            <li key={index}>) ₹ {parseFloat(cost)}</li>
                          ))}
                        </ol>
                      ) : (
                        "--"
                      )}
                    </td>

                    {/* <td className="px-4 py-2 border-b">{cat.listed_by}</td> */}
                    {/* <td className="px-4 py-2 border-b">
                      {cat.purchase_media_user_name}
                    </td> */}
                    <td className="px-4 py-2 border-b">
                      {renderStatus(cat.booking_status)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {formatDate(cat.start_date)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {formatDate(cat.end_date)}
                    </td>
                    {/* <td className="px-4 py-4 border-b  items-center gap-2">
                      {(cat.booking_status === "1" ||
                        cat.booking_status === "2") && (
                        <>
                          <Link
                            href={`/booking-media/edit/${cat._id}`}
                            className="text-blue-500 hover:underline"
                          >
                            <MdOutlineModeEditOutline size={20} />
                          </Link>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            className="text-red-500 ml-2"
                          >
                            <MdOutlineDelete size={20} />
                          </button>
                        </>
                      )}
                    </td> */}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 text-gray-700 font-medium rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
