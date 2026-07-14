import React from "react";
import PetCard from "./PetCard"; 
import { Button } from "@heroui/react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Link from "next/link";

// পেটস ডেটা টাইপ ইন্টারফেস
interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  location: string;
  category: "dog" | "cat" | "rabbit" | "other";
  status: "available" | "adopted";
  color?: string;
  size?: string;
}

const FeaturedPets = async () => {
  let pets: Pet[] = [];
  let errorMsg = "";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    const res = await fetch(`${baseUrl}/featuredPets`, {
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    pets = await res.json();
  } catch (error) {
    console.error("Error loading featured pets:", error);
    errorMsg = "Failed to load featured pets. Please check your backend connection.";
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-10">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-slate-100">
        <div className="space-y-2 max-w-2xl">
          <p className="text-[#0a9396] font-bold text-sm lg:text-base uppercase tracking-widest">
            Meet Our Buddies
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#005f73] font-extrabold tracking-tight">
            Pets Available for Adoption
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Find your perfect companion from our loving and healthy pets waiting for a home.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link href="/all-pets">
            <Button
              // Changed variant from "bordered" to "ghost" to satisfy TypeScript
              variant="ghost" 
              className="text-sm font-bold rounded-xl border-2 border-[#005f73] text-[#0a9396] hover:bg-[#005f73]/5 transition-colors h-11 px-5"
              endContent={<MdOutlineArrowRightAlt size={20} />}
            >
              View All Pets
            </Button>
          </Link>
        </div>
      </div>

      {errorMsg ? (
        <div className="text-center py-12 bg-red-50 rounded-2xl border border-dashed border-red-200">
          <p className="text-red-500 font-medium text-sm">{errorMsg}</p>
        </div>
      ) : pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">No pets available at the moment.</p>
        </div>
      )}

    </section>
  );
};

export default FeaturedPets;