"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 1. FORM CONFIGURATIONS
// ==========================================
const formConfigs = {
  elite: {
    title: "Elite Discovery Form",
    subtitle: "Your Personal Transformation Strategy Assessment",
    steps: [
      {
        id: "section_1", title: "Section 1: About You",
        fields: [
          { name: "fullName", label: "Full Name", type: "text" },
          { name: "mobile", label: "Mobile Number", type: "tel" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "age", label: "Age", type: "radio", options: ["Under 30", "30–39", "40–49", "50–59", "60+"] },
          { name: "city", label: "City", type: "text" },
          { name: "occupation", label: "Occupation", type: "text" }
        ]
      },
      {
        id: "section_2", title: "Section 2: Your Current Situation",
        fields: [
          { name: "primaryGoal", label: "What is your primary goal right now?", type: "checkbox", options: ["Lose Weight", "Reduce Body Fat", "Improve Health", "Increase Energy", "Get Fit & Strong", "Improve Confidence", "Improve Medical Parameters", "Prepare for an Event", "Other"] },
          { name: "weightLossGoal", label: "How much weight would you ideally like to lose?", type: "radio", options: ["Less than 5 kg", "5–10 kg", "10–20 kg", "20–30 kg", "More than 30 kg", "Weight loss is not my primary goal"] },
          { name: "healthRating", label: "On a scale of 1–10, how would you rate your current health and fitness?", type: "radio", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
          { name: "biggestChallenge", label: "What is your biggest challenge today?", type: "checkbox", options: ["Lack of Time", "Lack of Consistency", "Lack of Accountability", "Stress & Emotional Eating", "Exercise", "Nutrition", "Motivation", "Medical Concerns", "Other"] }
        ]
      },
      {
        id: "section_3", title: "Section 3: Your Why",
        fields: [
          { name: "whyImportant", label: "Why is achieving this goal important to you right now?", type: "textarea" },
          { name: "concerns", label: "If nothing changes over the next 12 months, what concerns you the most?", type: "textarea" }
        ]
      },
      {
        id: "section_4", title: "Section 4: Coachability & Commitment",
        fields: [
          { name: "timeCommitment", label: "Can you commit 45–60 minutes per day toward improving your health?", type: "radio", options: ["Yes", "Most Days", "Not Sure"] },
          { name: "openToCoaching", label: "Are you open to being coached and following a structured plan?", type: "radio", options: ["Absolutely", "Mostly", "Not Sure"] },
          { name: "workedWithCoach", label: "Have you worked with a Coach before?", type: "radio", options: ["Yes", "No"] }
        ]
      },
      {
        id: "section_5", title: "Section 5: Elite Membership Fit",
        fields: [
          { name: "supportLookingFor", label: "What kind of support are you looking for?", type: "checkbox", options: ["Personal Accountability", "Private Coaching", "Nutrition Guidance", "Exercise Guidance", "Mindset Support", "Complete Transformation", "Performance Coaching"] },
          { name: "whyElite", label: "Why are you interested in the Elite Membership instead of the Gold Membership?", type: "textarea" },
          { name: "bestDescribesYou", label: "Which statement best describes you?", type: "radio", options: ["I am looking for general guidance.", "I am looking for accountability and support.", "I want personalised coaching and faster results."] }
        ]
      },
      {
        id: "section_6", title: "Section 6: Investment Readiness",
        fields: [
          { name: "investmentReady", label: "If we believe Elite is the right fit for you, are you prepared to invest in a premium coaching program designed to help you achieve your goals?", type: "radio", options: ["Yes", "I would like to understand more first", "Not Sure"] }
        ]
      },
      {
        id: "section_7", title: "Section 7: Final Question",
        fields: [
          { name: "anythingElse", label: "Is there anything else you would like us to know before our conversation?", type: "textarea" }
        ]
      }
    ]
  },
  legacy: {
    title: "Legacy Commitment Form",
    subtitle: "Your Next Chapter Starts Here",
    steps: [
      {
        id: "section_1", title: "Section 1: About You",
        fields: [
          { name: "fullName", label: "Full Name", type: "text" },
          { name: "mobile", label: "Mobile Number", type: "tel" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "city", label: "City", type: "text" },
          { name: "coachName", label: "Coach Name", type: "text" }
        ]
      },
      {
        id: "section_2", title: "Section 2: Your Journey So Far",
        fields: [
          { name: "duration", label: "How long have you been a Kayapalat Member?", type: "radio", options: ["3–6 Months", "6–12 Months", "1–2 Years", "2+ Years"] },
          { name: "biggestAchievement", label: "What has been your biggest achievement so far?", type: "checkbox", options: ["Weight Loss", "Improved Health", "Better Energy", "Better Confidence", "Improved Fitness", "Improved Lifestyle Habits", "Other"] },
          { name: "biggestWin", label: "Please share your biggest win since joining Kayapalat.", type: "textarea" }
        ]
      },
      {
        id: "section_3", title: "Section 3: Your Next Level",
        fields: [
          { name: "whyLegacy", label: "Why would you like to become a Legacy Member?", type: "textarea" },
          { name: "nextGoals", label: "What are your next health, fitness, or lifestyle goals?", type: "checkbox", options: ["Reach Ideal Body Weight", "Maintain My Results", "Improve Fitness", "Build Strength", "Fitness Icon", "Running & Performance Goals", "Family Wellness", "Long-Term Lifestyle Support", "Other"] },
          { name: "valuableSupport", label: "What support would be most valuable for you going forward?", type: "checkbox", options: ["Accountability", "Community", "Fitness Coaching", "Nutrition Guidance", "Performance Coaching", "Family Wellness Support", "All of the Above"] }
        ]
      },
      {
        id: "section_4", title: "Section 4: Your Commitment",
        fields: [
          { name: "bestDescribesYouLegacy", label: "Which statement best describes you?", type: "radio", options: ["I want to maintain my results.", "I want to continue improving.", "I want wellness to become a permanent lifestyle."] },
          { name: "readyToCommit", label: "Legacy Membership is a 6-month commitment to your long-term health and well-being. Are you ready to make that commitment?", type: "radio", options: ["Yes", "I would like to know more first"] }
        ]
      }
    ]
  }
};

// ==========================================
// 2. INTERNAL ANIMATED PORTAL COMPONENT
// ==========================================
function AnimatedPortalModal({ isOpen, onClose, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[99vh] flex flex-col relative overflow-hidden z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 font-bold text-2xl z-20">
              &times;
            </button>
            <div className="overflow-y-auto p-6 md:p-8 flex-grow custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ==========================================
// 3. MAIN SMART COMPONENT (EXPORTED)
// ==========================================
export default function PlanButton({ planName }) {
  const type = planName.toLowerCase();
  const formConfig = formConfigs[type];
  const isElite = type === "elite";

  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useState("intro"); // "intro", "form", "submitting", "success"
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  if (!formConfig) return null;

  const handleOpen = () => {
    setViewState("intro");
    setCurrentStep(0);
    setFormData({});
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setErrorMsg(""); // Clear errors on input
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const currentList = prev[name] || [];
        if (checked) return { ...prev, [name]: [...currentList, value] };
        return { ...prev, [name]: currentList.filter((item) => item !== value) };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validation function for Required Fields
  const validateCurrentStep = () => {
    const fields = formConfig.steps[currentStep].fields;
    for (let field of fields) {
      const val = formData[field.name];
      if (!val || val.length === 0) {
        setErrorMsg(`Please fill out: ${field.label}`);
        return false;
      }
    }
    setErrorMsg("");
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setViewState("submitting");

    try {
      // TODO: Replace this timeout with your actual API fetch call
      // Example: await fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
    const payload = {
  plan: planName,
  ...formData,
};

const response = await fetch("/api/plan-application", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const result = await response.json();

if (!response.ok || !result.success) {
  throw new Error(result.message || "Submission failed");
}

setViewState("success");

setTimeout(() => {
  setIsModalOpen(false);
}, 5000);


    } catch (error) {
      console.error("Submission failed", error);
      setErrorMsg("Something went wrong. Please try again.");
      setViewState("form");
    }
  };

  const renderField = (field) => {
    if (field.type === "textarea") {
      return (
        <textarea name={field.name} onChange={handleInputChange} value={formData[field.name] || ""} rows={3}
          className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      );
    }
    if (field.type === "radio") {
      return (
        <div className="mt-2 space-y-2">
          {field.options.map((opt) => (
            <label key={opt} className="flex items-center space-x-3 cursor-pointer">
              <input type="radio" name={field.name} value={opt} onChange={handleInputChange} checked={formData[field.name] === opt} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      );
    }
    if (field.type === "checkbox") {
      return (
        <div className="mt-2 space-y-2">
          {field.options.map((opt) => (
            <label key={opt} className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name={field.name} value={opt} onChange={handleInputChange} checked={(formData[field.name] || []).includes(opt)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
          {field.options.includes("Other") && (formData[field.name] || []).includes("Other") && (
            <input type="text" name={`${field.name}_other`} onChange={handleInputChange} placeholder="Please specify..." className="w-full border border-gray-300 p-2 rounded-md mt-2 ml-7 w-[calc(100%-1.75rem)]" />
          )}
        </div>
      );
    }
    return (
      <input type={field.type} name={field.name} onChange={handleInputChange} value={formData[field.name] || ""}
        className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    );
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleOpen}
        className={`px-8 py-3 font-semibold rounded-lg shadow-md text-white transition-colors bg-black`}
      >
        Apply Now
      </motion.button>

      <AnimatedPortalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        
        {/* VIEW 1: INTRO SCREEN */}
        {viewState === "intro" && (
          <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 space-y-6 animate-in fade-in zoom-in duration-300">
            <h2 className="text-4xl font-bold text-gray-900">{formConfig.title}</h2>
            <p className="text-xl text-gray-700 font-medium">{formConfig.subtitle}</p>
            
            <div className="text-left text-gray-700 space-y-4 max-w-2xl mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              {planName === "Elite" ? (
                <>
                  <h3 className="font-bold text-lg text-gray-900">Before We Meet...</h3>
                  <p>Thank you for your interest in the Kayapalat Elite Membership.</p>
                  <p>This short assessment helps us understand your goals, challenges, lifestyle, and expectations so we can determine whether the Elite Membership is the right fit for you and prepare for a meaningful conversation.</p>
                  <p className="inline-block mt-4 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-semibold shadow-sm">⏳ Estimated Time: 3–4 Minutes</p>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-lg text-gray-900">Before You Become a Legacy Member...</h3>
                  <p>Congratulations on reaching this stage of your journey.</p>
                  <p>The Legacy Membership is reserved for members who have already experienced the Kayapalat Method and are ready to make wellness a lifelong lifestyle.</p>
                  <p>This short form helps us understand your journey so far and how we can support your next level of growth.</p>
                  <p className="inline-block mt-4 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-semibold shadow-sm">⏳ Estimated Time: 2 Minutes</p>
                </>
              )}
            </div>

            <button 
              onClick={() => setViewState("form")}
              className={`mt-8 px-8 py-4 font-bold text-lg rounded-xl shadow-lg text-white transition-all transform hover:-translate-y-1 bg-[#003460]`}
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* VIEW 2: THE FORM */}
        {viewState === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col h-full animate-in fade-in duration-300">
            <div className="mb-6 border-b pb-6">
              <h2 className="text-3xl font-bold text-gray-900">{formConfig.title}</h2>
              <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-[#003460] h-2 rounded-full"
                  initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / formConfig.steps.length) * 100}%` }} transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Step {currentStep + 1} of {formConfig.steps.length}
              </div>
            </div>

            <div className="flex-grow min-h-[520px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
                  className="absolute w-full"
                >
                  <h3 className="text-xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3 mb-6">
                    {formConfig.steps[currentStep].title}
                  </h3>
                  {errorMsg && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium">
                      ⚠️ {errorMsg}
                    </div>
                  )}
                  <div className="space-y-6 pb-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                    {formConfig.steps[currentStep].fields.map((field) => (
                      <div key={field.name}>
                        <label className="text-base font-medium text-gray-900">
                          {field.label} <span className="text-red-500">*</span>
                        </label>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>

                  {/* Error Message Display */}
                  

                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between mt-10 pt-6 border-t relative z-10 bg-white">
              <button 
                type="button"
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 disabled:opacity-50" 
                onClick={() => {
                  setErrorMsg("");
                  setCurrentStep(prev => prev - 1);
                }} 
                disabled={currentStep === 0}
              >
                Back
              </button>
              
              {currentStep < formConfig.steps.length - 1 ? (
                <button type="button" className="px-6 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800" onClick={handleNext}>
                  Next Step
                </button>
              ) : (
                <button type="submit" className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 shadow-md">
                  Submit Assessment
                </button>
              )}
            </div>
          </form>
        )}

        {/* VIEW 3: LOADING/SUBMITTING */}
        {viewState === "submitting" && (
          <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-600">Submitting your assessment...</p>
          </div>
        )}

        {/* VIEW 4: SUCCESS MESSAGE */}
        {viewState === "success" && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="flex flex-col items-center justify-center h-[50vh] space-y-6 text-center"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-sm">
              ✓
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
              {planName==='Elite'? <div>
                <p className="text-gray-600 text-lg">Thank you for completing the Elite Discovery Form.</p>
                <p className="text-gray-600 text-lg">Our team will review your responses and contact you shortly.</p>
                <p className="text-gray-600 text-lg">If we feel Elite is the right fit for your goals, we will invite you for a complimentary Transformation Strategy Call.</p>
              <p className="text-gray-400 text-sm mt-4">Closing automatically...</p>
              </div> : <div>
                 <p className="text-gray-600 text-lg">Thank you for your interest in becoming a Legacy Member.</p>
                <p className="text-gray-600 text-lg">A Coach will review your responses and connect with you to discuss the next step in your journey.</p>
                <p className="text-gray-600 text-lg">Remember: Gold helps you begin. Elite helps you accelerate. Legacy helps you stay transformed for life.</p>
              <p className="text-gray-400 text-sm mt-4">Closing automatically...</p>
                </div>}
            </div>
          </motion.div>
        )}

      </AnimatedPortalModal>
    </>
  );
}