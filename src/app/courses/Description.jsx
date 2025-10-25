"use client"; // This is crucial to make it an interactive client component

import { useState } from 'react';

// The component takes the long description text as a prop
export default function Description({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250; // Character limit before truncating

  // If the text is short, just display it without a "See more" button
  if (text.length <= maxLength) {
    return <p className="text-gray-700 leading-relaxed">{text}</p>;
  }

  return (
    <div>
      <p className="text-gray-700 leading-relaxed">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="font-bold text-blue-600 hover:underline mt-2"
      >
        {isExpanded ? 'See less' : 'See more'}
      </button>
    </div>
  );
}
