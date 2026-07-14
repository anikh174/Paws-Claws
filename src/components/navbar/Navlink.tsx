"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

// TypeScript ইন্টারফেস (যেহেতু আপনি TS ব্যবহার করছেন, এটি অবশই থাকবে)
interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();

  // বর্তমান পাথ এবং লিঙ্কের পাথ মিললে active ট্রু হবে
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`px-4 py-1.5 text-md font-semibold transition-all duration-200 rounded-md block lg:inline-block ${
        isActive
          ? "bg-amber-500/10 text-amber-600 font-bold" 
          : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;