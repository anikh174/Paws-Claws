"use client";
import Image from "next/image";
import React from "react";
import NavLink from "./Navlink";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";

// HeroUI এর টাইপ এরর এড়াতে আমরা কম্পোনেন্ট প্রপসগুলোকে explicitly হ্যান্ডেল করছি
const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.warn("Logout successful");
  };

  return (
    <div className="z-50 fixed w-full top-0 left-0 shadow-md shadow-amber-500/10">
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Open Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2 text-md font-semibold">
              <NavLink href={"/"}>Home</NavLink>
              <NavLink href={"/all-pets"}>Find a Pet</NavLink>
              <NavLink href={"/dashboard"}>Dashboard</NavLink>
            </ul>
          </div>
          
          <Link href="/" className="flex gap-2 items-center cursor-pointer">
            <Image src={"/logo.png"} height={40} width={40} alt="Paws & Claws Logo" className="object-contain" />
            <h1 className="text-lg md:text-2xl font-bold text-amber-600">
              Paws & Claws
            </h1>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-6 text-lg font-bold menu menu-horizontal px-1">
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/all-pets"}>Find a Pet</NavLink>
            <NavLink href={"/dashboard"}>Dashboard</NavLink>
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex gap-3 items-center">
              {/* Avatar এর জন্য প্রপস সরাসরি না দিয়ে এভাবে ব্যবহার করুন যা সব ভার্সনে কাজ করে */}
              <Avatar
                className="w-10 h-10 text-sm border-2 border-warning cursor-pointer"
                src={user?.image || ""}
                name={user?.name || "User"}
              />

              <div>
                <Button 
                  onPress={handleLogout} 
                  color="danger"
                  variant="ghost" 
                  className="rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href={"/login"}>
                <Button className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md shadow-amber-500/20">
                  Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button
                  variant="bordered"
                  className="rounded-lg border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;