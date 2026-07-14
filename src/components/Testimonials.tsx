// components/Testimonials.tsx
export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      quote: "Adopting Luna through Paws & Claws was a seamless experience. The team is incredibly supportive!",
      pet: "Luna (Cat)"
    },
    {
      name: "Sarah Miller",
      quote: "I found my best friend here. The platform is intuitive and very helpful for first-time adopters.",
      pet: "Max (Dog)"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">
          Loved by Our Community
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-slate-600 text-lg italic mb-6">"{item.quote}"</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{item.name}</span>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {item.pet}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}