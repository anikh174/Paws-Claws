"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (data) {
        toast.success("Registration successful");
        router.push("/dashboard");
        router.refresh();
      }

      if (error) {
        toast.error(error.message || "Failed to create account");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error("Google authentication failed");
    }
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
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500">
            Join Paws & Claws to find your perfect pet friend
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          <TextField isRequired name="name" type="text" className="w-full">
            <Label>Name</Label>
            <Input placeholder="Enter your name" className="w-full" />
            <FieldError className="text-red-500 text-xs" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" className="w-full" />
            <FieldError className="text-red-500 text-xs" />
          </TextField>

          <div className="relative w-full">
            <TextField
              isRequired
              minLength={8}
              name="password"
              type={isShowPassword ? "text" : "password"}
              className="w-full"
              validate={(value) => {
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" className="w-full pr-10" />
              <Description className="text-xs text-gray-400">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
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
            isPending={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3">
          <div className="h-[1px] w-full bg-gray-200" />
          <div className="text-gray-400 text-sm whitespace-nowrap">Or</div>
          <div className="h-[1px] w-full bg-gray-200" />
        </div>

        <div>
          <Button
            onClick={handleSignup}
            variant="bordered"
            className="w-full rounded-lg flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-[#0a9396] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;