"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User2 } from "lucide-react";

export default function PaymentButton({
  amount,
  plan,
  purpose,
  buttonText = "Enroll Now",
  variant = "primary",
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
      refferBy: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    setApiError(""); // Clear previous API errors

    if (!form.name || form.name.trim().length < 4) {
      err.name = "Name must be at least 4 characters";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      err.email = "Please enter a valid email address";
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      err.mobile = "Mobile number must be exactly 10 digits";
    }
    if( !amount ||
  isNaN(Number(amount)) ||
  Number(amount) <= 0) {
      err.amount = "Invalid amount";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleClose = () => {
    if (loading) return; // Prevent closing while processing
    setOpen(false);
    setErrors({});
    setApiError("");
  };

 const startPayment = async () => {
  if (!validate()) return;

  try {
    setLoading(true);
    setApiError("");

    // Get UTM params
    const params = new URLSearchParams(window.location.search);

    const utm = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    };

    const orderRes = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        plan: purpose,
        name: form.name,
        email: form.email,
        phone: form.mobile,
        refferBy: form.refferBy || "Organic",

        // UTM Data
        utm,
        landingPage: window.location.href,
        referrer: document.referrer,
      }),
    });

    const orderData = await orderRes.json();

    if (!orderData.success) {
      throw new Error(orderData.error || "Order creation failed");
    }

    const paymentRes = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderData.orderId,
      }),
    });

    const paymentData = await paymentRes.json();

    if (paymentData.success && paymentData.paymentUrl) {
      window.location.href = paymentData.paymentUrl;
    } else {
      throw new Error("Payment URL not received from the server");
    }
  } catch (error) {
    setApiError(error.message);
  } finally {
    setLoading(false);
  }
};

  // Reusable error message component
  const ErrorMessage = ({ message }) => (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -5 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          className="text-red-500 text-xs mt-1.5 ml-1 flex items-center overflow-hidden"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02, translateY: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className={`${variant === "primary" ? "bg-[#003460] hover:bg-[#002a4d] text-white" : "bg-[#ffce00] hover:bg-[#e6b800] text-[#003460]"} justify-center flex items-center gap-2 px-8 py-3.5 rounded-full font-medium shadow-md transition-colors`}
      >
        <ShoppingCart size={18}/> {buttonText}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-10 w-full max-w-[420px] relative shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                disabled={loading}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-50 p-2 rounded-full transition-colors disabled:opacity-50"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header Icon matching the image style */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="mx-auto w-14 h-14 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-gray-50 flex items-center justify-center mb-6"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </motion.div>

              <h2 className="text-[22px] font-bold text-gray-900 text-center mb-2">
                Buy {plan} - ₹{amount}
              </h2>
              
              <p className="text-sm text-gray-500 text-center mb-8 px-4 leading-relaxed">
                Complete your details below to finalize the payment for {purpose}.
              </p>

              {/* API Error Display */}
              <AnimatePresence>
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-5 border border-red-100 text-center"
                  >
                    {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Fields styled like the image */}
              <div className="space-y-3.5 mb-6">
                <div>
                  <div className="relative flex items-center">
                    <svg className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      disabled={loading}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full bg-[#f4f5f7] rounded-xl py-3.5 pl-11 pr-4 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all ${
                        errors.name ? "ring-2 ring-red-400 bg-red-50/30" : "focus:bg-white focus:ring-2 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                  <ErrorMessage message={errors.name} />
                </div>

                <div>
                  <div className="relative flex items-center">
                    <svg className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      disabled={loading}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full bg-[#f4f5f7] rounded-xl py-3.5 pl-11 pr-4 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all ${
                        errors.email ? "ring-2 ring-red-400 bg-red-50/30" : "focus:bg-white focus:ring-2 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                  <ErrorMessage message={errors.email} />
                </div>

                <div>
                  <div className="relative flex items-center">
                    <svg className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Mobile Number"
                      value={form.mobile}
                      disabled={loading}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setForm({ ...form, mobile: value });
                      }}
                      className={`w-full bg-[#f4f5f7] rounded-xl py-3.5 pl-11 pr-4 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all ${
                        errors.mobile ? "ring-2 ring-red-400 bg-red-50/30" : "focus:bg-white focus:ring-2 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                  <ErrorMessage message={errors.mobile} />
                </div>
                <div>
                  <div className="relative flex items-center">
                    <User2 size={16} className="text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Learned about Kayapalat from"
                      value={form.refferBy}
                      disabled={loading}
                      onChange={(e) => {
                        setForm({ ...form, refferBy: e.target.value });
                      }}
                      className={`w-full bg-[#f4f5f7] rounded-xl py-3.5 pl-11 pr-4 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all ${
                        errors.refferBy ? "ring-2 ring-red-400 bg-red-50/30" : "focus:bg-white focus:ring-2 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Minimal Total Display matching the "Forgot Password" placement area */}
              <div className="flex justify-end items-center mb-6 px-1">
                <span className="text-sm text-gray-500">
                  Total Amount: <span className="font-semibold text-gray-900">₹{amount}</span>
                </span>
                <ErrorMessage message={errors.amount} />
              </div>

              {/* Submit Button styled like the image */}
              <motion.button
                whileTap={{ scale: loading ? 1 : 0.98 }}
                onClick={startPayment}
                disabled={loading}
                className="w-full relative flex items-center justify-center bg-[#003460] hover:bg-[#002a4d] text-white py-3.5 rounded-xl text-[15px] font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed overflow-hidden"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Redirecting...
                  </span>
                ) : (
                  "Get Started"
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}