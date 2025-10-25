import Link from "next/link";
import { allCourses } from "@/app/data/course";
import CourseCard from "./CourseCard";

export default function CourseListByCategory({ category }) {
  const filteredCourses = allCourses.filter(
    (course) => course.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <section className="w-full ">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-gray-200 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize text-center sm:text-left">
            {category} Courses
          </h2>
          <Link
            href={`/courses?category=${encodeURIComponent(category)}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Responsive Grid */}
        {filteredCourses.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredCourses.slice(0, 8).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-center text-gray-500">
            No courses found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
