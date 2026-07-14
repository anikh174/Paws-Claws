import React from "react";
import { FaPaw, FaFileSignature, FaHome } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

const AdoptionProcess = () => {
  // পেট অ্যাডপশনের ৪টি স্টেপ
  const steps = [
    {
      id: 1,
      stepNumber: "STEP 1",
      title: "Find Your Pet",
      desc: "Browse our directory of healthy, loving pets waiting for a home.",
      icon: FcSearch,
    },
    {
      id: 2,
      stepNumber: "STEP 2",
      title: "Meet the Buddy",
      desc: "Schedule a visit or video call to bond with your chosen pet.",
      icon: FaPaw,
      iconColor: "text-[#0a9396]",
    },
    {
      id: 3,
      stepNumber: "STEP 3",
      title: "Quick Interview",
      desc: "Complete a simple screening to ensure a perfect family match.",
      icon: FaFileSignature,
      iconColor: "text-[#0a9396]",
    },
    {
      id: 4,
      stepNumber: "STEP 4",
      title: "Take Them Home",
      desc: "Finalize the adoption and welcome your new member home!",
      icon: FaHome,
      iconColor: "text-[#0a9396]",
    },
  ];

  return (
    <div className="my-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center space-y-2">
          <p className="text-[#0a9396] text-sm lg:text-base font-bold uppercase tracking-widest">
            Simple Process
          </p>
          <h3 className="text-[#005f73] text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            How Paws & Claws Works
          </h3>
          <div className="h-1 w-16 bg-[#0a9396] mx-auto rounded-full mt-4" />
        </div>

        {/* স্টেপস গ্রিড কন্টেইনার */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative group text-center space-y-4">
                
                {/* কানেক্টিং ডট/লাইন */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] border-t-2 border-dashed border-slate-200 z-0" />
                )}

                {/* আইকন বক্স */}
                <div className="relative z-10 mx-auto bg-white border border-slate-100 shadow-md shadow-slate-100/60 h-20 w-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-[#0a9396]/20">
                  <div className="absolute inset-0 bg-[#0a9396]/5 rounded-2xl transition-opacity group-hover:opacity-100 opacity-50" />
                  
                  <IconComponent 
                    size={32} 
                    className={`relative z-10 ${step.iconColor || ""}`} 
                  />
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <div className="space-y-2">
                  <span className="inline-block text-xs font-bold text-[#0a9396] bg-[#0a9396]/10 px-3 py-1 rounded-full tracking-wider">
                    {step.stepNumber}
                  </span>
                  <h4 className="text-[#005f73] text-xl font-bold tracking-tight group-hover:text-[#0a9396] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] mx-auto">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AdoptionProcess;