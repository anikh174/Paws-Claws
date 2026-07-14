"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PetCard from "@/components/PetCard";
import PaginationClient from "@/components/PaginationClient";

const AllPetsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL থেকে বর্তমান প্যারামিটারগুলো নেওয়া
  const initialQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSort = searchParams.get("sort") || "";

  // স্টেট ম্যানেজমেন্ট
  const [pets, setPets] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(initialQuery);

  // ডেটা ফেচ করার ফাংশন
  const fetchPets = async () => {
    setLoading(true);
    const queryStr = searchParams.toString();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    try {
      const res = await fetch(`${baseUrl}/pets?${queryStr}`);
      const data = await res.json();
      setPets(data.pets || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // URL প্যারামিটার পরিবর্তন হলে ডেটা ফেচ হবে
  useEffect(() => {
    fetchPets();
  }, [searchParams]);

  // সার্চ বাটনের ফাংশন (Key 'search' ব্যবহার করা হয়েছে)
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");
    
    params.set("page", "1"); // সার্চ করলে প্রথম পেজে ফিরে যাবে
    router.push(`/all-pets?${params.toString()}`);
  };

  // ড্রপডাউন ফিল্টার পরিবর্তনের ফাংশন
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    
    params.set("page", "1");
    router.push(`/all-pets?${params.toString()}`);
  };

  return (
    <div className="mt-16 min-h-screen">
      <div className="bg-gradient-to-l from-[#0a9396] to-[#005f73] py-10 px-5 text-center">
        <h2 className="text-4xl text-white font-bold">Find Your Perfect Companion</h2>
      </div>

      {/* সার্চ ও ফিল্টার বার */}
      <div className="px-5 max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* সার্চ ইনপুট এবং সার্চ বাটন */}
        <div className="flex w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search name, breed..."
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-l-full focus:outline-none focus:border-[#0a9396]"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 bg-[#005f73] text-white rounded-r-full hover:bg-[#0a9396] transition font-semibold"
          >
            Search
          </button>
        </div>
        
        <select 
          value={initialCategory}
          onChange={(e) => handleFilterChange("category", e.target.value)} 
          className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-full"
        >
          <option value="">All Categories</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>

        <select 
          value={initialSort}
          onChange={(e) => handleFilterChange("sort", e.target.value)} 
          className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-full"
        >
          <option value="">Sort By Date</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* কন্টেন্ট প্রদর্শন */}
      <div className="my-10 max-w-7xl mx-auto px-5">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {pets.length > 0 ? (
              pets.map((pet: any) => <PetCard key={pet._id} pet={pet} />)
            ) : (
              <p className="text-center col-span-full">No pets found.</p>
            )}
          </div>
        )}
        <PaginationClient totalPages={totalPages} />
      </div>
    </div>
  );
};

export default AllPetsPage;