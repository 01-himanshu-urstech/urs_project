import AppBanner from "@/components/App/AppBanner";
import CampaignBanner from "@/components/Banner/page";
import StatsAndBrands from "@/components/Banner/page2";
import States from "@/components/City/CitySection";
import ContactSection from "@/components/Contact/ContactSection";
import Billboard from "@/components/Digital-Billboard/page";
import Hero from "@/components/Hero-section/page";
import Service from "@/components/Services/page";
// import TestimonialSection from "@/components/Test/TestSection";
import TrendingMedia from "@/components/Trending-media/page";
import Course from "@/components/Courses/Course"
import TrainerContactBanner from "@/components/Contact_Us/TrainerContactBanner"
import EnquiryForm from "@/components/Enquiry/EnquiryForm"
import StatsBanner from "@/components/StatsAndBrands/StatsBanner"
import TestimonialGrid from "@/components/testimonials/TestimonialGrid";
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      {/* <Billboard/> */}
      <Hero />
      <Service />
      <CampaignBanner />
      <Course/>
      <TrainerContactBanner/>
      <StatsBanner/>
      <TestimonialGrid/>
      
      {/* <EnquiryForm/> */}
      {/* <TrendingMedia />
      <StatsAndBrands />
      <States />
      <TestimonialSection />
      <ContactSection />
      <AppBanner /> */}
    </div>
  );
}
