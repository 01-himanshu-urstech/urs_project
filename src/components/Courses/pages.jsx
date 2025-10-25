"use client";

import { useSearchParams } from 'next/navigation';
import { allCourses } from '@/app/data/course';
import Link from 'next/link';
import CourseCard from './CourseCard';

export default function AllCoursesPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // Filter courses if a category is present, otherwise show all
  const filteredCourses = category
    ? allCourses.filter(course => course.category.toLowerCase() === category.toLowerCase())
    : allCourses;

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-gray-900 capitalize">
                {category ? `${category} Courses` : 'All Courses'}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
                Browse our collection of high-quality courses to expand your skills.
            </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-10 px-6 w-full">
        {filteredCourses.length > 0 ? (
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <h2 className="text-2xl font-semibold text-gray-700">No courses found</h2>
             <p className="mt-2 text-gray-500">There are currently no courses available in this category.</p>
             <Link href="/courses" className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
                View All Courses
             </Link>
          </div>
        )}
      </main>
    </div>
  );
}
