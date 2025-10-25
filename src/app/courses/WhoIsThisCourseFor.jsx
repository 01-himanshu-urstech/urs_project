"use client";

import { Users } from 'lucide-react';

export default function WhoIsThisCourseFor({ audience }) {
  // If there's no data for this section, don't render anything
  if (!audience || audience.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Who this course is for</h2>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <ul className="space-y-4">
          {audience.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-800">
              <Users size={18} className="text-gray-500 mt-1 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
