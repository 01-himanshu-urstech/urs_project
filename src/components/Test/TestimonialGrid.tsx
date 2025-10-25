// components/TestimonialGrid.tsx
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Sahil Tawar",
    location: "Noida, Uttar Pradesh",
    feedback:
      "The billboard campaign in Delhi helped us create a strong summer presence for our brand. Big thanks to the Rohan Media team for making it seamless and impactful!",
  },
  {
    name: "Rajat Verma",
    location: "Bengaluru, Karnataka",
    feedback:
      "From concept to execution, the Rohan Media team made the entire transit media campaign stress-free. It brought us more leads than expected.",
  },
  {
    name: "Priya Nair",
    location: "Kochi, Kerala",
    feedback:
      "The mall advertising campaign boosted our foot traffic tremendously. Couldn't have asked for a more responsive team than Rohan Media.",
  },
  {
    name: "Sahil Tawar",
    location: "Noida, Uttar Pradesh",
    feedback:
      "The LED ads across key intersections elevated our brand's visibility in record time. Rohan Media delivered exactly what they promised.",
  },
];

const TestimonialGrid = () => {
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 max-md:hidden sm:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((t, index) => (
        <TestimonialCard
          key={index}
          name={t.name}
          location={t.location}
          feedback={t.feedback}
        />
      ))}
    </div>
    <div className=" md:hidden">

      <div className="overflow-x-scroll whitespace-nowrap  p-4 rounded-lg">
        
        {testimonials.map((cities, index) => (
          <div key={index} className="inline-block px-1">
             <TestimonialCard key={index} {...cities} />
          </div>
        ))}
      </div>

      
    </div>
    </div>
    
  );
};

export default TestimonialGrid;
