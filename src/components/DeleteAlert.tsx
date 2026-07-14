"use client";

import { TrashBin } from "@gravity-ui/icons";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure 
} from "@heroui/modal"; 
import { Button } from "@heroui/button"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface BookingProps {
  booking: {
    _id: string;
    docName: string;
  };
}

export function DeleteAlert({ booking }: BookingProps) {
  const { docName, _id } = booking;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/booking/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success('Delete successful');
      onClose();
      
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button 
        onPress={onOpen}
        variant="bordered" 
        className="rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50"
        startContent={<TrashBin />}
      >
        Delete
      </Button>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="md"
      >
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-red-600 font-bold text-xl">
                Delete Booking permanently?
              </ModalHeader>
              <ModalBody>
                <p className="text-slate-600 leading-relaxed">
                  This will permanently delete <strong>{docName}'s booking appointment</strong> and all of its
                  data. This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onCloseModal}
                  isDisabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  color="danger" 
                  isLoading={isDeleting}
                  onPress={handleDelete}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}