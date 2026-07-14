"use client";
import { useState } from "react";
import AdoptModal from "./adopt-modal/AdoptModal";

export default function AdoptButton({ petDetails }: { petDetails: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AdoptModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        petDetails={petDetails} 
      />
    </>
  );
}