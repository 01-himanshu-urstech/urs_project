
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PlayCircle, Star, Check, Users, FileText, Clock, BarChart2, Download, Lock } from "lucide-react";
import WhoIsThisCourseFor from '@/app/courses/WhoIsThisCourseFor';
import FAQSection from '@/app/courses/FAQSection';
import Description from '@/app/courses/Description';
import { allCourses } from '@/app/data/course';
import EnquiryMini from '@/app/courses/EnquiryMini';

 
// Make the component an async function
export default async function CourseDetailPage({ params }) {
  // Await the params object before destructuring
  const { slug } = await params;
  
  // Find the course by matching the slug from the URL
  const course = allCourses.find((c) => c.slug === slug);

  // If no course is found, render the 404 page
  if (!course) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="text-sm text-blue-300 font-semibold mb-2 hover:underline">
            &larr; Back to All Courses
          </Link>
          <h1 className="text-4xl font-bold mt-2 mb-3">{course.title}</h1>
          <p className="text-xl text-gray-300 mb-4">{course.subtitle}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-yellow-400 text-black font-bold px-2 py-1 rounded-sm">Bestseller</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-6 w-full flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Main Details) */}
          <div className="w-full lg:w-2/3">
            {/* What you'll learn */}
            <div className="border border-gray-200 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Content */}
            {/* <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Course content</h2>
              <div className="space-y-2">
                {course.courseContent.map((section, index) => (
                  <details key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden" open={index === 0}>
                    <summary className="p-4 font-semibold cursor-pointer flex justify-between items-center hover:bg-gray-50">
                      {section.title}
                      <span className="text-sm text-gray-500">{section.lectures.length} lectures</span>
                    </summary>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <ul className="space-y-3">
                        {section.lectures.map((lecture, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm">
                            <PlayCircle size={16} className="text-gray-600 flex-shrink-0" />
                            
                            <span className="flex-grow">{lecture.title}</span>
                            
                            
                            <div className="ml-auto flex items-center gap-3">
                              {lecture.isDownloadable && (
                                <button aria-label="Download lecture" className="text-green-600 hover:text-green-800">
                                  <Download size={16} />
                                </button>
                              )}
                              {lecture.isLocked && (
                                <div aria-label="Lecture locked" className="text-red-500">
                                  <Lock size={15} />
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div> */}




            {/* Requirements & Description */}
            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {course.requirements.map((req, index) => <li key={index}>{req}</li>)}
              </ul>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              
              <Description text={course.description} />
            </div>
            <WhoIsThisCourseFor audience={course.whoIsThisCourseFor} />
            
            <FAQSection faqs={course.faqs} />
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <aside className="w-full lg:w-1/3 lg:sticky top-10 self-start">
            <EnquiryMini courseTitle={course.title} />
          </aside>
        </div>
      </main>
    </div>
  );
}
