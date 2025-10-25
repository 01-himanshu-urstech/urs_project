import React from 'react';
import Badge from './Badge';
import Image from 'next/image';
import Link from 'next/link';
interface BillboardCardProps {
  tag: string;
  tagColor: 'red' | 'green' | 'yellow' | 'pink';
  title: string;
  slug: string;
  location: string;
  size: string;
  type: string;
  imageUrl: string;
}

const BillboardCard: React.FC<BillboardCardProps> = ({
  tag,
  tagColor,
  title,
  slug,
  location,
  size,
  type,
  imageUrl,
}) => {
  return (
    <div className="relative rounded-xl shadow-md overflow-hidden bg-white w-full max-w-xs">
      <div className="relative w-full h-40 sm:h-48">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
        <Badge label={tag} color={tagColor} />
      </div>
      <div className="p-4 text-[#070344] space-y-1">
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-xs font-medium">{location}</p>
        <p className="text-xs font-medium">{size}</p>
        <div className="flex justify-between items-center pt-1">
          <span className="text-xs font-bold text-[#E81856]">{type}</span>
          <Link href={`/details-media/${slug}`} className="text-white text-xs bg-[#070344] hover:bg-[#1c1a65] px-3 py-1 rounded-md">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillboardCard;
