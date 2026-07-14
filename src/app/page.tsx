import FeaturedPets from "@/components/FeaturedPets";
import Banner from "../components/Banner";
import ServiceInfo from "@/components/ServiceInfo";
import AdoptionProcess from "@/components/AdoptionProcess";
import BrowseCategories from "@/components/BrowseCategories";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";


export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24 mb-16">
      {/* ১. হিরো ব্যানার সেকশন */}
      <Banner />

      {/* ২. ফিচার্ড/টপ পেটস সেকশন (যারা অ্যাডপশনের জন্য রেডি) */}
      <FeaturedPets />

      {/* ৩. ক্যাটাগরি অনুযায়ী ব্রাউজ করার সেকশন */}
      <BrowseCategories />

      <ServiceInfo></ServiceInfo>

      {/* ৪. সার্ভিস ইনফো ১: কীভাবে অ্যাডপশন প্রসেস কাজ করে */}
      <AdoptionProcess />

      <Blogs></Blogs>

    <Testimonials></Testimonials>
    </div>
  );
}