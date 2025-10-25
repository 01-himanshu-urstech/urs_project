"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const apiurl = process.env.NEXT_PUBLIC_BASE_URL;

interface Media {
  _id: string;
  media_id: string;
  media_status: number;
}

const EditBooking = () => {
  const router = useRouter();
  const { id } = useParams();

  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [mediaId, setMediaId] = useState<string>("");
  const [totalCost, setTotalCost] = useState<string>("");
  const [addingCosts, setAddingCosts] = useState<string[]>([""]);
  const [listedBy, setListedBy] = useState<string>("");
  const [purchaseMediaUserName, setPurchaseMediaUserName] =
    useState<string>("");
  const [bookingStatus, setBookingStatus] = useState<string>("1");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fetchMediaList = async () => {
    try {
      const response = await axios.get(`${apiurl}/media-get`);
      if (response.data.success) {
        setMediaList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching media list:", error);
    }
  };

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`${apiurl}/booking-get/${id}`);
      if (response.data.success) {
        const data = response.data.data;
        setMediaId(data.media_id || "");
        setTotalCost(data.total_cost?.toString() || "");
        setAddingCosts(
          data.adding_cost?.map((v: number) => v.toString()) || [""]
        );
        setListedBy(data.listed_by || "");
        setPurchaseMediaUserName(data.purchase_media_user_name || "");
        setBookingStatus(data.booking_status?.toString() || "1");
        setStartDate(data.start_date || "");
        setEndDate(data.end_date || "");
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  useEffect(() => {
    fetchMediaList();
    if (id) fetchBooking();
  }, [id]);

  const handleStatusChange = (value: string) => {
    setBookingStatus(value);
    if (value === "1") {
      setStartDate("");
      setEndDate("");
    }
  };

  const handleAddCostField = () => {
    setAddingCosts([...addingCosts, ""]);
  };

  const handleRemoveCostField = (index: number) => {
    const updated = [...addingCosts];
    updated.splice(index, 1);
    setAddingCosts(updated);
  };

  const handleCostChange = (value: string, index: number) => {
    const updated = [...addingCosts];
    updated[index] = value;
    setAddingCosts(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mediaId || !totalCost || !listedBy || !purchaseMediaUserName) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      (bookingStatus === "0" || bookingStatus === "2") &&
      (!startDate || !endDate)
    ) {
      alert("Please provide start and end dates.");
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      const payload = {
        media_id: mediaId,
        total_cost: Number(totalCost),
        adding_cost: addingCosts
          .map((cost) => cost.trim())
          .filter((cost) => cost !== "")
          .map((cost) => Number(cost)),
        listed_by: listedBy,
        purchase_media_user_name: purchaseMediaUserName,
        booking_status: bookingStatus,
        start_date: startDate,
        end_date: endDate,
      };

      const response = await axios.put(
        `${apiurl}/booking-update/${id}`,
        payload
      );

      if (response.data.success) {
        setSuccessMessage("Booking updated successfully!");
        setTimeout(() => {
          router.push("/booking-media");
        }, 1200);
      } else {
        setErrorMessage(response.data.message || "Failed to update booking.");
      }
    } catch (error: any) {
      console.error("Error updating booking:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update booking."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow-md mt-28">
      {errorMessage && (
        <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-2 py-1">
          {errorMessage}
        </div>
      )}

      <h1 className="text-xl font-semibold mb-4">Update Booking</h1>

      {successMessage && (
        <div className="mb-4 text-green-600 bg-green-100 border border-green-300 rounded px-2 py-1">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Media Dropdown */}
          <div>
            <label className="block font-medium mb-1">Media</label>
            <select
              value={mediaId}
              onChange={(e) => setMediaId(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Media</option>
              {mediaList.map((media) => (
                <option key={media._id} value={media.media_id}>
                  {media.media_id}
                </option>
              ))}
            </select>
          </div>

          {/* Total Cost */}
          <div>
            <label className="block font-medium mb-1">Total Cost</label>
            <input
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter total cost"
              required
            />
          </div>

          {/* Listed By */}
          <div>
            <label className="block font-medium mb-1">Listed By</label>
            <input
              type="text"
              value={listedBy}
              onChange={(e) => setListedBy(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter who listed"
              required
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="block font-medium mb-1">Client Name</label>
            <input
              type="text"
              value={purchaseMediaUserName}
              onChange={(e) => setPurchaseMediaUserName(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter client name"
              required
            />
          </div>

          {/* Booking Status */}
          
          <div>
            <label className="block font-medium mb-1">Booking Status</label>
            <select
              value={bookingStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="1">Available</option>
              {/* <option value="0">Booked</option> */}
              <option value="2">Not Available</option>
            </select>
          </div>

          {/* Dates (conditional) */}
          {(bookingStatus === "0" || bookingStatus === "2") && (
            <>
              <div>
                <label className="block font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </>
          )}
        </div>

        {/* Dynamic Adding Cost Fields */}
        <div>
          <label className="block font-medium mb-2">Adding Costs</label>
          {addingCosts.map((cost, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="number"
                value={cost}
                onChange={(e) => handleCostChange(e.target.value, index)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Adding Cost #${index + 1}`}
              />
              {addingCosts.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCostField(index)}
                  className="text-red-500 font-bold"
                  title="Remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCostField}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >
            + Add Cost
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
        >
          {loading ? "Updating..." : "Update Booking"}
        </button>
      </form>
    </div>
  );
};

export default EditBooking;
