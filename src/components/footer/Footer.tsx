import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiYoutube } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-900 p-10 mt-20">
      <div className="grid lg:grid-cols-4 grid-cols-2 justify-items-center gap-10">
        
        {/* ব্র্যান্ড এবং সোশ্যাল মিডিয়া */}
        <div className="space-y-5">
          <div className="flex gap-2 items-center">
            <Image 
              src="/logo.png" 
              alt="Paws & Claws Logo" 
              height={40} 
              width={40} 
              className="w-6 md:w-10 md:h-10 h-6 object-contain"
            />
            <h3 className="text-xl lg:text-3xl font-bold text-white">Paws & Claws</h3>
          </div>

          <p className="text-slate-400 font-medium text-xs lg:text-base leading-relaxed">
            Bangladesh's trusted platform for <br /> 
            finding, adopting, and giving <br /> 
            a forever home to pets.
          </p>

          <div className="flex gap-2 items-center text-white">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="bg-slate-800 hover:bg-amber-500 border border-transparent p-1 lg:p-2 rounded-full transition-all">
              <FaFacebook className="h-5 w-5"/>
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="bg-slate-800 hover:bg-amber-500 border border-transparent p-1 lg:p-2 rounded-full transition-all">
              <FaInstagram className="h-5 w-5"/>
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter" className="bg-slate-800 hover:bg-amber-500 border border-transparent p-1 lg:p-2 rounded-full transition-all">
              <FaXTwitter className="h-5 w-5"/>
            </Link>
            <Link href="https://youtube.com" target="_blank" aria-label="Youtube" className="bg-slate-800 hover:bg-amber-500 border border-transparent p-1 lg:p-2 rounded-full transition-all">
              <CiYoutube className="h-5 w-5 font-bold"/>
            </Link>
          </div>
        </div>

        {/* কুইক লিংকস */}
        <div className="space-y-5">
          <h3 className="text-lg lg:text-xl font-bold text-white border-b-2 border-amber-500 pb-1 inline-block">Quick Links</h3>
          <div className="flex flex-col text-xs lg:text-base space-y-3 font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <Link href="/all-pets" className="hover:text-amber-500 transition-colors">Find a Pet</Link>
            <Link href="/dashboard" className="hover:text-amber-500 transition-colors">Dashboard</Link>
            <Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
          </div>
        </div>

        {/* পোষ্য প্রাণীর ক্যাটাগরি সমূহ */}
        <div className="space-y-5">
          <h3 className="text-lg lg:text-xl font-bold text-white border-b-2 border-amber-500 pb-1 inline-block">Categories</h3>
          <div className="flex flex-col gap-2 text-xs lg:text-base font-semibold text-slate-400">
            <Link href="/all-pets?category=dogs" className="hover:text-amber-500 transition-colors">Dogs & Puppies</Link>
            <Link href="/all-pets?category=cats" className="hover:text-amber-500 transition-colors">Cats & Kittens</Link>
            <Link href="/all-pets?category=birds" className="hover:text-amber-500 transition-colors">Birds</Link>
            <Link href="/all-pets?category=rabbits" className="hover:text-amber-500 transition-colors">Rabbits</Link>
            <Link href="/all-pets?category=others" className="hover:text-amber-500 transition-colors">Other Pets</Link>
          </div>
        </div>

        {/* কন্টাক্ট ইনফো */}
        <div className="space-y-5">
          <h3 className="text-lg lg:text-xl font-bold text-white border-b-2 border-amber-500 pb-1 inline-block">Contact</h3>
          <div className="space-y-3 text-slate-400 text-[10px] lg:text-base font-semibold">
            <p className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-default">📍 Dhanmondi, Dhaka</p>
            <p className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-default">📞 +880 1700-000000</p>
            <p className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-default">✉️ hello@pawsandclaws.com</p>
            <p className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-default">🕐 9 AM - 8 PM (Everyday)</p>
          </div>
        </div>
      </div>
      
      {/* ফুটারে কপিরাইট সেকশন */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-800 mt-8 pt-5 md:mx-10 text-slate-400 font-medium text-xs md:text-sm gap-3">
        <p>© 2026 Paws & Claws. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;