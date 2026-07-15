"use client";

import { useState, useEffect } from "react";
import ProfileInfo from "@/components/ProfileInfo";
import ManageItems, { Pet } from "@/components/ManageItems";
import Swal from "sweetalert2";

export interface AdoptionBooking {
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
      const data: Pet[] = await res.json();
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
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "approved": return "bg-emerald-100 text-emerald-700";
      case "rejected": return "bg-rose-100 text-rose-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="flex flex-col gap-10 p-5 md:p-10 max-w-7xl mx-auto">
      {/* ট্যাব বাটন */}
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
              <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-md">
                Total: {bookings?.length || 0}
              </span>
            </div>

            {bookings && bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3 px-6">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 font-medium">Pet Name</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr 
                        key={booking._id} 
                        className="bg-gray-50/50 hover:bg-gray-50 transition-all rounded-lg border border-gray-100"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-700 rounded-l-xl">
                          {booking.petName}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right rounded-r-xl">
                          <button className="text-[#0a9396] hover:underline text-sm font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p>No adoption applications found yet.</p>
              </div>
            )}
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