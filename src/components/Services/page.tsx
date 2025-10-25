import React from 'react'
import ServiceCard from './serviceCard';

const Service = () => {

    const services=[
        {
            name:'BillBoard',
            imageUrl:'/Services/1.jpg'
        },
        {
            name:'Digital BillBoard	',
            imageUrl:'/Services/2.jpg'
        },
        {
            name:'Mall Media',
            imageUrl:'/Services/3.jpg'
        },
        {
            name:'Transit Media',
            imageUrl:'/Services/4.jpg'
        },
        {
            name:'Metro & Train Ads',
            imageUrl:'/Services/4.jpg'
        },
        {
            name:'Airport Media',
            imageUrl:'/Services/3.jpg'
        },
        {
            name:'Pole Kiosks',
            imageUrl:'/Services/2.jpg'
        },
        {
            name:'Cab/Rickshaw Branding',
            imageUrl:'/Services/1.jpg'
        },
    ];

  return (
    <div>
      <div className=" bg-white pt-20  pb-15 w-full max-md:hidden">
      <h1 className="text-3xl font-bold text-center text-black ">Our <span className='text-orange-400'>Services</span></h1>
      <p className="text-1xl  text-center pt-2 font-bold text-black ">Explore our innovative learning solutions that take your education beyond the ordinary.</p>
      <div className='gap-4 mt-10 mx-8 lg:mr-15 lg:ml-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
      </div>  
      </div>
      <div className="p-6 md:hidden">
        <h1 className="text-3xl font-bold text-center text-blue-950 ">Our <span className='text-[#006aec]'>Services</span></h1>
        <p className="text-1xl  text-center pt-2 font-bold text-blue-950 ">Explore our dynamic outdoor solutions that take your brand beyond the ordinary. </p>

      <div className="overflow-x-auto whitespace-nowrap  p-4 rounded-lg">
        
        {services.map((service, index) => (
          <div key={index} className="inline-block px-2">
             <ServiceCard key={index} {...service} /> 
          </div>
        ))}
      </div>

      
    </div>
    
      
    </div>
  )
}

export default Service
