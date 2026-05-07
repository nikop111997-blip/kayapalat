"use client";

import { useState } from "react";
import {
  Loader2,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

export default function HeroEmailSection({
  apiUrl = "https://kayakalap.vercel.app/api/newsletter",

  imageUrl = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      setEmail("");

      setStatus({
        type: "success",
        message: "You're in 🚀",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 font-manrope bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center overflow-hidden ">

        {/* LEFT CONTENT */}
        <div className="p-8 md:p-14 order-2">

          {/* Heading */}
          <h1 className="text-[42px] md:text-[48px] leading-[1.1] font-semibold text-black tracking-tight">
            Become 1% Better Every Day
          </h1>

          {/* Description */}
          <p className="mt-5 text-[15px] md:text-[16px] font-semibold leading-[1.7] text-black/70 max-w-xl">
            Join Ajay Sethi and become part of the Kayapalat community built on
            sustainable fitness, mindset, and lifestyle transformation.
            <br />
            Get expert tips, motivation, and proven strategies from India’s
            Fitness Lifestyle Coach straight to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-4 max-w-md"
          >

            {/* Label */}
            <label className="text-sm font-medium text-gray-900">
              Email Address
            </label>

            {/* Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="email"
                placeholder="kayapalat@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[58px] pl-12 pr-4 rounded-2xl border border-gray-300 bg-white text-sm outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 self-start px-7 h-[54px] rounded-full bg-[#F9CF01] text-black font-semibold shadow-md hover:opacity-90 transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : (
                <>Join the Movement</>
              )}
            </button>

            {/* Status */}
            {status.message && (
              <div
                className={`mt-1 flex items-center gap-2 text-sm font-medium ${
                  status.type === "success"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}

                <span>{status.message}</span>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end">

          <div className="relative w-full sm:max-w-[620px] sm:h-[620px] rounded-[34px] overflow-hidden shadowl-lg px-4 sm:px-0">

            {/* IMAGE */}
            <Image
              src="https://framerusercontent.com/images/r2FhVdgJMrYitkn9QiMl0yyQOU.png?width=727&height=826"
              alt="Ajay Sethi"
              fill
              className="w-full h-full object-cover"
            />

            </div>
        </div>
      </div>
    </section>
  );
}