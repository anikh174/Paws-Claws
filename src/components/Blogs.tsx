// components/Blogs.tsx
export default function Blogs() {
  const posts = [
    {
      title: "Essential Tips for First-Time Pet Adopters",
      excerpt: "Preparing your home for a new furry friend doesn't have to be overwhelming. Here's our top 5 tips.",
      date: "July 14, 2026",
      image: "https://media.istockphoto.com/id/1516239450/photo/love-portrait-and-family-with-dog-at-animal-shelter-for-adoption-at-kennel.jpg?s=612x612&w=0&k=20&c=ZvxsrI5wTlCCRd1nwhDPiSxTIAZOmQdU-UPFZdGSAO8="
    },
    {
      title: "Why Senior Pets Make the Best Companions",
      excerpt: "Many people overlook senior pets, but they often bring a unique sense of calm and gratitude.",
      date: "July 10, 2026",
      image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/bltd3894bd280c131a6/6261d197787c0839e4c667c5/zpc_og_article_benefits-adopting-pet.jpg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-slate-900 text-center mb-16">
          Pet Care Insights
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {posts.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-emerald-600 font-semibold text-sm">{post.date}</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-3">{post.title}</h3>
              <p className="text-slate-600">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}