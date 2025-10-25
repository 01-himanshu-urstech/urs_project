interface JobDetailsProps {
  salary: string;
  jd: string;
  requirement: string[];
  responsibility: string[];
}

const JobDetails: React.FC<JobDetailsProps> = ({
  salary,
  jd,
  requirement,
  responsibility,
}) => {
  return (
    <div className="bg-[#fefcfd] p-4 mt-4 rounded-lg text-sm text-gray-700">
      <p className="font-semibold text-blue-800">Salary/Stipend:</p>
      <p className="mb-4">{salary}</p>

      <p className="font-semibold text-blue-800">Job Description:</p>
      <p className="mb-4">{jd}</p>

      <p className="font-semibold text-blue-800">Responsibilities:</p>
      <ul className="list-disc list-inside mb-4">
        {responsibility.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <p className="font-semibold text-blue-800">Requirements:</p>
      <ul className="list-disc list-inside">
        {requirement.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobDetails;
