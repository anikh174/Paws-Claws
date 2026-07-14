export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center bg-linear-to-b from-white to-slate-50/30">
      
      {/* মডার্ন গ্লোয়িং স্পিনার */}
      <div className="relative flex items-center justify-center">
        {/* আউটার অ্যানিমেটেড রিং (গ্লো ইফেক্টের জন্য) */}
        <div className="absolute w-10 h-10 border-4 border-[#0a9396]/10 rounded-full"></div>
        
        {/* মেইন স্পিনিং রিং */}
        <div className="w-10 h-10 border-4 border-[#0a9396] border-t-transparent rounded-full animate-spin shadow-md"></div>
      </div>

      {/* টেক্সট কন্টেন্ট */}
      <div className="text-center space-y-1">
        <p className="text-lg font-bold text-slate-700 tracking-wide animate-pulse">
          Loading, please wait...
        </p>
        <p className="text-xs text-slate-400">
          Preparing your dashboard
        </p>
      </div>

    </div>
  );
}