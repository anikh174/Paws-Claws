import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaPaw, FaRegCalendarCheck } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Banner = () => {
  return (
    <div className="mt-16 w-full overflow-hidden">
      <div
        className="h-auto min-h-[650px] md:h-[500px] lg:h-[600px] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/bg2.jpg')",
        }}
      >
        {/* ওভারলে এবং মেইন কন্টেইনার */}
        <div className="flex flex-col-reverse md:flex-row gap-8 lg:gap-16 justify-between items-center h-full min-h-[650px] md:h-[500px] lg:h-[600px] bg-black/70 px-6 py-12 md:px-12 lg:px-24 xl:px-36">
          
          {/* বাম পাশের কন্টেন্ট সেকশন */}
          <div className="w-full md:w-3/5 space-y-4 md:space-y-6 text-left">
            {/* ট্যাগ ব্যাজ */}
            <div className="inline-flex items-center text-xs lg:text-sm text-white bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
              🐾 Find Your Perfect Furry Companion
            </div>

            {/* মেইন হেডলাইন */}
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Adopt A Pet, <br className="hidden sm:inline" /> Save A Precious Life
            </h1>

            {/* সাব-টেক্সট */}
            <p className="text-slate-200 text-sm lg:text-lg max-w-xl leading-relaxed">
              Meet hundreds of lovable pets waiting for a forever home. 
              Start your adoption journey today and bring unconditional love into your life.
            </p>

            {/* কল-টু-অ্যাকশন বাটন */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium px-6 py-2 shadow-lg shadow-amber-500/20 hover:opacity-90 transition-opacity"
                {...({
                  startContent: <CiSearch className="text-lg font-bold" />,
                  radius: "full"
                } as any)}
              >
                Find Pets
              </Button>
              <Button 
                variant="bordered"
                className="border-2 border-amber-500 text-white hover:bg-amber-500/10 font-medium px-6 py-2"
                {...({
                  startContent: <FaRegCalendarCheck />,
                  radius: "full"
                } as any)}
              >
                My Applications
              </Button>
            </div>

            {/* স্ট্যাটিস্টিক্স কাউন্টার */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/5 text-center md:text-left">
                <h4 className="text-amber-400 font-extrabold text-base lg:text-xl flex items-center justify-center md:justify-start gap-1">
                  <FaPaw className="text-sm lg:text-base" /> 120+
                </h4>
                <p className="text-xs lg:text-sm text-slate-300 mt-1 font-medium">Available Pets</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/5 text-center md:text-left">
                <h4 className="text-amber-400 font-extrabold text-base lg:text-xl flex items-center justify-center md:justify-start gap-1">
                  <FaHeart className="text-sm lg:text-base text-rose-500 fill-rose-500" /> 450+
                </h4>
                <p className="text-xs lg:text-sm text-slate-300 mt-1 font-medium">Happy Adoptions</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/5 text-center md:text-left">
                <h4 className="text-amber-400 font-extrabold text-base lg:text-xl flex items-center justify-center md:justify-start gap-1">
                  <IoMdCheckmarkCircleOutline className="text-sm lg:text-base" /> 100%
                </h4>
                <p className="text-xs lg:text-sm text-slate-300 mt-1 font-medium">Verified Rescues</p>
              </div>
            </div>
          </div>

          {/* ডান পাশের ইমেজ সেকশন */}
          <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
              <Image
                src="/heroimg.jpg"
                fill
                priority
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 400px"
                alt="Lovable Pets"
                className="rounded-full object-cover shadow-2xl shadow-amber-500/20 border-4 md:border-6 border-amber-500 p-1 bg-white/10 backdrop-blur-xs"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;