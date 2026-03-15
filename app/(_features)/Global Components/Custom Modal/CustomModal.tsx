"use client";
import { IoClose } from "react-icons/io5";

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pb-20 flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal Box */}
      <div
        className="
          relative bg-white w-full md:w-[90%] md:max-w-3xl
          rounded-t-3xl md:rounded-2xl
          shadow-xl overflow-hidden
          max-h-[92dvh] md:max-h-[90vh]
          flex flex-col
        "
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 rounded-full bg-primary-100" />
        </div>

        {/* Header — flex-row-reverse so in RTL: title right, close left; in LTR: title left, close right */}
        <div
          className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-primary-50"
        >
         
          {/* Title — rendered first in DOM, appears on the right in RTL */}
          <h2 className="text-lg md:text-xl font-semibold grow">{title}</h2>
          {/* Close Button — appears on the left in RTL */}
          <button
            onClick={onClose}
            className="cursor-pointer text-primary-500 hover:text-primary-400 transition"
          >
            <IoClose size={24} />
          </button>
        </div>
        

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 md:px-10 py-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
