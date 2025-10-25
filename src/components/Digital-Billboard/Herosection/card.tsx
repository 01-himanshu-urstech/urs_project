import React from 'react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  name: string;
  imageUrl: string;
  day: string;
  view: LucideIcon;
}

const Card: React.FC<CardProps> = ({ name, imageUrl, day, view: Icon }) => {
  return (
    <div>
      <div className="relative cursor-pointer">
        <Image
          src={imageUrl}
          alt={name}
          width={320}
          height={300}
          className="rounded-xl h-60 w-full object-cover"
        />
        <button
          type="button"
          className="absolute text-[11px] py-1 px-3 rounded bg-gray-50 bottom-3 right-2"
        >
          <span className="flex items-center gap-1">
            <Icon size={15} />
            {day} view
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;
