"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

interface FormDataType {
  name: string;
  email: string;
  phone: string;
  whychoseus: string;
  resume: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  whychoseus?: string;
  resume?: string;
}

const ApplyWithSlug: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const careerId = searchParams.get("id") || "";
  const departmentId = searchParams.get("department") || "";

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    whychoseus: "",
    resume: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (id: string, value: string | File | null) => {
    let error = "";

    switch (id) {
      case "name":
        if (!value || (typeof value === "string" && value.trim().length < 3)) {
          error = "Name must be at least 3 characters.";
        }
        break;
      case "email":
        if (
          !value ||
          (typeof value === "string" &&
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
        ) {
          error = "Please enter a valid email address.";
        }
        break;
      case "phone":
        if (!value || (typeof value === "string" && !/^\d{10}$/.test(value))) {
          error = "Please enter a valid 10-digit phone number.";
        }
        break;
      case "whychoseus":
        if (!value || (typeof value === "string" && value.trim().length < 10)) {
          error = "Please provide at least 10 characters.";
        }
        break;
      case "resume":
        if (!value || !(value instanceof File)) {
          error = "Please upload your resume.";
        } else if (value.type !== "application/pdf") {
          error = "Resume must be a PDF file.";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [id]: error }));
    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, resume: file }));
    validateField("resume", file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fields: (keyof FormDataType)[] = [
      "name",
      "email",
      "phone",
      "whychoseus",
      "resume",
    ];
    let hasError = false;

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) hasError = true;
    });

    if (hasError) return;

    try {
      setIsSubmitting(true);

      const data = new FormData();
      data.append("career_id", careerId);
      data.append("department_id", String(Number(departmentId)));
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("whychoseus", formData.whychoseus);
      if (formData.resume) data.append("resume", formData.resume);

      const res = await axios.post(`${url}/applicant-create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        setSuccessMessage("Application submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          whychoseus: "",
          resume: null,
        });
        setErrors({});
        setTimeout(() => setSuccessMessage(""), 3000); // hide message after 3s
      }
    } catch (err: any) {
      console.error("Error submitting application:", err.response?.data || err);
      alert(
        err.response?.data?.error ||
          "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-12 py-4 bg-white">
      <div className="lg:mx-20 bg-[#f4f8fc] p-6 md:p-10 rounded-lg">
        <h2 className="text-center text-[#EE1858] text-xl font-semibold mb-4">
          Apply Now
        </h2>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {[
            {
              id: "name",
              label: "Name",
              type: "text",
              placeholder: "Enter your name",
            },
            {
              id: "email",
              label: "Email ID",
              type: "email",
              placeholder: "Enter your email",
            },
            {
              id: "phone",
              label: "Mobile Number",
              type: "tel",
              placeholder: "Enter your mobile number",
            },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={formData[id as keyof FormDataType] as string}
                onChange={handleChange}
                className={`w-full border ${
                  errors[id as keyof FormErrors]
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-600 bg-white rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors[id as keyof FormErrors] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[id as keyof FormErrors]}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Why should we hire you
            </label>
            <textarea
              id="whychoseus"
              rows={4}
              value={formData.whychoseus}
              onChange={handleChange}
              className={`w-full border ${
                errors.whychoseus ? "border-red-500" : "border-gray-300"
              } bg-white rounded-md px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.whychoseus && (
              <p className="text-red-500 text-xs mt-1">{errors.whychoseus}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleFileChange}
              className={`w-full border ${
                errors.resume ? "border-red-500" : "border-gray-300"
              } text-gray-600 bg-white rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.resume && (
              <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-700 font-semibold cursor-pointer text-white px-6 py-2 rounded-md w-full sm:w-auto ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyWithSlug;
