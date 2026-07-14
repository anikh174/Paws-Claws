"use client";
import { authClient } from "@/lib/auth-client";
import React, { useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  // 모ডাল কন্ট্রোল করার জন্য useRef
  const modalRef = useRef<HTMLDialogElement>(null);
  // বাটন লোডিং স্টেট কন্ট্রোল করার জন্য
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const photo = formData.get("photo") as string;

    try {
      await authClient.updateUser({
        image: photo,
        name: name,
      });
      
      toast.success("Profile updated successfully!");
      
      // সফল হলে ফর্ম রিসেট করে মোডাল অটোমেটিক বন্ধ করে দেওয়া
      (e.target as HTMLFormElement).reset();
      closeModal();
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="border-b-4 border-[#0a9396] text-[#0a9396] px-4 py-1 cursor-pointer flex rounded-full gap-1 items-center font-semibold transition-all hover:bg-[#0a9396]/10"
        onClick={openModal}
      >
        <BiEdit /> Update your information
      </button>

      {/* useRef ব্যবহার করে মোডাল রেন্ডার */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box p-4 rounded-xl bg-black border-[#0a9396] border-b-4 border-t-4 shadow-sm shadow-[#0a9396]">
          <div>
            <h2 className="font-bold text-3xl text-center text-[#0a9396]">
              Update your information
            </h2>

            <form
              className="mt-5 flex justify-center items-center"
              onSubmit={onSubmit}
            >
              <fieldset 
                className="fieldset bg-base-200 border-[#0a9396] rounded-box w-full max-w-sm border-4 p-4 relative"
                disabled={isLoading} // লোডিং অবস্থায় পুরো ফর্ম ডিসেবল থাকবে
              >
                <label className="label text-lg text-[#0a9396] font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type your name"
                  name="name"
                  required
                />

                <label className="label text-lg text-[#0a9396] font-semibold mt-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  className="input w-full"
                  placeholder="Enter your photo URL"
                  name="photo"
                  required
                />

                <button 
                  className="btn btn-neutral mt-6 w-full" 
                  type="submit"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </fieldset>
            </form>
          </div>

          <div className="modal-action">
            <button 
              type="button"
              onClick={closeModal}
              className="text-[#0a9396] border-2 border-[#0a9396] px-4 py-2 rounded-full font-bold text-sm lg:text-md cursor-pointer transition-all hover:bg-[#0a9396] hover:text-white hover:border-[#0a9396] hover:shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateProfile;