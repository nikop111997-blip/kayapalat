"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  User,
  Mail,
  Phone,
  AlertCircle,
  Loader2,
} from "lucide-react";

const intakeData = {
  schedules: [
    "Corporate Executive / Leader",
    "Business Owner / Entrepreneur",
    "Homemaker / Managing the Household",
    "Working Professional",
  ],

  frustrations: [
    "Stubborn weight that no longer responds to dieting.",
    "Chronic fatigue, burnout, and lack of daily energy.",
    "Joint stiffness, loss of strength, or mobility issues.",
    "Managing lifestyle health markers (blood sugar, cholesterol, thyroid, etc.).",
  ],
};

const quizQuestions = [
  {
    id: "q1",
    prompt:
      "When work or family stress piles up, how do you usually handle it?",
    options: [
      {
        points: 0,
        text: "I get completely overwhelmed, my sleep gets ruined, and I end up comfort eating.",
      },
      {
        points: 5,
        text: "I push through it, but I feel tired all the time.",
      },
      {
        points: 10,
        text: "I manage okay, but my mind is always racing.",
      },
      {
        points: 20,
        text: "I handle stress well and stay calm.",
      },
    ],
  },

  {
    id: "q2",
    prompt: "How is your daily energy and metabolism?",
    options: [
      {
        points: 0,
        text: "I feel exhausted all day.",
      },
      {
        points: 5,
        text: "I crash in the afternoon.",
      },
      {
        points: 10,
        text: "I manage but energy is inconsistent.",
      },
      {
        points: 20,
        text: "I have stable energy throughout the day.",
      },
    ],
  },
];

export default function HealthQuiz({
  primaryColor = "#000000",
  apiEndpoint = "https://kayakalap.vercel.app/api/questions",
}) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    age: "",
    schedule: "",
    frustration: "",
    q1: null,
    q2: null,
    name: "",
    email: "",
    whatsapp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [backendScore, setBackendScore] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const prevStep = () => setStep((prev) => prev - 1);

  const progress = Math.min((step / 4) * 100, 100);

  const isIntakeValid =
    formData.age && formData.schedule && formData.frustration;

  const isContactValid =
    formData.name &&
    formData.email.includes("@") &&
    formData.whatsapp.length >= 7;

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },

    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isContactValid) return;

    setIsSubmitting(true);
    setSubmitError("");

    const score =
      quizQuestions[0].options[formData.q1]?.points +
      quizQuestions[1].options[formData.q2]?.points;

    const payload = {
      ...formData,
      score,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      setBackendScore(data?.score || score);

      nextStep();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#FAF9F6] p-4 md:p-8 font-manrope">
      <div className="max-w-7xl mx-auto bg-white rounded-[30px] overflow-hidden shadow-xl border border-gray-200 grid md:grid-cols-2">

        {/* LEFT */}
        <div className="bg-[#F4F6F4] p-8 md:p-14 flex flex-col justify-between">
          <div>
            <h1
              className="text-4xl md:text-[48px] font-semibold leading-tight tracking-tight"
              style={{ color: primaryColor }}
            >
              Simple plans.
              <br />
              Serious progress.
            </h1>

            <p className="text-gray-600 mt-6 leading-relaxed">
              Find out exactly why your weight is stuck and uncover the
              step-by-step method to restart your metabolism safely.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Personalised metabolic score",
                "Takes less than 2 minutes",
                "Actionable next steps",
                "Expert review by Ajay Sethi",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-gray-800"
                >
                  <CheckCircle2
                    className="w-5 h-5 mt-0.5"
                    style={{ color: primaryColor }}
                  />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block border-t border-gray-300 pt-8 mt-10">
            <p className="uppercase text-xs tracking-[0.2em] text-gray-500 font-semibold">
              Ready to take control?
            </p>

            <p className="text-gray-600 mt-2">
              Join members committed to becoming their healthiest selves.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-14 relative flex flex-col justify-center">

          {/* Progress */}
          {step < 4 && (
            <div className="w-full h-2 bg-gray-200 rounded-full mb-10 overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* STEP 0 */}
            {step === 0 && (
              <motion.div
                key="step-0"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2
                  className="text-3xl font-semibold mb-3"
                  style={{ color: primaryColor }}
                >
                  Let's understand your context
                </h2>

                <p className="text-gray-500 mb-8">
                  Just a few quick details before we begin.
                </p>

                <div className="space-y-5">

                  <input
                    type="number"
                    placeholder="Your Age"
                    value={formData.age}
                    onChange={(e) =>
                      handleInputChange("age", e.target.value)
                    }
                    className="w-full h-14 px-5 rounded-xl dark:text-gray-800 border border-gray-200 bg-gray-50 outline-none focus:bg-white"
                  />

                  <select
                    value={formData.schedule}
                    onChange={(e) =>
                      handleInputChange("schedule", e.target.value)
                    }
                    className="w-full h-14 px-5 rounded-xl border dark:text-gray-800 border-gray-200 bg-gray-50 outline-none"
                  >
                    <option value="">Select Schedule</option>

                    {intakeData.schedules.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <div className="space-y-3">
                    {intakeData.frustrations.map((item, idx) => {
                      const selected =
                        formData.frustration === item;

                      return (
                        <button
                          key={idx}
                          onClick={() =>
                            handleInputChange("frustration", item)
                          }
                          className={`w-full text-left p-4 rounded-xl dark:text-gray-800 border transition-all ${
                            selected
                              ? "bg-[#E8EFEA]"
                              : "bg-white"
                          }`}
                          style={{
                            borderColor: selected
                              ? primaryColor
                              : "#e5e7eb",
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={!isIntakeValid}
                    onClick={nextStep}
                    className="w-full h-14 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Start Assessment
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUIZ */}
            {step >= 1 && step <= 2 && (
              <motion.div
                key={`quiz-${step}`}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p
                  className="uppercase text-xs tracking-[0.2em] font-bold mb-3"
                  style={{ color: primaryColor }}
                >
                  Question {step} of 2
                </p>

                <h2 className="text-3xl font-semibold mb-8 dark:text-gray-800 leading-tight">
                  {quizQuestions[step - 1].prompt}
                </h2>

                <div className="space-y-4">
                  {quizQuestions[step - 1].options.map(
                    (option, idx) => {
                      const field = `q${step}`;

                      const selected =
                        formData[field] === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            handleInputChange(field, idx);

                            setTimeout(() => {
                              nextStep();
                            }, 300);
                          }}
                          className={`w-full p-5 rounded-xl dark:text-gray-800 border text-left transition-all ${
                            selected
                              ? "bg-[#E8EFEA]"
                              : "bg-white"
                          }`}
                          style={{
                            borderColor: selected
                              ? primaryColor
                              : "#e5e7eb",
                          }}
                        >
                          {option.text}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 mt-8 text-gray-500 hover:text-black"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              </motion.div>
            )}

            {/* CONTACT */}
            {step === 3 && (
              <motion.div
                key="contact"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2
                  className="text-3xl font-semibold mb-3 dark:text-gray-800"
                  style={{ color: primaryColor }}
                >
                  Your score is ready.
                </h2>

                <p className="text-gray-500 mb-8">
                  Enter your details to reveal your results.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full h-14 pl-12 pr-4 dark:text-gray-800 rounded-xl border border-gray-200 bg-gray-50"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full h-14 pl-12 pr-4 dark:text-gray-800 rounded-xl border border-gray-200 bg-gray-50"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                    <input
                      type="tel"
                      placeholder="WhatsApp Number"
                      required
                      value={formData.whatsapp}
                      onChange={(e) =>
                        handleInputChange(
                          "whatsapp",
                          e.target.value
                        )
                      }
                      className="w-full h-14 pl-12 pr-4 dark:text-gray-800 rounded-xl border border-gray-200 bg-gray-50"
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isContactValid || isSubmitting}
                    className="w-full h-14 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Reveal Results
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* RESULTS */}
            {step === 4 && (
              <motion.div
                key="results"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center"
              >
                <div
                  className="w-40 h-40 rounded-full border-[10px] mx-auto flex items-center justify-center text-5xl font-bold"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                  }}
                >
                  {backendScore}
                </div>

                <h2 className="text-4xl font-semibold mt-8">
                  Your Results
                </h2>

                <p className="text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
                  Your assessment has been completed successfully.
                </p>

                <a
                  href="https://wa.me/916377092229"
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-8 px-8 h-14 rounded-xl text-white font-medium"
                  style={{ backgroundColor: primaryColor }}
                >
                  Chat on WhatsApp
                  <ChevronRight className="w-5 h-5" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}