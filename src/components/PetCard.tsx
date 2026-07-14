import { Briefcase, MapPin, Heart } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PetProps {
  pet: {
    _id: any; // MongoDB ObjectId বা String হ্যান্ডেল করার জন্য safe টাইপ
    name: string;
    breed: string;
    age: string;
    image: string;
    location: string;
    category: "dog" | "cat" | "rabbit" | "other";
    status: "available" | "adopted";
    color?: string;
    size?: string;
  };
}

const PetCard = ({ pet }: PetProps) => {
  const {
    _id,
    name,
    breed,
    age,
    image,
    location,
    category,
    status,
    color,
    size,
  } = pet;

  // MongoDB এর _id স্ট্রিং বা অবজেক্ট যাই হোক আইডিটি ঠিকভাবে বের করার জন্য
  const petId = typeof _id === 'object' && _id !== null ? _id.$oid || String(_id) : _id;

  return (
    <Card
      className="group relative w-full max-w-[350px] overflow-hidden border border-gray-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
    >
      {/* ইমেজ সেকশন */}
      <div className="relative h-[260px] w-full overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-w-720px) 100vw, 350px"
          priority={false}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* ক্যাটাগরি ব্যাজ */}
        <Chip
          variant="solid"
          className="absolute right-3 top-3 bg-[#0a9396] text-xs font-semibold capitalize text-white"
        >
          {category}
        </Chip>
      </div>

      {/* কার্ড হেডার ও কন্টেন্ট সেকশন (HeroUI অফিসিয়াল ডট-সিনট্যাক্স) */}
      <Card.Header className="px-5 pt-5 pb-1 flex flex-col items-start">
        <Card.Title className="text-xl font-bold tracking-tight text-gray-800 mb-1">
          {name}
        </Card.Title>
        <Card.Description className="text-sm font-medium text-[#0a9396] mb-2">
          {breed}
        </Card.Description>
      </Card.Header>

      {/* কার্ড কন্টেন্ট (টেক্সট কালার ঠিক করা হয়েছে যেন লাইট ব্যাকগ্রাউন্ডে দেখা যায়) */}
      <Card.Content className="px-5 pb-5 pt-0 text-gray-600">
        <div className="space-y-2 text-xs">
          {/* লোকেশন এবং বয়স */}
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span className="capitalize">{location}</span>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <Briefcase size={14} className="text-gray-400" />
              <span>{age}</span>
            </div>
          </div>

          {/* অতিরিক্ত ইনফো (সাইজ ও কালার) */}
          {(size || color) && (
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              {size && <span className="capitalize">Size: {size}</span>}
              {size && color && <span>•</span>}
              {color && <span className="capitalize">Color: {color}</span>}
            </div>
          )}
        </div>

        {/* স্ট্যাটাস সেকশন */}
        <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-400">Status</span>
          <span className={`text-sm font-bold uppercase ${status === 'available' ? 'text-green-600' : 'text-amber-600'}`}>
            {status}
          </span>
        </div>
      </Card.Content>

      {/* অ্যাকশন বাটন সেকশন */}
      <Card.Footer className="p-3 bg-gray-50 border-t border-gray-100">
        <Link href={`/all-pets/${petId}`} className="w-full">
          <Button
            className="w-full font-semibold text-white bg-[#0a9396] hover:bg-[#005f73] transition-colors duration-300 shadow-md"
            radius="md"
            endContent={<Heart size={16} className="fill-white/20" />}
          >
            Adopt Me
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default PetCard;