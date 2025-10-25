"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// A single, reusable FAQ item component
function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="py-5 border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left font-semibold text-lg text-gray-800"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{faq.question}</span>
        <ChevronDown
          className={`flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
          size={20}
        />
      </button>
      
      {/* The answer panel that slides open and closed */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 text-gray-600 leading-relaxed">
            <p>{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// The main container for the FAQ section
export default function FAQSection({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // If there are no FAQs for the course, don't render anything
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const handleItemClick = (index) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={activeIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
