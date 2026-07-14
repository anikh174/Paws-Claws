import { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; 
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard - Paws & Claws",
  description: "Manage your pet adoption requests",
};

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  let bookings: any[] = [];

  try {
    // সরাসরি MongoDB কল না করে Express API-তে রিকোয়েস্ট পাঠানো হচ্ছে
    const res = await fetch(`http://localhost:5000/adoptions?userId=${session.user.id}`, {
      headers: {
        // Better-Auth সেশন টোকেনটি Express-এর verifyToken মিডলওয়্যারের জন্য পাঠানো হচ্ছে
        Authorization: `Bearer ${session.session.token}`, 
      },
    });

    if (res.ok) {
      bookings = await res.json();
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    bookings = []; 
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4">
      <DashboardContent bookings={bookings} />
    </div>
  );
};

export default DashboardPage;