// components/CityGrid.tsx
import CityCard from "./CityCard";

const cities = [
  { city: "Delhi", state: "Delhi", imageUrl:"/City/Delhi.webp" },
  { city: "Noida", state: "Uttar Pradesh", imageUrl: "/City/Noida.webp" },
  { city: "Gurugram", state: "Haryana", imageUrl: "/City/Gurugram.webp" },
  { city: "Dehradun", state: "Uttarakhand", imageUrl: "/City/Dehradun.webp" },
  { city: "Mumbai", state: "Delhi", imageUrl: "/City/Mumbai.webp" },
  { city: "Bangalore", state: "Karnataka", imageUrl: "/City/Banglore.webp" },
  { city: "Lucknow", state: "Uttar Pradesh", imageUrl: "/City/Lucknow.webp" },
  { city: "Kolkata", state: "West Bengal", imageUrl: "/City/Kolkata.webp" },
];

const CityGrid = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:hidden gap-6">
      {cities.map((city) => (
        <CityCard
          key={city.city}
          city={city.city}
          state={city.state}
          imageUrl={city.imageUrl}
        />
      ))}
    </div>
    <div className=" md:hidden">

      <div className="overflow-x-auto whitespace-nowrap  p-4 rounded-lg">
        
        {cities.map((cities, index) => (
          <div key={index} className="inline-block px-1">
             <CityCard key={index} {...cities} />
          </div>
        ))}
      </div>

      
    </div>
    </div>
    
  );
};

export default CityGrid;
