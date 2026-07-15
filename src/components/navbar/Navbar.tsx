"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { Avatar, Button } from "@heroui/react";
import NavLink from "./Navlink";
import { authClient } from "../../lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.warn("Logged out successfully");
            window.location.href = "/";
          },
        },
      });
    } catch (error) {
      toast.error("Logout failed, please try again");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md shadow-amber-500/10">
      <div className="max-w-7xl mx-auto navbar px-4 md:px-8">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-box w-52 gap-2 text-md font-semibold">
              <li><NavLink href="/">Home</NavLink></li>
              <li><NavLink href="/all-pets">Find a Pet</NavLink></li>
              <li><NavLink href="/dashboard">Dashboard</NavLink></li>
            </ul>
          </div>
          <Link href="/" className="flex gap-2 items-center cursor-pointer">
            <Image src="/logo.png" height={40} width={40} alt="Paws & Claws Logo" className="object-contain" priority />
            <span className="text-xl md:text-2xl font-bold text-amber-600 hidden md:block">Paws & Claws</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8 text-lg font-bold">
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/all-pets">Find a Pet</NavLink></li>
            <li><NavLink href="/dashboard">Dashboard</NavLink></li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {isPending ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <div className="flex gap-4 items-center">
              <Avatar className="w-10 h-10 border-2 border-amber-400 cursor-pointer">
                <Avatar.Image src={user.image ?? ""} alt={user.name ?? "User"} />
                <Avatar.Fallback>
                  {(user.name ?? "U").charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>

              <Button 
                onPress={handleLogout} 
                variant="ghost" 
                className="rounded-lg font-semibold"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                <Button className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="rounded-lg border-amber-500 text-amber-600 font-semibold">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;