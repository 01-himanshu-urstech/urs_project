// components/CityCard.tsx
import Image from "next/image";
import Link from "next/link";

interface CityCardProps {
  city: string;
  state: string;
  imageUrl: string;
}

const CityCard: React.FC<CityCardProps> = ({ city, state, imageUrl }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg relative group">
      <Link href ={`/filters?city=${city}`}>
      <Image
        src={imageUrl}
        alt={city}
        width={300}
        height={200}
        className="object-cover w-full h-70 group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0  bg-opacity-30 group-hover:bg-opacity-40 transition-colors duration-300" />
      <div className="absolute bottom-3 left-4 text-white">
        <h3 className="text-lg font-bold">{city}</h3>
        <p className="text-sm">{state}</p>
      </div>
      <div className="absolute bottom-3 right-4">
        <div className="bg-white rounded-full p-1">
          <svg
            className="w-4 h-4 text-blue-950"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default CityCard;
