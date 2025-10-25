import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
interface ServiceCardProps {
  name: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  imageUrl
}) => {

  return (
    
    <div className="relative rounded-lg shadow-lg overflow-hidden group mb-4 ">
      <div className="relative w-full  group-hover:scale-105 transition-transform ">
    {/* <Link href={`/filters?category_name=${name}`} passHref> */}
        <Image
            src={imageUrl}
            alt={name}
            width={350}
            height={250}
            className="object-cover w-full h-[140px] rounded-2xl "
        /> 
        <div className="absolute inset-0 top-1/2 bottom-1/2 bg-opacity-50  flex justify-center group-hover:scale-105">
        {/* <div>
            <p className=" text-white text-lg font-bold  ">{name}</p>
        </div> */}
         </div> 
    {/* </Link> */}
    </div>
    </div>
  )
}

export default ServiceCard;
