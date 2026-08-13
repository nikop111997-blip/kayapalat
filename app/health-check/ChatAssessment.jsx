"use client";

import { useEffect, useRef, useState } from "react";
import { BotBubble, UserBubble, TypingBubble } from "./ChatBubble";
import QuestionInput from "./QuestionInput";
import ReportView from "./ReportView";
import { steps } from "@/lib/questions";
import { generateReport } from "@/lib/rulesEngine";
import LanguageSwitcher from "@/component/Health/LanguageSelector";

const ANSWERABLE_TYPES = new Set(["number", "choice", "multi", "slider", "photo", "contact"]);

export default function ChatAssessment() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const scrollRef = useRef(null);
  const hasRunStep = useRef(new Set());

  const totalAnswerable = steps.filter((s) => ANSWERABLE_TYPES.has(s.type)).length;
  const answeredCount = steps
    .slice(0, stepIndex)
    .filter((s) => ANSWERABLE_TYPES.has(s.type)).length;
  const progressPct = Math.min(100, Math.round((answeredCount / totalAnswerable) * 100));

  const currentStep = steps[stepIndex];
  const isAnswerable = currentStep && ANSWERABLE_TYPES.has(currentStep.type);

  // Scroll the specific messages container to the bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, inputVisible]);

  useEffect(() => {
    if (stepIndex >= steps.length) return;
    if (hasRunStep.current.has(stepIndex)) return;
    hasRunStep.current.add(stepIndex);

    const step = steps[stepIndex];
    setInputVisible(false);
    setIsTyping(true);

    // Calculate dynamic delay based on upcoming text length
    const upcomingText = step.type === "report" ? "Generating your report..." : step.bot(answers);
    const textLength = upcomingText?.length || 20;
    const dynamicDelay = Math.min(2800, 600 + textLength * 20);

    const t = setTimeout(() => {
      setIsTyping(false);

      if (step.type === "report") {
        const report = generateReport(answers);
        setMessages((m) => [
          ...m,
          { id: step.id + "-bot", sender: "bot", kind: "text", text: step.bot(answers) },
          { id: step.id + "-card", sender: "bot", kind: "report", report },
        ]);
        setTimeout(() => setEmailSent(true), 1600);
        return;
      }

      setMessages((m) => [
        ...m,
        { id: step.id, sender: "bot", kind: "text", text: step.bot(answers) },
      ]);

      if (step.type === "bot") {
        setTimeout(() => setStepIndex((i) => i + 1), 500);
      } else {
        setInputVisible(true);
      }
    }, dynamicDelay);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  const handleAnswer = (value, display) => {
    const step = steps[stepIndex];
    setInputVisible(false);
    setMessages((m) => [...m, { id: step.id + "-answer", sender: "user", kind: "text", text: display }]);

    if (step.key) {
      setAnswers((a) => ({ ...a, [step.key]: value }));
    } else if (step.id === "photos") {
      setAnswers((a) => ({ ...a, frontPhoto: value.front, sidePhoto: value.side }));
    } else if (step.id === "contact") {
      setAnswers((a) => ({ ...a, name: value.name, email: value.email, mobile: value.mobile }));
    }

    setStepIndex((i) => i + 1);
  };

  const handleCTA = (type) => {
    setMessages((m) => [
      ...m,
      {
        id: "cta-" + type + Date.now(),
        sender: "bot",
        kind: "text",
        text:
          type === "call"
            ? "Great — a Kayapalat coach will reach out shortly to schedule your Complimentary Clarity Call."
            : `Awesome — you're one step from joining ${type === "elite" ? "Elite" : "Gold"} Membership. Redirecting you now...`,
      },
    ]);
  };

  return (
    <div className="flex h-[90vh] w-full sm:min-w-2xl mx-auto border border-gray-300 shadow-sm flex-col overflow-hidden bg-[#FAFAFA] font-sans">
      
      {/* Fixed Sticky Header */}
      <header className="sticky top-0 z-30 shrink-0 border-b border-gray-300 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] p-1">
              <img src="/3.png" alt="Kayapalat Logo" className="h-8 sm:h-10 w-auto" />
            </div>
            <div>
            <p className="text-xl sm:text-2xl font-bold font-sans">Kayapalat</p>
            <p className="mt-0.5 text-[9px] sm:text-[11px] uppercase text-ink/50">
              Health Reality Check
            </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
<LanguageSwitcher />
<div className="relative flex h-10 w-10 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-black/40"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="currentColor" strokeWidth="3"
              />
              <path
                className="text-forest transition-all duration-700 ease-out"
                strokeDasharray={`${progressPct}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[9px] font-bold text-forest">{progressPct}%</span>
          </div>
          </div>
          {/* Circular Progress Bar */}
          
        </div>
      </header>

      {/* Scrollable Messages Area (Flex Column to support bottom stacking) */}
      <div ref={scrollRef} className="flex-1 flex flex-col overflow-y-auto px-4 py-6">
        {/* Added w-full and mt-auto to push content to bottom until it overflows */}
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 pb-4 mt-auto">
          {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 opacity-80">
               <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#FECFEF] blur-2xl" />
             </div>
          )}
          {messages.map((m) =>
            m.kind === "report" ? (
              <div key={m.id} className="flex justify-center py-4">
                <ReportView answers={answers} report={m.report} onCTA={handleCTA} />
              </div>
            ) : m.sender === "bot" ? (
              <BotBubble key={m.id}>{m.text}</BotBubble>
            ) : (
              <UserBubble key={m.id}>{m.text}</UserBubble>
            )
          )}
          
          {/* Chat area typing indicator */}
          {isTyping && <TypingBubble />}
          
          {emailSent && (
            <div className="mx-auto mt-2 flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-xs text-forest">
              <span>✓</span> A copy of your report has been emailed to {answers.email}
            </div>
          )}
        </div>
      </div>

      {/* Permanently Fixed Input Area */}
      <div className="relative z-20 flex min-h-[85px] shrink-0 items-end bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="mx-auto w-full max-w-2xl transition-all duration-300">
          
          {stepIndex >= steps.length || currentStep?.type === "report" ? (
            // Chat finished or generating report
            <div className="flex w-full items-center gap-3 rounded-full bg-gray-50 px-3 py-2 ring-1 ring-black/5 opacity-50">
              <input disabled placeholder="Assessment complete" className="h-10 w-full cursor-not-allowed bg-transparent px-2 text-[15px] outline-none" />
            </div>
          ) : isAnswerable && !isTyping ? (
            // Answerable step
            <div className="opacity-100 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-2">
              <QuestionInput key={currentStep.id || stepIndex} step={currentStep} onAnswer={handleAnswer} />
            </div>
          ) : (
            // Bot typing or transitioning
            <div className="flex w-full animate-pulse items-center gap-3 rounded-full bg-white px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5 opacity-60 transition-all">
              <button disabled className="flex h-10 w-10 items-center justify-center text-ink/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
              </button>
              <div className="flex h-10 flex-1 items-center gap-2">
                <svg className="animate-spin text-ink/30" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="30 60" strokeLinecap="round" /></svg>
                <input disabled placeholder="Kayapalat AI is thinking..." className="w-full bg-transparent text-[15px] outline-none" />
              </div>
              <button disabled className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]/40 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}