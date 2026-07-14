"use client";
import { useState } from "react";
import AdoptModal from "./adopt-modal/AdoptModal";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";

export default function AdoptButton({ petDetails }: { petDetails: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onPress={() => setIsOpen(true)}
        className="w-full bg-[#0a9396] hover:bg-[#005f73] text-white py-6 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-[1.02]"
      >
        <Heart className="mr-2" size={20} />
        Adopt {petDetails.name}
      </Button>

      <AdoptModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        petDetails={petDetails} 
      />
    </>
  );
}