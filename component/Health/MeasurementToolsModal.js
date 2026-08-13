"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function MeasurementToolsModal({
  open,
  onClose,
  onConvert,
  children,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 220,
            }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl max-w-2xl mx-auto bg-white shadow-2xl"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1.5 w-16 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="px-6 pb-3">
              <h2 className="text-xl font-bold">
                Measurement Tools
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Convert units or learn how to measure correctly.
              </p>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto px-6 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}