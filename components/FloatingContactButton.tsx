"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useContactModal } from "@/components/ContactModalContext";

export default function FloatingContactButton() {
  const pathname = usePathname();
  const { open } = useContactModal();

  if (pathname === "/contact") return null;

  return (
    <motion.button
      type="button"
      onClick={open}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-navy/20 hover:bg-accent sm:flex"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Ask Sunny
    </motion.button>
  );
}
