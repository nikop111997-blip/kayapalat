"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 1. The main content component that reads the URL
function PaymentStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Extract parameters from the URL
  const paymentStatus = searchParams.get("payment_status");
  const paymentId = searchParams.get("payment_id");
  
  const isFailed = paymentStatus?.toLowerCase() === "failed";
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Only trigger the countdown and redirect if the payment was SUCCESSFUL
    if (!isFailed) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);

      const redirect = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
  }, [isFailed, router]);

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isFailed ? "failed" : "success"}
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] max-w-[420px] w-full text-center relative overflow-hidden"
        >
          {isFailed ? (
            /* --- FAILED UI --- */
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", damping: 15, stiffness: 200 }}
                className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100"
              >
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>

              <h1 className="text-[24px] font-bold text-gray-900 mb-2">
                Payment Failed
              </h1>
              
              <p className="text-[15px] text-gray-500 mb-6 leading-relaxed px-2">
                We couldn't process your payment. No charges were made. Please try again.
              </p>

              {paymentId && (
                <div className="text-xs text-gray-400 mb-8 bg-gray-50 py-2 rounded-lg border border-gray-100">
                  Ref: {paymentId}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/")}
                className="w-full bg-[#1c1c1c] hover:bg-black text-white py-3.5 rounded-xl font-medium transition-colors"
              >
                Try Again
              </motion.button>
            </>
          ) : (
            /* --- SUCCESS UI --- */
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", damping: 15, stiffness: 200 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100"
              >
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </motion.div>

              <h1 className="text-[24px] font-bold text-gray-900 mb-2">
                Payment Successful!
              </h1>
              
              <p className="text-[15px] text-gray-500 mb-8 leading-relaxed px-2">
                Thank you for your purchase. Your transaction has been completed successfully.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center gap-3 border border-gray-100">
                <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm text-gray-600 font-medium">
                  Redirecting in <span className="text-gray-900 font-bold w-3 inline-block text-center">{countdown}</span>s...
                </span>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// 2. Next.js App Router requires useSearchParams to be wrapped in a Suspense boundary
export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center">
        <div className="animate-pulse bg-white p-8 rounded-3xl w-full max-w-[420px] h-[300px]"></div>
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
}