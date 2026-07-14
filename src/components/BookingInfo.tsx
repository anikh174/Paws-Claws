"use client";
import { Button, Card } from "@heroui/react";
import { DeleteAlert } from "./DeleteAlert";
import Link from "next/link";
import EditModal from "./edit-modal/EditModal";
import { Calendar, User, Clock, Phone, Mail, FileText, Plus } from "lucide-react";

interface Booking {
  _id: string;
  docName: string;
  name: string;
  gender: string;
  departureDate: string;
  appointmentTime: string;
  reason: string;
  email: string;
  number: string;
}

const BookingInfo = ({ bookings = [] }: { bookings: Booking[] }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const upcomingBookings = bookings.filter(b => b.departureDate >= today).length;
  const completeBookings = bookings.filter(b => b.departureDate < today).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">My Bookings</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your upcoming and past medical appointments</p>
        </div>
        <Button
          as={Link as any} // Cast to any to resolve the TypeScript type mismatch
          href="/all-pets"
          className="bg-[#0a9396] text-white font-semibold shadow-md hover:bg-[#005f73] transition-colors"
          endContent={<Plus size={18} />}
          radius="lg"
        >
          New Appointment
        </Button>
      </div>

      {/* Status Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50/60 border border-emerald-100 p-5 rounded-xl text-center shadow-xs">
          <span className="text-3xl font-extrabold text-emerald-600">{completeBookings}</span>
          <p className="text-sm font-medium text-emerald-800 mt-1">Complete</p>
        </div>
        <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-xl text-center shadow-xs">
          <span className="text-3xl font-extrabold text-blue-600">{upcomingBookings}</span>
          <p className="text-sm font-medium text-blue-800 mt-1">Upcoming</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-center shadow-xs">
          <span className="text-3xl font-extrabold text-slate-700">{bookings.length}</span>
          <p className="text-sm font-medium text-slate-600 mt-1">Total Booking</p>
        </div>
      </div>

      {/* Booking List */}
      {bookings.length === 0 ? (
        <Card className="border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center shadow-none">
          <div className="flex flex-col items-center justify-center">
            <Calendar size={48} className="text-slate-400 mb-3" />
            <h3 className="text-xl font-bold text-slate-700">No Bookings Available</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm">
              You haven't scheduled any appointments yet. Click the button above to book one.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              className="bg-white border border-slate-100 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
              key={booking._id}
            >
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-700 md:text-lg">
                  Doctor: <span className="text-[#0a9396]">{booking.docName}</span>
                </span>
                <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium">
                  ID: {booking._id.slice(-6)}
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-800">Patient:</span> {booking.name} ({booking.gender})
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-800">Date:</span> {booking.departureDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-800">Time:</span> {booking.appointmentTime}
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <FileText size={16} className="text-slate-400 mt-0.5" />
                    <p>
                      <span className="font-medium text-slate-800">Reason:</span> {booking.reason}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <div className="space-y-2.5 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      <span>{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-slate-400" />
                      <span>{booking.number}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100 self-end w-full sm:w-auto justify-center">
                    <EditModal booking={booking} />
                    <DeleteAlert booking={booking} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingInfo;