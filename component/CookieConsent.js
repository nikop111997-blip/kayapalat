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
      // 1.5s delay feels much more premium and less intrusive
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
    // Enable Analytics / Meta Pixel here if needed
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShow(false);
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          // Floating in the bottom left on desktop, full width on mobile
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 z-[99999] md:max-w-[420px]"
        >
          {/* Glassmorphic Container */}
          <div className="relative bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-6 md:p-8 overflow-hidden">
            
            {/* Subtle Brand Color Accent Line at the top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F9CF01] to-[#003460] opacity-90" />
            
            <div className="flex justify-between items-start gap-4">
              {/* Icon Container */}
              <div className="flex-shrink-0 w-12 h-12 bg-[#003460]/5 rounded-2xl flex items-center justify-center border border-[#003460]/10">
                <span className="text-2xl drop-shadow-sm">🍪</span>
              </div>
              
              {/* Close Button */}
              <button
                onClick={rejectCookies}
                className="text-gray-400 hover:text-gray-800 hover:rotate-90 transition-all duration-300 bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-xl text-gray-900 tracking-tight">
                We value your privacy
              </h3>

              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                We use cookies and similar technologies to improve your
                experience, analyze website traffic, and support our
                marketing efforts. By clicking "Accept", you consent to
                our use of cookies.
              </p>

              <div className="mt-3">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[#003460] font-semibold hover:text-[#00284a] underline decoration-transparent hover:decoration-[#003460] transition-all duration-300"
                >
                  Read Privacy Policy
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={acceptCookies}
                className="flex-1 px-6 h-12 rounded-full bg-[#003460] font-semibold text-white hover:bg-[#00284a] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Accept All
              </button>

              <button
                onClick={rejectCookies}
                className="flex-1 px-6 h-12 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
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