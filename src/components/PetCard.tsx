import { Briefcase, MapPin, Heart } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PetProps {
  pet: {
    _id: any;
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
  const { _id, name, breed, age, image, location, category, status, color, size } = pet;

  const petId = typeof _id === 'object' && _id !== null ? _id.$oid || String(_id) : _id;

  return (
    <Card className="group relative w-full max-w-[350px] overflow-hidden border border-gray-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      {/* ইমেজ সেকশন */}
      <div className="relative h-[260px] w-full overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 720px) 100vw, 350px"
          priority={false}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <Chip
          variant="primary"
          className="absolute right-3 top-3 bg-[#0a9396] text-xs font-semibold capitalize text-white"
        >
          {category}
        </Chip>
      </div>

      <Card.Header className="px-5 pt-5 pb-1 flex flex-col items-start">
        <h3 className="text-xl font-bold tracking-tight text-gray-800 mb-1">
          {name}
        </h3>
        <p className="text-sm font-medium text-[#0a9396] mb-2">
          {breed}
        </p>
      </Card.Header>

      <Card.Body className="px-5 pb-5 pt-0 text-gray-600">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <MapPin width={14} height={14} className="text-gray-400" />
            <span className="capitalize">{location}</span>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <Briefcase width={14} height={14} className="text-gray-400" />
              <span>{age}</span>
            </div>
          </div>

          {(size || color) && (
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              {size && <span className="capitalize">Size: {size}</span>}
              {size && color && <span>•</span>}
              {color && <span className="capitalize">Color: {color}</span>}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-400">Status</span>
          <span className={`text-sm font-bold uppercase ${status === 'available' ? 'text-green-600' : 'text-amber-600'}`}>
            {status}
          </span>
        </div>
      </Card.Body>

      <Card.Footer className="p-3 bg-gray-50 border-t border-gray-100">
        <Link href={`/all-pets/${petId}`} className="w-full">
          <Button
            className="w-full flex items-center justify-center gap-2 font-semibold text-white bg-[#0a9396] hover:bg-[#005f73] transition-colors duration-300 shadow-md rounded-md"
          >
            Adopt Me
            <Heart width={16} height={16} className="fill-white/20" />
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default PetCard;
