"use client";
import React, { FormEvent, useState } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  Select,
} from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Heart } from "lucide-react";

interface PetDetails {
  _id: string;
  name: string;
  breed: string;
  image: string;
}

interface AdoptModalProps {
  isOpen: boolean;
  onClose: () => void;
  petDetails: PetDetails;
}

const AdoptModal = ({ isOpen, onClose, petDetails }: AdoptModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const adoptionData: any = Object.fromEntries(formData.entries());

    if (
      !adoptionData.applicantName ||
      !adoptionData.applicantEmail ||
      !adoptionData.applicantPhone ||
      !adoptionData.address ||
      !adoptionData.hasPetExperience ||
      !adoptionData.motivation
    ) {
      toast.error("Please fill in all the required fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: sessionData } = await authClient.getSession();
      const { data: tokenData } = await authClient.token();

      if (!sessionData?.user) {
        toast.error("Please login to submit an application");
        setIsSubmitting(false);
        return;
      }

      adoptionData.petId = petDetails._id;
      adoptionData.petName = petDetails.name;
      adoptionData.userId = sessionData.user.id;

      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:5000'}/adoptions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(adoptionData),
      });

      if (!res.ok) throw new Error("Submission failed");

      toast.success(`Adoption request submitted for ${petDetails.name}!`);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <div className="w-full h-48 overflow-hidden rounded-xl mb-4 shadow-sm">
                <img 
                  src={petDetails.image || "/placeholder-pet.jpg"} 
                  alt={petDetails.name} 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>

              <Modal.Heading className="text-2xl font-bold text-gray-800">
                Adoption Application
              </Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-gray-500">
                Apply to bring <span className="text-[#0a9396] font-bold">{petDetails.name}</span> home
              </p>
            </Modal.Header>
            
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label className="text-sm font-semibold text-gray-700">Your Full Name</Label>
                      <Input name="applicantName" placeholder="John Doe" className="mt-1 w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                      <Input name="applicantEmail" type="email" placeholder="johndoe@example.com" className="mt-1 w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                      <Input name="applicantPhone" placeholder="+88017XXXXXXXX" className="mt-1 w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-semibold text-gray-700">Your Home Address</Label>
                      <Input name="address" placeholder="Street, City, Country" className="mt-1 w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-semibold text-gray-700">Previous Pet Ownership Experience?</Label>
                      <Select name="hasPetExperience" className="w-full mt-1">
                        <Select.Trigger>
                          <Select.Value>Select an option</Select.Value>
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="yes">Yes, I currently have pets</ListBox.Item>
                            <ListBox.Item id="past">Yes, I had pets in the past</ListBox.Item>
                            <ListBox.Item id="no">No, this will be my first pet</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-semibold text-gray-700">Why do you want to adopt {petDetails.name}?</Label>
                      <TextArea name="motivation" placeholder="Please share your lifestyle..." className="mt-1 w-full" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    className="bg-[#0a9396] hover:bg-[#005f73] text-white font-bold rounded-xl w-full py-3 mt-4"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default AdoptModal;