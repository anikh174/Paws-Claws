"use client";

import { useState } from "react";
import ProfileInfo from "@/components/ProfileInfo";
import ManageItems from "@/components/ManageItems";
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
  const [allPets, setAllPets] = useState([]);

  const fetchAllPets = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/all-pets");
      const data = await res.json();
      setAllPets(data);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    }
  };

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
        const res = await fetch(`http://localhost:5000/pets/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchAllPets();
          Swal.fire("Deleted!", `${petName} has been deleted.`, "success");
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
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
    // p-10 কে p-5 md:p-10 করা হয়েছে যাতে মোবাইলে জায়গা বাঁচে
    <div className="flex flex-col gap-10 p-5 md:p-10 max-w-7xl mx-auto">
      
      {/* Tab Selection: flex-wrap যোগ করা হয়েছে */}
      <div className="flex flex-wrap items-center gap-4">
        {(["adoptions", "manage", "profile"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "manage") fetchAllPets();
            }}
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

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === "adoptions" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">Your Adoption Applications</h2>
              <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{bookings.length} Total</span>
            </div>
            
            {!bookings || bookings.length === 0 ? (
              <p className="p-12 text-center text-gray-500">You haven't applied for any adoptions yet.</p>
            ) : (
              // এখানে overflow-x-auto নিশ্চিত করা হয়েছে
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4">Pet Name</th>
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Applied Date</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0a9396]">{booking.petName}</td>
                        <td className="px-6 py-4 text-gray-600">{booking.applicantName}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {new Date(booking.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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