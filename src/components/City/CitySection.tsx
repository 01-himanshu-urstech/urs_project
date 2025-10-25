// components/CitySection.tsx
import CityGrid from "./CityGrid"

const CitySection = () => {
  return (
    <section className="py-10 px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-950 text-center">
        See <span className="text-pink-600">Your City</span> Listings
      </h2>
      <p className="text-center text-[13px] text-blue-950 font-bold mt-2">
        Explore premium media listings across India's leading metros.
        <br />
        Find top advertising spots in your city and go live instantly.
      </p>
      <div className="mt-10">
        <CityGrid />
      </div>
    </section>
  );
};

export default CitySection;
