// components/TestimonialSection.tsx
import TestimonialGrid from "./TestimonialGrid";

const TestimonialSection = () => {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-3xl font-bold text-blue-950 text-center mb-2">
        Stories From <span className="text-pink-600">Satisfied Clients</span> Nationwide
      </h2>
      <p className="text-center text-[13px] text-blue-950 font-bold mb-10">
        Our clients praise our advertising agency for exceptional creativity, <br />
        results-driven campaigns and unmatched dedication to their success.
      </p>
      <TestimonialGrid />
    </section>
  );
};

export default TestimonialSection;
