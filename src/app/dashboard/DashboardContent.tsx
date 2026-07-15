"use client";

import { useState, useEffect } from "react";
import ProfileInfo from "@/components/ProfileInfo";
import ManageItems, { Pet } from "@/components/ManageItems"; // এখান থেকে Pet ইম্পোর্ট হয়েছে
import Swal from "sweetalert2";

interface AdoptionBooking {
  _id: string;
  petId: string;
  petName: string;
  applicantName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface DashboardContentProps {
  bookings: AdoptionBooking[];
}

type TabType = "adoptions" | "profile" | "manage";

const DashboardContent: React.FC<DashboardContentProps> = ({ bookings }) => {
  const [activeTab, setActiveTab] = useState<TabType>("adoptions");
  const [allPets, setAllPets] = useState<Pet[]>([]);

  const fetchAllPets = async () => {
    try {
      const res = await fetch("https://paws-claws-server.vercel.app/admin/all-pets");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAllPets(data);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "manage") {
      fetchAllPets();
    }
  }, [activeTab]);

  const handleDelete = async (id: string, petName: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${petName}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0a9396",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://paws-claws-server.vercel.app/pets/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchAllPets();
          Swal.fire("Deleted!", `${petName} has been deleted.`, "success");
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-emerald-100 text-emerald-700";
      case "rejected": return "bg-rose-100 text-rose-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="flex flex-col gap-10 p-5 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center gap-4">
        {(["adoptions", "manage", "profile"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl transition-all duration-200 capitalize font-semibold ${
              activeTab === tab
                ? "bg-[#0a9396] text-white shadow-lg shadow-[#0a9396]/20"
                : "border-2 border-[#0a9396] text-[#0a9396] hover:bg-[#0a9396]/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {activeTab === "adoptions" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Your Adoption Applications</h2>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <th className="px-6 py-4">Pet Name</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 font-bold">{booking.petName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "manage" && (
          <ManageItems pets={allPets} onDelete={handleDelete} />
        )}

        {activeTab === "profile" && <ProfileInfo />}
      </div>
    </div>
  );
};

export default DashboardContent;