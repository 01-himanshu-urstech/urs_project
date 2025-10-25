const ApplyForm = () => {
  return (
    <form className="w-full flex flex-col gap-5">
      {[
        { id: "name", label: "Name", type: "text", placeholder: "Enter your name" },
        { id: "email", label: "Email ID", type: "email", placeholder: "Enter your email" },
        { id: "tele", label: "Mobile Number", type: "tel", placeholder: "Enter your mobile number" },
        { id: "whatsapp", label: "WhatsApp Number", type: "tel", placeholder: "Enter your WhatsApp number" },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className="w-full border text-gray-600 bg-white border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {[
        { id: "education", label: "Educational Background" },
        { id: "yourself", label: "Tell us about yourself" },
        { id: "hiring", label: "Why should we hire you" },
      ].map(({ id, label }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
          <textarea
            id={id}
            rows={4}
            className="w-full border bg-white border-gray-300 rounded-md px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div>
        <label htmlFor="resume" className="block text-sm font-bold text-gray-700 mb-1">Upload Resume (PDF)</label>
        <input
          type="file"
          id="resume"
          accept=".pdf"
          className="w-full border text-gray-600 bg-white border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-700 font-semibold cursor-pointer text-white px-6 py-2 rounded-md w-full sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default ApplyForm;
