"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

import {
  ArrowUpRight,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

const getTrackingData = () => {
  const params = new URLSearchParams(window.location.search)

  return {
    source: params.get("utm_source") || "direct",
    medium: params.get("utm_medium") || "website",
    campaign: params.get("utm_campaign") || "default",
  }
}

export default function BookingComponent({ pricing = false, navbar=false }) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    goal: "",
    currentWeight: "",
    source: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Specific validation for phone number input
    if (name === "phone") {
      // Remove all non-digit characters (prevents text)
      const numericValue = value.replace(/\D/g, "")
      
      // Restrict to maximum 10 digits
      const truncatedValue = numericValue.slice(0, 10)

      setFormData((prev) => ({
        ...prev,
        [name]: truncatedValue,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const closeModal = () => {
    setIsOpen(false)

    setTimeout(() => {
      setSubmitSuccess(false)
      setSubmitError("")
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        goal: "",
        currentWeight: "",
        knowusFrom: "",
      })
    }, 300)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError("")

    // Validate phone number before submitting
    // Must start with 6, 7, 8, or 9 and be exactly 10 digits long
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      setSubmitError("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.")
      return
    }

    setIsSubmitting(true)
    const tracking = getTrackingData()
    
    try {
      const response = await fetch("/api/lead-ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          utm_source: tracking.source,
          utm_medium: tracking.medium,
          utm_campaign: tracking.campaign,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit booking")
      }

      setSubmitSuccess(true)

      setTimeout(() => {
        closeModal()
      }, 3000)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const goalOptions = [
    "Weight Loss",
    "Building Strength/Muscle",
    "Improving Energy & Sleep",
    "Post-Pregnancy Transformation",
    "Managing Lifestyle Diseases (Diabetes, PCOD, etc.)",
    "Other"
  ]

  const sourceOptions = [
    "Google",
    "Social Media",
    "Word of mouth",
    "News",
    "Other"
  ]

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] bg-black/50 font-manrope backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 md:px-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Request a Callback
              </h2>

              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition text-gray-500"
              >
                <X size={22} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {submitSuccess ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={42} />
                  </div>

                  <h3 className="text-3xl font-bold mb-3">
                    Details Received!
                  </h3>

                  <p className="text-gray-500">
                    Thank you. We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-3 flex gap-3 text-red-700 mb-6">
                      <AlertCircle size={20} className="shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Smith"
                      required
                    />

                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      maxLength={10}
                      pattern="[6-9][0-9]{9}"
                      title="Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9999999999"
                      required
                    />

                    <Input
                      label="Email id"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@gmail.com"
                      required
                    />

                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      required
                    />
                  </div>

                  <Select
                    label="What is your goal?"
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    options={goalOptions}
                    required
                  />

                  <Input
                    label="What is your current weight? (Optional)"
                    name="currentWeight"
                    value={formData.currentWeight}
                    onChange={handleInputChange}
                    placeholder="e.g. 75 kg"
                  />

                  <Select
                    label="Where did you hear about us?"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    options={sourceOptions}
                    required
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 flex items-center justify-center gap-3 bg-[#003460] hover:bg-[#00284a] transition text-white px-8 py-4 rounded-full font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Request Callback"}

                    {!isSubmitting && <ArrowUpRight size={18} />}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(true)}
        className={`group flex items-center cursor-pointer ${navbar?'bg-transparent py-2 border border-white':'bg-[#FFD200] py-4 border-2'}  justify-center gap-3  border-[#FFD200] rounded-full px-7 ${
          pricing ? "py-3 border-0 bg-[#FFD200]" : ""
        } font-medium hover:bg-black hover:text-white transition-all duration-300`}
      >
        <span>Start Transformation</span>

        <div className="transition-all duration-300 group-hover:bg-white group-hover:text-black rounded-full p-1">
          <ArrowUpRight
            size={18}
            className="group-hover:rotate-45 -rotate-0 transition-transform duration-300"
          />
        </div>
      </motion.button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 mb-2 block">
        {label}
      </label>

      <input
        {...props}
        className="w-full border border-gray-200 rounded-2xl h-12 px-5 outline-none focus:border-[#003460] transition bg-white"
      />
    </div>
  )
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 mb-2 block">
        {label}
      </label>

      <select
        {...props}
        className="w-full border border-gray-200 rounded-2xl h-12 px-5 outline-none focus:border-[#003460] transition bg-white"
      >
        <option value="" disabled>
          Select...
        </option>

        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}