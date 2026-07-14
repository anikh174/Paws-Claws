import React from 'react';
import { FaDog, FaCat, FaKiwiBird } from 'react-icons/fa6';
import { GiFox, GiRabbit, GiTurtle } from 'react-icons/gi';

const BrowseCategories = () => {
  // পেট ক্যাটাগরি ডেটা অ্যারে
  const categories = [
    { id: 1, name: 'Dogs', icon: FaDog, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { id: 2, name: 'Cats', icon: FaCat, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
    { id: 3, name: 'Birds', icon: FaKiwiBird, color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
    { id: 4, name: 'Rabbits', icon: GiRabbit, color: 'text-rose-400', bgColor: 'bg-rose-50' },
    { id: 5, name: 'Turtles', icon: GiTurtle, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    { id: 6, name: 'Small Pets', icon: GiFox, color: 'text-orange-400', bgColor: 'bg-orange-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto my-16 px-5 lg:px-6">
      
      {/* হেডার সেকশন */}
      <div className="space-y-2 text-center">
        <p className="text-lg lg:text-xl font-semibold text-[#0a9396] tracking-wide uppercase">
          Browse by
        </p>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-[#005f73]">
          Pet Categories
        </h3>
      </div>

      {/* গ্রিড সেকশন */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className="group cursor-pointer flex flex-col items-center justify-center space-y-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-[#0a9396]/30"
            >
              {/* আইকন কন্টেইনার */}
              <div className={`p-4 rounded-xl ${category.bgColor} ${category.color} transition-colors duration-300 group-hover:bg-[#0a9396]/10 group-hover:text-[#0a9396]`}>
                <IconComponent size={32} />
              </div>

              {/* টেক্সট */}
              <p className="text-center text-sm md:text-base font-bold text-slate-700 group-hover:text-[#005f73] transition-colors line-clamp-1 w-full">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default BrowseCategories;