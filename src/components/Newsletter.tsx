// components/Newsletter.tsx
'use client'; // <--- THIS IS REQUIRED

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your logic here
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Find Your Perfect Match
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Subscribe to our newsletter to receive updates on new arrivals.
          </p>
          <form 
            className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl"
            onSubmit={handleSubmit} // Now it is inside a Client Component
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-6 py-4 rounded-xl text-slate-900 focus:outline-none"
              required
            />
            <button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}