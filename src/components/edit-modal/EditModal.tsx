"use client";
import React, { FormEvent } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
  TimeField,
} from "@heroui/react";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";

// TypeScript ইন্টারফেস (যদি প্রোজেক্টে TS থাকে, না থাকলে টাইপগুলো রিমুভ করতে পারেন)
interface BookingData {
  _id: string;
  docName: string;
  name: string;
  email: string;
  number: string;
  gender?: string;
  departureDate?: string;
  reason?: string;
  appointmentTime?: string;
}

interface EditModalProps {
  booking: BookingData;
}

const EditModal = ({ booking }: EditModalProps) => {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedBooking = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/booking/${booking._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          // যদি অথেনটিকেশন টোকেন লাগে তবে এখানে Bearer টোকেন যুক্ত করতে পারেন
        },
        body: JSON.stringify(updatedBooking),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Edit successful");
      
      // ক্লায়েন্ট সাইড রাউটিং এর মাধ্যমে ড্যাশবোর্ডে পাঠানো
      router.push("/dashboard");
      // প্রয়োজনে পেজের ডাটা রিফ্রেশ করতে পারেন
      router.refresh(); 
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during update.");
    }
  };

  return (
    <div>
      <Modal>
        {/* ওপেনিং বাটন ট্রিগার */}
        <Button 
          variant="outline" 
          className="border-2 border-[#0a9396] text-[#0a9396] hover:bg-[#0a9396] hover:text-white rounded-lg gap-2 transition-all duration-200"
        >
          <BiEdit size={16} /> Edit
        </Button>
        
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-2xl font-bold text-gray-800">
                  Edit Appointment
                </Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-gray-500">
                  with <span className="text-lg font-bold text-[#0a9396]">{booking.docName}</span>
                </p>
              </Modal.Header>
              
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      
                      {/* ডক্টর নেম (ডিজেবলড বা রিড-অনলি) */}
                      <div>
                        <TextField defaultValue={booking.docName} name="docName" isRequired isDisabled>
                          <Label className="text-sm font-semibold text-gray-700">Doctor Name</Label>
                          <Input className="rounded-lg mt-1" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* পেশেন্ট নেম */}
                      <div>
                        <TextField defaultValue={booking.name} name="name" isRequired>
                          <Label className="text-sm font-semibold text-gray-700">Patient Name</Label>
                          <Input placeholder="Your Name" className="rounded-lg mt-1" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* ইমেইল */}
                      <div>
                        <TextField defaultValue={booking.email} name="email" type="email" isRequired>
                          <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                          <Input placeholder="Your Email" className="rounded-lg mt-1" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* ফোন নাম্বার */}
                      <div>
                        <TextField defaultValue={booking.number} name="number" isRequired>
                          <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                          <Input placeholder="Your Number" className="rounded-lg mt-1" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* জেন্ডার এবং ডিপার্চার ডেট এর ফ্লেক্স লেআউট ঠিক করা হয়েছে */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Select
                            name="gender"
                            defaultSelectedKey={booking.gender}
                            isRequired
                            className="w-full"
                            placeholder="Select"
                          >
                            <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                            <Select.Trigger className="rounded-lg mt-1">
                              <Select.Value />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                              <ListBox>
                                <ListBox.Item id="male" textValue="Male">Male</ListBox.Item>
                                <ListBox.Item id="female" textValue="Female">Female</ListBox.Item>
                                <ListBox.Item id="others" textValue="Others">Others</ListBox.Item>
                              </ListBox>
                            </Select.Popover>
                          </Select>
                        </div>

                        <div>
                          <TextField
                            defaultValue={booking.departureDate}
                            name="departureDate"
                            type="date"
                            isRequired
                          >
                            <Label className="text-sm font-semibold text-gray-700">Departure Date</Label>
                            <Input type="date" className="rounded-lg mt-1" />
                            <FieldError />
                          </TextField>
                        </div>
                      </div>

                      {/* রিজন বা ডেসক্রিপশন */}
                      <div>
                        <TextField defaultValue={booking.reason} name="reason" isRequired>
                          <Label className="text-sm font-semibold text-gray-700">Reason for Visit</Label>
                          <TextArea placeholder="Describe your reason" className="rounded-lg mt-1" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* টাইম ফিল্ড */}
                      <div>
                        <TimeField isRequired className="w-full" name="appointmentTime">
                          <Label className="text-sm font-semibold text-gray-700">Appointment Time</Label>
                          <TimeField.Group className="mt-1">
                            <TimeField.Input>
                              {(segment) => <TimeField.Segment segment={segment} />}
                            </TimeField.Input>
                          </TimeField.Group>
                        </TimeField>
                      </div>
                    </div>

                    {/* সাবমিট বোতাম */}
                    <Button
                      type="submit"
                      slot="close"
                      className="bg-[#0a9396] hover:bg-[#005f73] text-white font-bold rounded-lg w-full py-3 mt-4 transition-all"
                    >
                      Save Changes
                    </Button>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditModal;