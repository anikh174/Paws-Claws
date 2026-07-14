export default function Loading() {
  return (
    <div className="min-h-[70vh] flex gap-3 justify-center items-center p-4">
      <div>
        <p className="text-xl font-medium text-gray-600 animate-pulse">
          Loading, please wait...
        </p>
      </div>
      
      {/* স্পিনারের বর্ডার কালার আপনার প্রজেক্টের থিম কালার (#0a9396) অনুযায়ী ম্যাচ করা হয়েছে */}
      <div 
        className="w-6 h-6 border-4 border-[#0a9396] border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="loading"
      />
    </div>
  );
}