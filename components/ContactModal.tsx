"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContactModal } from "@/components/ContactModalContext";
import LeadForm from "@/components/LeadForm";

export default function ContactModal() {
  const { isOpen, close } = useContactModal();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-navy/50 transition hover:bg-navy/5 hover:text-navy"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <p className="font-serif text-2xl text-navy">Get in Touch</p>
            <p className="mt-1 mb-5 text-sm text-navy/60">
              Tell me a bit about what you&apos;re looking for and I&apos;ll
              respond personally, usually within a few hours.
            </p>
            <LeadForm formType="contact" compact onSuccess={close} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
