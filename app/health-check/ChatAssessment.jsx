"use client";

import { useEffect, useRef, useState } from "react";
import { BotBubble, UserBubble, TypingBubble } from "./ChatBubble";
import QuestionInput from "./QuestionInput";
import ReportView from "./ReportView";
import { steps } from "@/lib/questions";
import { ArrowRight, DownloadIcon, HeadsetIcon, HelpingHand } from "lucide-react";

const ANSWERABLE_TYPES = new Set([
  "number",
  "choice",
  "multi",
  "slider",
  "contact",
]);

const REPORT_LOADING_MESSAGES = [
  "Analyzing your health information...",
  "Looking for important health patterns...",
  "Calculating your personalized health score...",
  "Preparing your personalized health insights...",
  "Your report is almost ready...",
];

export default function ChatAssessment({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [reportId, setReportId] = useState(null);
  const [report, setReport] = useState(null);

  const [reportLoadingIndex, setReportLoadingIndex] = useState(0);
  const [reportGenerating, setReportGenerating] = useState(false);

  const scrollRef = useRef(null);
  const hasRunStep = useRef(new Set());

  const totalAnswerable = steps.filter((s) =>
    ANSWERABLE_TYPES.has(s.type)
  ).length;

  const answeredCount = steps
    .slice(0, stepIndex)
    .filter((s) => ANSWERABLE_TYPES.has(s.type))
    .length;

  const progressPct = Math.min(
    100,
    Math.round((answeredCount / totalAnswerable) * 100)
  );

  const currentStep = steps[stepIndex];

  const isAnswerable =
    currentStep &&
    ANSWERABLE_TYPES.has(currentStep.type);

  /*
   * ----------------------------------------
   * Scroll chat to bottom
   * ----------------------------------------
   */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [
    messages,
    isTyping,
    inputVisible,
    reportLoadingIndex,
  ]);

  /*
   * ----------------------------------------
   * Skip photo questions completely
   * ----------------------------------------
   */
  useEffect(() => {
    if (stepIndex >= steps.length) return;

    const step = steps[stepIndex];

    if (step.type === "photo") {
      setStepIndex((i) => i + 1);
    }
  }, [stepIndex]);

  /*
   * ----------------------------------------
   * Report loading messages
   * ----------------------------------------
   */
  useEffect(() => {
    if (!reportGenerating) return;

    const interval = setInterval(() => {
      setReportLoadingIndex((current) => {
        if (current >= REPORT_LOADING_MESSAGES.length - 1) {
          return current;
        }

        return current + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [reportGenerating]);

  /*
   * ----------------------------------------
   * Step processing
   * ----------------------------------------
   */
  useEffect(() => {
    if (stepIndex >= steps.length) return;
    if (hasRunStep.current.has(stepIndex)) return;

    const step = steps[stepIndex];

    // Photo steps are handled by the skip effect above
    if (step.type === "photo") return;

    hasRunStep.current.add(stepIndex);

    setInputVisible(false);
    setError("");

    /*
     * REPORT GENERATION
     */
    if (step.type === "report") {
      generateFinalReport();
      return;
    }

    setIsTyping(true);

    const upcomingText = step.bot(answers);
    const textLength = upcomingText?.length || 20;

    const dynamicDelay = Math.min(
      2800,
      600 + textLength * 20
    );

    const t = setTimeout(() => {
      setIsTyping(false);

      setMessages((m) => [
        ...m,
        {
          id: step.id,
          sender: "bot",
          kind: "text",
          text: step.bot(answers),
        },
      ]);

      if (step.type === "bot") {
        setTimeout(() => {
          setStepIndex((i) => i + 1);
        }, 500);
      } else {
        setInputVisible(true);
      }
    }, dynamicDelay);

    return () => clearTimeout(t);
  }, [stepIndex]);

  /*
   * ----------------------------------------
   * Generate report
   * ----------------------------------------
   */
  async function generateFinalReport() {
    setIsTyping(true);
    setReportGenerating(true);
    setReportLoadingIndex(0);

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to generate report"
        );
      }

      /*
       * API now returns only:
       *
       * {
       *   reportId: "..."
       * }
       */
      const id = data.reportId;

      if (!id) {
        throw new Error("Report ID was not returned");
      }

      setReportId(id);

      /*
       * If ReportView needs the complete report,
       * fetch it separately using reportId.
       */
      let reportData = null;

      try {
        const reportResponse = await fetch(
          `/api/report/${id}`
        );

        if (reportResponse.ok) {
          reportData = await reportResponse.json();
        }
      } catch (err) {
        console.error(
          "Failed to fetch report details:",
          err
        );
      }

      setReport(reportData);

      setReportGenerating(false);
      setIsTyping(false);

      /*
       * Report success message
       */
      setMessages((m) => [
        ...m,
        {
          id: "report-success",
          sender: "bot",
          kind: "text",
          text: "Your personalized health report is ready.",
        },
      ]);

      /*
       * Show report card
       */
      setMessages((m) => [
        ...m,
        {
          id: "report-card",
          sender: "bot",
          kind: "report",
          report: reportData,
          reportId: id,
        },
      ]);

      /*
       * Email notification
       */
      setTimeout(() => {
        setEmailSent(true);
      }, 800);
    } catch (err) {
      console.error("Report generation error:", err);

      setReportGenerating(false);
      setIsTyping(false);

      setMessages((m) => [
        ...m,
        {
          id: "report-error",
          sender: "bot",
          kind: "text",
          text: "Sorry, we couldn't generate your report right now. Please try again.",
        },
      ]);
    }
  }

  /*
   * ----------------------------------------
   * Answer handler
   * ----------------------------------------
   */
  const handleAnswer = (value, display) => {
    const step = steps[stepIndex];

    setInputVisible(false);
    setError("");

    setMessages((m) => [
      ...m,
      {
        id: step.id + "-answer",
        sender: "user",
        kind: "text",
        text: display,
      },
    ]);

    /*
     * Normal questions
     */
    if (step.key) {
      setAnswers((a) => ({
        ...a,
        [step.key]: value,
      }));
    }

    /*
     * Contact question
     */
    else if (step.id === "contact") {
      const { name, email, mobile } = value;

      if (!name?.trim()) {
        setError("Please enter your name");
        setInputVisible(true);
        return;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        setError("Please enter a valid email address");
        setInputVisible(true);
        return;
      }

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        setError(
          "Please enter a valid 10-digit mobile number"
        );
        setInputVisible(true);
        return;
      }

      const updatedAnswers = {
        ...answers,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
      };

      setAnswers(updatedAnswers);
    }

    setStepIndex((i) => i + 1);
  };

  /*
   * ----------------------------------------
   * Close chat
   * ----------------------------------------
   */
  const closeChat = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }

    /*
     * Useful if this chat is inside an iframe/widget.
     */
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "CLOSE_CHAT",
        },
        "*"
      );

      return;
    }

    /*
     * Fallback
     */
    window.history.back();
  };

  /*
   * ----------------------------------------
   * CTA actions
   * ----------------------------------------
   */
  const handleCTA = (type) => {
    if (type === "continue") {
      closeChat();
      return;
    }

    if (type === "support") {
      window.location.href = "/gold-plan";
      return;
    }

    if (type === "download") {
      if (!reportId) return;

      window.location.href =
        `/api/report/${reportId}/download`;

      return;
    }
  };

  /*
   * ----------------------------------------
   * Report download URL
   * ----------------------------------------
   */
  const reportDownloadUrl = reportId
    ? `/api/report/${reportId}/download`
    : null;

  return (
    <div className="flex h-[90vh] w-full sm:min-w-2xl mx-auto border border-gray-300 shadow-sm flex-col overflow-hidden bg-[#FAFAFA] font-sans">

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <header className="sticky top-0 z-30 shrink-0 border-b border-gray-300 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] p-1">
              <img
                src="/3.png"
                alt="Kayapalat Logo"
                className="h-8 sm:h-10 w-auto"
              />
            </div>

            <div>
              <p className="text-xl sm:text-2xl font-bold font-sans dark:text-gray-900">
                Kayapalat
              </p>

              <p className="mt-0.5 text-[9px] sm:text-[11px] uppercase text-ink/50 dark:text-gray-600">
                Health Reality Check
              </p>
            </div>

          </div>

          <div className="relative flex h-10 w-10 items-center justify-center">

            <svg
              className="h-full w-full -rotate-90 transform"
              viewBox="0 0 36 36"
            >
              <path
                className="text-black/40"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />

              <path
                className="text-forest transition-all duration-700 ease-out"
                strokeDasharray={`${progressPct}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <span className="absolute text-[9px] font-bold dark:text-gray-900 text-forest">
              {progressPct}%
            </span>

          </div>

        </div>
      </header>


      {/* -------------------------------- */}
      {/* CHAT */}
      {/* -------------------------------- */}

      <div
        ref={scrollRef}
        className="flex-1 flex flex-col overflow-y-auto px-4 py-6"
      >

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 pb-4 mt-auto">

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-80">
              <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#FECFEF] blur-2xl" />
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id}>

              {m.kind === "report" ? (
                <div className="flex flex-col items-center py-4">

                  {m.report && (
                    <ReportView
                      answers={answers}
                      report={m.report}
                      onCTA={handleCTA}
                    />
                  )}

                  {/* -------------------------------- */}
                  {/* SUCCESS ACTIONS */}
                  {/* -------------------------------- */}

                  <div className="w-full mt-5 space-y-3">

                    {/* TOP TWO BUTTONS */}
                    <div className="grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          handleCTA("continue")
                        }
                        className="rounded-xl flex justify-center items-center gap-1 border border-gray-200 bg-white px-4 py-3 text-[13px] font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
                      >
                       Continue on my own  <ArrowRight size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCTA("support")
                        }
                        className="rounded-xl flex gap-1 items-center justify-center bg-gray-800 px-4 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-gray-900"
                      >
                        Need Kayapalat Support <HeadsetIcon size={16} />
                      </button>

                    </div>

                    {/* DOWNLOAD */}
                    <button
                      type="button"
                      onClick={() =>
                        handleCTA("download")
                      }
                      disabled={!reportId}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] cursor-pointer px-4 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Download the Report <DownloadIcon size={16} />
                    </button>

                  </div>

                </div>

              ) : m.sender === "bot" ? (
                <BotBubble>
                  {m.text}
                </BotBubble>
              ) : (
                <UserBubble>
                  {m.text}
                </UserBubble>
              )}

            </div>
          ))}


          {/* -------------------------------- */}
          {/* REPORT GENERATION LOADING */}
          {/* -------------------------------- */}

          {reportGenerating && (
            <div className="flex flex-col items-start gap-2">

              <div className="flex items-center gap-3 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">

                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />

                <span className="text-[13px] text-gray-600">
                  {
                    REPORT_LOADING_MESSAGES[
                      reportLoadingIndex
                    ]
                  }
                </span>

              </div>

              <div className="flex gap-1 pl-3">

                {REPORT_LOADING_MESSAGES.map(
                  (_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        index <= reportLoadingIndex
                          ? "bg-emerald-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )
                )}

              </div>

            </div>
          )}

          {/* Normal typing */}
          {isTyping && !reportGenerating && (
            <TypingBubble />
          )}


          {/* -------------------------------- */}
          {/* EMAIL MESSAGE */}
          {/* -------------------------------- */}

          {emailSent && (
            <div className="mx-auto mt-2 flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-xs text-forest">
              <span>✓</span>

              <span>
                A copy of your report has been emailed to{" "}
                {answers.email}
              </span>
            </div>
          )}

        </div>
      </div>


      {/* -------------------------------- */}
      {/* INPUT */}
      {/* -------------------------------- */}

      <div className="relative z-20 flex min-h-[85px] shrink-0 items-end bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">

        <div className="mx-auto w-full max-w-2xl transition-all duration-300">

          {stepIndex >= steps.length ||
          currentStep?.type === "report" ? (

            <div className="flex w-full items-center gap-3 rounded-full bg-gray-50 px-3 py-2 ring-1 ring-black/5 opacity-50">

              <input
                disabled
                placeholder={
                  reportGenerating
                    ? "Preparing your report..."
                    : "Assessment complete"
                }
                className="h-10 w-full cursor-not-allowed bg-transparent px-2 text-[15px] dark:text-gray-800 outline-none"
              />

            </div>

          ) : isAnswerable && !isTyping ? (

            <div className="opacity-100 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-2">

              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              )}

              <QuestionInput
                key={currentStep.id || stepIndex}
                step={currentStep}
                onAnswer={handleAnswer}
              />

            </div>

          ) : (

            <div className="flex w-full animate-pulse items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5 opacity-60 transition-all">

              <button
                disabled
                className="flex h-10 w-10 items-center justify-center text-ink/30"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="flex h-10 flex-1 items-center gap-2">

                <svg
                  className="animate-spin text-ink/30"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeDasharray="30 60"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  disabled
                  placeholder={
                    reportGenerating
                      ? REPORT_LOADING_MESSAGES[
                          reportLoadingIndex
                        ]
                      : "Kayapalat AI is thinking..."
                  }
                  className="w-full bg-transparent text-[15px] dark:text-gray-800 outline-none"
                />

              </div>

              <button
                disabled
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]/40 text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M12 19V5M5 12l7-7 7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}