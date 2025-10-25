"use client";
import { useState } from "react";
import { Send } from "lucide-react";

const stateCityData = {
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Karol Bagh"],
  "Uttar Pradesh": ["Noida", "Lucknow", "Varanasi", "Kanpur", "Ghaziabad"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
};

export default function EnquirySidebar({ courseTitle }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    code: "+91",
    phone: "",
    department: "",
    course: courseTitle || "",
    state: "",
    city: "",
    message: "",
    consent: false,
  });

  const inputStyle =
    "w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent";

  const handle = (k, v) => {
    // If State changes → reset city
    if (k === "state") {
      setForm((s) => ({ ...s, state: v, city: "" }));
    } else {
      setForm((s) => ({ ...s, [k]: v }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry submitted:", form);

    setForm({
      name: "",
      email: "",
      code: "+91",
      phone: "",
      department: "",
      course: courseTitle || "",
      state: "",
      city: "",
      message: "",
      consent: false,
    });
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-md">
      <h2 className="mb-3 text-lg font-bold text-orange-600">Enquiry</h2>

      <form onSubmit={onSubmit} className="space-y-3 text-gray-900">
        <input
          className={inputStyle}
          placeholder="Enter Name *"
          value={form.name}
          onChange={(e) => handle("name", e.target.value)}
          required
        />

        <input
          type="email"
          className={inputStyle}
          placeholder="Enter Email Address *"
          value={form.email}
          onChange={(e) => handle("email", e.target.value)}
          required
        />

        <div className="flex gap-2">
          <select
            className={` ${inputStyle} max-w-[90px]`}
            value={form.code}
            onChange={(e) => handle("code", e.target.value)}
          >
            <option>+91</option>
            <option>+1</option>
            <option>+44</option>
          </select>

          <input
            type="tel"
            className={`${inputStyle} flex-1`}
            placeholder="Enter Mobile Number *"
            value={form.phone}
            onChange={(e) => handle("phone", e.target.value)}
            required
          />
        </div>

        <select
          className={inputStyle}
          value={form.department}
          onChange={(e) => handle("department", e.target.value)}
          required
        >
          <option value="">Organizations Type *</option>
          <option>Individual</option>
          <option>University</option>
          <option>Company</option>
        </select>

        <input
          className={inputStyle}
          value={form.course}
          onChange={(e) => handle("course", e.target.value)}
          required
        />

        {/* ✅ State Selector */}
        <select
          className={inputStyle}
          value={form.state}
          onChange={(e) => handle("state", e.target.value)}
          required
        >
          <option value="">Select State *</option>
          {Object.keys(stateCityData).map((st) => (
            <option key={st}>{st}</option>
          ))}
        </select>

        {/* ✅ City Selector (Changes Based On State) */}
        <select
          className={inputStyle}
          value={form.city}
          onChange={(e) => handle("city", e.target.value)}
          required
          disabled={!form.state}
        >
          <option value="">{form.state ? "Select City *" : "Choose State First"}</option>
          {form.state &&
            stateCityData[form.state].map((city) => (
              <option key={city}>{city}</option>
            ))}
        </select>

        <textarea
          rows={4}
          className={`${inputStyle} resize-none`}
          placeholder="Type Your Enquiry Here"
          value={form.message}
          onChange={(e) => handle("message", e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-md bg-orange-600 py-2.5 font-semibold text-white hover:bg-orange-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
