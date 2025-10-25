import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <Link
      href={`/course/${course.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={course.img}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between min-h-[140px]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 mb-1">
            {course.category}
          </p>
          <h3 className="text-[15px] sm:text-base font-bold text-gray-900 line-clamp-2">
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-1">
            {course.subtitle}
          </p>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center justify-between text-sm">
          {/* <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-gray-800">
              {course.rating.toFixed(1)}
            </span>
            <span className="text-gray-500 text-xs">
              ({course.reviews.toLocaleString()} reviews)
            </span>
          </div> */}
          {/* <span className="text-xs font-medium text-gray-500">
            {course.interested}
          </span> */}
        </div>
      </div>
    </Link>
  );
}
