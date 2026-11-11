
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#111111] flex items-center justify-center px-5 py-16 overflow-hidden">

      <div className="w-full max-w-[1200px] mx-auto">

        {/* Main heading area */}
        <div className="relative text-center">



          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Arial] font-black uppercase tracking-[-0.075em] leading-[0.78] text-[clamp(4.2rem,14vw,6.5rem)]"
            style={{
              transform: "scaleX(0.88)",
            }}
          >
            THANK YOU
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-[600px] mx-auto mt-10 md:mt-14 text-sm md:text-base text-[#66635D] leading-7 px-4"
          >
            Your journey towards better health awareness starts here.
            Thank you for choosing Kayapalat. We've received your
            details and look forward to helping you take the next step.
          </motion.p>

        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/10 pt-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#77736C] font-semibold">
            A healthier you starts with awareness.
          </p>

          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-[#FFD200] hover:bg-black hover:text-white px-6 py-3 rounded-full text-sm font-bold transition-all duration-300"
          >
            Back to Home
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-widest text-[#A09C94]">
          <span>KAYAPALAT</span>
          <span>Thank you for being here.</span>
        </div>

      </div>
    </main>
  );
}
