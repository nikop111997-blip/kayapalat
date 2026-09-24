"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function MeasurementToolsModal({
  open,
  onClose,
  children,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* =====================================================
              BACKDROP
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[99990]
              bg-black/45
              backdrop-blur-[2px]
            "
            aria-hidden="true"
          />

          {/* =====================================================
              MODAL
          ====================================================== */}
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
            }}
            role="dialog"
            aria-modal="true"
            className="
              fixed
              inset-x-0
              bottom-0
              z-[99999]

              mx-auto
              flex
              w-full
              max-w-lg
              flex-col

              overflow-hidden

              rounded-t-[28px]
              bg-white

              shadow-[0_-15px_50px_rgba(0,0,0,0.20)]

              h-[90dvh]
              max-h-[90dvh]

              sm:bottom-4
              sm:h-auto
              sm:max-h-[85vh]
              sm:rounded-[28px]
            "
          >
            {/* =================================================
                HEADER
            ================================================== */}
            <div
              className="
                flex
                shrink-0
                items-center
                justify-between

                border-b
                border-gray-100

                bg-white

                px-5
                py-4

                sm:px-6
              "
            >
              <div className="min-w-0">
                <h2
                  className="
                    text-[18px]
                    font-bold
                    leading-tight
                    tracking-tight
                    text-gray-900

                    sm:text-xl
                  "
                >
                  Measurement Tools
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-relaxed
                    text-gray-500

                    sm:text-sm
                  "
                >
                  Convert or learn how to measure
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close measurement tools"
                className="
                  ml-4
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-500

                  transition-all
                  duration-200

                  hover:bg-gray-200
                  hover:text-gray-700

                  active:scale-95
                "
              >
                <X
                  size={21}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* =================================================
                SCROLLABLE CONTENT
            ================================================== */}
            <div
              className="
                min-h-0
                flex-1

                overflow-x-hidden
                overflow-y-auto

                overscroll-contain

                bg-white

                px-4
                pt-4
                pb-6

                touch-pan-y

                [-webkit-overflow-scrolling:touch]

                sm:px-5
                sm:pt-5
                sm:pb-6
              "
            >
              {children}
            </div>

    
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}