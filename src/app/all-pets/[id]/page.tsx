import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ShieldCheck, Info, Activity, Stethoscope } from "lucide-react";
import AdoptButton from "@/components/AdoptButton";

interface PetDetailsProps {
  params: Promise<{ id: string }>;
}

interface PetData {
  _id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  location: string;
  category: "dog" | "cat" | "rabbit" | "other";
  status: "available" | "adopted";
  description?: string;
  vaccinated?: boolean;
  color?: string;
  size?: string;
  gender?: string;
  spayedNeutered?: boolean;
  healthCondition?: string;
}

const PetDetailsPage = async ({ params }: PetDetailsProps) => {
  const { id } = await params;
  let pet: PetData | null = null;
  let fetchError: string | null = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://paws-claws-server.vercel.app";
    const res = await fetch(`${baseUrl}/pets/${id}`, { cache: "no-store" });
    
    if (res.ok) {
      pet = await res.json();
    } else {
      fetchError = `Failed to fetch data (Status: ${res.status})`;
    }
  } catch (error: any) {
    console.error("Failed to fetch pet details:", error);
    fetchError = error?.message || "Network error, please check your connection.";
  }

  if (!pet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-5">
        <h2 className="text-2xl font-bold text-red-500">Pet Not Found</h2>
        <p className="text-gray-500 mt-2">{fetchError || "The pet you are looking for might have been adopted or removed."}</p>
        <Link href="/all-pets" className="mt-4 bg-[#0a9396] text-white px-6 py-2 rounded-full font-medium transition-transform hover:scale-105">
          Back to All Pets
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-20 px-5 lg:px-0">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 shadow-xl rounded-2xl border border-gray-100">
        {/* Left Side: Image */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={pet.image || "/placeholder-pet.png"} 
            alt={pet.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        {/* Right Side: Information */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-extrabold text-gray-900 break-words">{pet.name}</h1>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase shrink-0 ${
                pet.status === "available" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              }`}>
                {pet.status}
              </span>
            </div>
            <p className="text-lg font-semibold text-[#0a9396] mt-1">{pet.breed}</p>

            <hr className="my-4 border-gray-200" />

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Calendar size={18} className="text-gray-400" /> <span><strong>Age:</strong> {pet.age}</span></div>
              <div className="flex items-center gap-2"><MapPin size={18} className="text-gray-400" /> <span><strong>Location:</strong> {pet.location}</span></div>
              <div className="flex items-center gap-2"><Info size={18} className="text-gray-400" /> <span><strong>Gender:</strong> {pet.gender || "N/A"}</span></div>
              <div className="flex items-center gap-2"><Activity size={18} className="text-gray-400" /> <span><strong>Size:</strong> {pet.size || "N/A"}</span></div>
              {pet.color && <div className="flex items-center gap-2"> <span className="w-4 h-4 rounded-full bg-gray-200 border" /> <span><strong>Color:</strong> {pet.color}</span></div>}
              {pet.vaccinated && <div className="flex items-center gap-2 text-green-600"><ShieldCheck size={18} /> <span><strong>Vaccinated</strong></span></div>}
              {pet.spayedNeutered && <div className="flex items-center gap-2 text-blue-600"><Stethoscope size={18} /> <span><strong>Spayed/Neutered</strong></span></div>}
              <div className="flex items-center gap-2 col-span-2"><strong>Health:</strong> {pet.healthCondition || "Good"}</div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-2">About {pet.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{pet.description || "No additional description."}</p>
            </div>
          </div>

          {/* Action Section */}
          <div className="space-y-4">
            {pet.status === "available" && (
              <AdoptButton petDetails={pet} />
            )}
            
            {/* Back to Pets Link */}
            <Link href="/all-pets" className="block text-center text-sm font-medium text-gray-500 hover:text-[#0a9396] transition-colors underline underline-offset-4">
              &larr; Back to Available Pets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;