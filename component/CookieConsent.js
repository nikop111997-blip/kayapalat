
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShow(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-2 left-2 right-2 z-[99999] md:bottom-8 md:left-8 md:right-auto md:max-w-[420px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/90 p-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl sm:rounded-3xl sm:p-6 md:p-8">

            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#F9CF01] to-[#003460]" />

            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#003460]/10 bg-[#003460]/5 sm:h-12 sm:w-12 sm:rounded-2xl">
                <span className="text-lg sm:text-2xl">🍪</span>
              </div>

              <button
                onClick={rejectCookies}
                aria-label="Close"
                className="rounded-full bg-gray-50 p-1.5 text-gray-400 hover:text-gray-800 sm:p-2"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content */}
            <div className="mt-2.5 sm:mt-5">
              <h3 className="text-base font-bold tracking-tight text-gray-900 sm:text-xl">
                We value your privacy
              </h3>

              <p className="mt-1.5 text-[11px] leading-[1.5] text-gray-600 sm:mt-2 sm:text-sm sm:leading-relaxed">
                We use cookies and similar technologies to improve your
                experience, analyze website traffic, and support our
                marketing efforts. By clicking "Accept", you consent to
                our use of cookies.
              </p>

              <div className="mt-2 sm:mt-3">
                <Link
                  href="/privacy-policy"
                  className="text-xs font-semibold text-[#003460] underline-offset-2 hover:underline sm:text-sm"
                >
                  Read Privacy Policy
                </Link>
              </div>
            </div>

            {/* Buttons - Always same row */}
            <div className="mt-3 flex flex-row gap-2 sm:mt-8 sm:gap-3">
              <button
                onClick={acceptCookies}
                className="h-9 flex-1 rounded-full bg-[#003460] px-3 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#00284a] sm:h-12 sm:px-6 sm:text-base"
              >
                Accept All
              </button>

              <button
                onClick={rejectCookies}
                className="h-9 flex-1 rounded-full border border-gray-200 px-3 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50 sm:h-12 sm:border-2 sm:px-6 sm:text-base"
              >
                Decline
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
