import React from 'react';

const ContactInfo = () => {
  return (
    <div className="flex-1 px-4 lg:px-10  shadow-lg md:mb-4 py-6 md:py-1 lg:py-6 text-white">
      <h3 className="text-lg sm:text-xl md:text-2xl  font-bold mb-2 lg:mb-4 md:mb-1 border-b border-white inline-block pb-1">
        How Can Rahane Media Assist You?
      </h3>

      <div className="space-y-6 md:space-y-4 pt-2 text-sm sm:text-base">
        {/* Section 1 */}
        <div>
          <p className="font-semibold text-sm sm:text-base">Got a Requirement?</p>
          <p className="md:pt-1 pt-2 lg:pt-2 text-xs sm:text-sm leading-relaxed">
            Share your advertising objectives with us — our team will respond with tailored,
            strategic, and high-impact media solutions.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <p className="font-semibold text-sm sm:text-base">Have a Question?</p>
          <p className="md:pt-1 pt-2 lg:pt-2 text-xs sm:text-sm leading-relaxed">
            Need assistance or details? Connect with our experts — we're ready to support you
            every step of the way.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <p className="font-semibold text-sm sm:text-base">Want to Share a Thought?</p>
          <p className="md:pt-1 pt-2 lg:pt-2 text-xs sm:text-sm leading-relaxed ">
            We value your input! Send us your ideas and feedback as we strive to improve and
            innovate continuously.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
