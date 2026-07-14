"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // স্টেট ম্যানেজমেন্ট যোগ করা হয়েছে
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (data) {
        toast.success("Login Successful");
        router.push("/dashboard");
        router.refresh();
      }

      if (error) {
        toast.error(error.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  // স্টেট আপডেট করার মাধ্যমে ডেমো লগইন
  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("password123A");
    toast.info("Demo credentials filled!");
  };

  return (
    <div className="mt-26 my-10 max-w-7xl mx-auto px-4">
      <Card className="border border-[#0a9396] shadow-2xl w-full max-w-md mx-auto p-6 space-y-1">
        <div className="space-y-1 text-center">
          <Image
            src="/logo.png"
            alt="Paws & Claws Logo"
            width={50}
            height={50}
            className="mx-auto"
            priority
          />
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your Paws & Claws account</p>
        </div>

        <Form onSubmit={onSubmit} id="loginForm" className="flex flex-col gap-4 relative w-full">
          <TextField
            isRequired
            type="email"
            className="w-full"
            aria-label="Email"
          >
            <Label htmlFor="email">Email</Label>
            <Input 
              name="email"
              placeholder="john@example.com" 
              className="w-full" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          <div className="relative w-full">
            <TextField
              isRequired
              minLength={8}
              type={isShowPassword ? "text" : "password"}
              className="w-full"
              aria-label="Password"
            >
              <Label htmlFor="password">Password</Label>
              <Input 
                name="password"
                placeholder="Enter your password" 
                className="w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>
            
            <button
              type="button"
              className="absolute right-3 top-[32px] text-lg text-gray-500 z-10 cursor-pointer p-1"
              onClick={() => setIsShowPassword(!isShowPassword)}
              aria-label={isShowPassword ? "Hide password" : "Show password"}
            >
              {isShowPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Button
            className="w-full rounded-lg bg-gradient-to-r from-[#005f73]/90 to-[#0a9396] text-white font-semibold shadow-md mt-2"
            type="submit"
            isLoading={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>

          <Button
            type="button"
            variant="flat"
            className="w-full rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
            onClick={handleDemoLogin}
          >
            Use Demo Credentials
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3">
          <div className="h-[1px] w-full bg-gray-200" />
          <div className="text-gray-400 text-sm whitespace-nowrap">Or</div>
          <div className="h-[1px] w-full bg-gray-200" />
        </div>

        <div>
          <Button
            onClick={handleSignin}
            variant="bordered"
            className="w-full rounded-lg flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="text-[#0a9396] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;