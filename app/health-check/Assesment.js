"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/lib/questions";
import { generateReport } from "@/lib/rulesEngine";
import { BotBubble, UserBubble, TypingBubble } from "./Bubble";
import QuestionInput from "./QuestionInput";
import ReportView from "./ReportView";

const ANSWERABLE_TYPES = new Set([
  "number",
  "choice",
  "multi",
  "slider",
  "photo",
  "contact",
]);

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

    const delay = 550 + Math.random() * 450;
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
    }, delay);

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
    <div className="flex h-dvh w-full flex-col bg-moss">
      {/* Header / progress */}
      <header className="shrink-0 border-b border-sagedeep/60 bg-cream/80 px-4 pb-3 pt-4 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <p className="font-display text-lg italic text-forest">Kayapalat</p>
            <p className="-mt-0.5 text-[11px] uppercase tracking-[0.18em] text-ink/50">
              Health Reality Check
            </p>
          </div>
          <span className="font-mono text-xs text-ink/50">{progressPct}%</span>
        </div>
        <div className="mx-auto mt-2 h-1.5 max-w-2xl overflow-hidden rounded-full bg-sage">
          <div
            className="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.map((m) =>
            m.kind === "report" ? (
              <div key={m.id} className="flex justify-center py-2">
                <ReportView answers={answers} report={m.report} onCTA={handleCTA} />
              </div>
            ) : m.sender === "bot" ? (
              <BotBubble key={m.id}>{m.text}</BotBubble>
            ) : (
              <UserBubble key={m.id}>{m.text}</UserBubble>
            )
          )}
          {isTyping && <TypingBubble />}
          {emailSent && (
            <div className="mx-auto mt-1 flex items-center gap-2 rounded-full bg-forest/10 px-3 py-1.5 text-xs text-forest">
              <span>✓</span> A copy of your report has been emailed to {answers.email}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      {inputVisible && stepIndex < steps.length && (
        <div className="shrink-0 border-t border-sagedeep/60 bg-cream px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1">
          <div className="mx-auto max-w-2xl">
            <QuestionInput step={steps[stepIndex]} onAnswer={handleAnswer} />
          </div>
        </div>
      )}
    </div>
  );
}