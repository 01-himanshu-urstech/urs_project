// components/TestimonialCard.tsx
import { FC } from "react";
import { UserIcon } from "@heroicons/react/24/solid";

interface TestimonialCardProps {
  name: string;
  location: string;
  feedback: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  location,
  feedback,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative max-md:max-w-60">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <UserIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-gray-500 text-xs">{location}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 text-wrap">{feedback}</p>
      <div className="absolute bottom-0 left-0 h-2 w-full bg-pink-600 rounded-b-lg" />
    </div>
  );
};

export default TestimonialCard;
