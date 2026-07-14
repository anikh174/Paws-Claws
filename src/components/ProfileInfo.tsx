"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import UpdateProfile from "./update-profile/UpdateProfile";
import { BiUser, BiCheckCircle, BiEnvelope } from "react-icons/bi";

const ProfileInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Modern Skeleton Loader
  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto p-10 space-y-6 animate-pulse">
        <div className="h-48 bg-slate-100 rounded-3xl" />
        <div className="space-y-3">
          <div className="h-8 bg-slate-100 rounded-md w-1/3" />
          <div className="h-4 bg-slate-100 rounded-md w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">My Dashboard</h1>
        <p className="text-slate-500 mt-2">Manage your account details and adoption preferences</p>
      </div>

      {/* Main Profile Card */}
      <div className="relative group max-w-2xl mx-auto">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0a9396] to-teal-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
        
        <div className="relative bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
          {/* Top Accent */}
          <div className="h-3 w-full bg-gradient-to-r from-[#0a9396] via-teal-500 to-[#0a9396]" />

          <div className="p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden relative">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <BiUser size={50} className="text-slate-300" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-sm">
                <BiCheckCircle className="text-[#0a9396]" size={24} />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left space-y-5">
              <div>
                <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0a9396] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-100">
                  <BiCheckCircle size={14} /> Verified Adopter
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{user?.name || "User"}</h2>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600 font-medium">
                <BiEnvelope className="text-[#0a9396]" />
                {user?.email}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-600 italic">
                  "Thank you for being a part of our pet-loving community. Your compassion makes a difference!"
                </p>
              </div>

              <div className="pt-2">
                <UpdateProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;