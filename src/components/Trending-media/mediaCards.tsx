import Image from "next/image";
import Link from "next/link";

type MediaCardProps = {
  badge: string;
  badgeColor: string;
  imageSrc: string;
  title: string;
  slug: string;
  location: string;
  media:string;
  type: string;
  size: string;
};

const MediaCard = ({
  badge,
  badgeColor,
  imageSrc,
  title,
  slug,
  location,
  media,
  type,
  size,
}: MediaCardProps) => {
  return (
    <div className="bg-[#0A033C] text-white grid grid-cols-2 max-h-42 justify-between p-3 rounded-xl overflow-hidden shadow-md max-w-100">
      {/* Image + Badge */}
      <div className="relative max-w-45 h-36 ">
        <Image src={imageSrc} alt={title} layout="fill" className="rounded-xl" />
        <span
          className={`absolute top-2 left-2 px-2 py-1 bg- text-xs font-bold bg-[#EE1858] uppercase rounded bg-${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="pt-1 pl-4 md:pl-2 ">
        <div className="min-h-20">
        <h3 className="font-bold text-[11px]  min-h-8 text-wrap ">{title}</h3>
        <p className="text-[11px] mt-1 text-gray-300">{location}</p>
        <p className="text-[11px]  text-gray-300">{media}</p>
        <p className="text-[11px]  text-gray-300">{type}</p>
        
        </div>
        <hr className="mt-2 border-white w-full" />
        <div className="mt-1">
          <p className="text-[10px] font-semibold ">{size}</p>
          <Link href={`/details-media/${slug}`} className="bg-[#E81856] hover:bg-pink-700 text-white ml-5 md:ml-12 lg:ml-22   text-[10px] font-bold  px-2  rounded lg:rounded-4xl">
            Explore More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
