"use client";

import { motion } from "framer-motion";
import { IdCard } from "lucide-react";

export function FloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 
        h-14 w-14 rounded-full 
        bg-primary text-white 
        flex items-center justify-center
        shadow-lg z-50 cursor-pointer
      "
    >
      <IdCard className="w-6 h-6" />
    </button>
  );
}
