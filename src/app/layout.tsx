import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify-এর ডিফল্ট CSS স্টাইল
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

// ফন্টের ভেরিয়েবল কনফিগারেশন (পারফরম্যান্সের জন্য সবচেয়ে বেস্ট প্র্যাকটিস)
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

// ১. টাইপ-সেফ মেটাডেটা সেটআপ
export const metadata: Metadata = {
  title: "Paws & Claws - Pet Adoption Platform",
  description: "Find your perfect companion and give them a forever home.",
};

// ২. Children প্রপসের জন্য TypeScript টাইপ ডিফাইন করা
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${josefin.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-800">
        {/* গ্লোবাল নেভিগেশন বার */}
        <Navbar />
        
        {/* মেইন কন্টেন্ট এরিয়া - flex-1 দেওয়ায় ফুটার সবসময় স্ক্রিনের নিচে থাকবে */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* নোটিফিকেশন অ্যালার্ট সিস্টেম */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme="light"
        />
        
        {/* গ্লোবাল ফুটার */}
        <Footer />
      </body>
    </html>
  );
}