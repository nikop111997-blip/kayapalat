"use client";

import { useEffect, useRef, useState } from "react";

import { BotBubble, UserBubble, TypingBubble } from "./ChatBubble";
import QuestionInput from "./QuestionInput";
import ReportView from "./ReportView";

import { steps } from "@/lib/questions";

import {
  ArrowRight,
  DownloadIcon,
  HeadsetIcon,
  X,
  LockKeyhole,
} from "lucide-react";

const STORAGE_KEY = "kayapalat_health_reality_check_v1";

const ANSWERABLE_TYPES = new Set([
  "number",
  "choice",
  "multi",
  "slider",
  "photo",
  "contact",
]);

const REPORT_LOADING_MESSAGES = [
  "Analyzing your health information...",
  "Looking for important health patterns...",
  "Calculating your personalized health score...",
  "Preparing your personalized health insights...",
  "Your report is almost ready...",
];

const BRAND_GRADIENT =
  "bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3]";

export default function ChatAssessment({ onClose }) {
  const [hydrated, setHydrated] = useState(false);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  // Payment
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
const [reportLink, setReportLink] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [report, setReport] = useState(null);

  const [reportLoadingIndex, setReportLoadingIndex] = useState(0);
  const [reportGenerating, setReportGenerating] = useState(false);

  /*
   * ----------------------------------------------------
   * Refs
   * ----------------------------------------------------
   */

  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  const hasRunStep = useRef(new Set());

  /*
   * Prevent browser from restoring an old scroll position.
   */
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;

      window.history.scrollRestoration = "manual";

      return () => {
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  /*
   * ----------------------------------------------------
   * Progress
   * ----------------------------------------------------
   */

  const totalAnswerable = steps.filter((s) =>
    ANSWERABLE_TYPES.has(s.type)
  ).length;

  const answeredCount = steps
    .slice(0, stepIndex)
    .filter((s) => ANSWERABLE_TYPES.has(s.type)).length;

  const progressPct = Math.min(
    100,
    Math.round(
      (answeredCount / Math.max(totalAnswerable, 1)) * 100
    )
  );

  const currentStep = steps[stepIndex];

  const isAnswerable =
    currentStep && ANSWERABLE_TYPES.has(currentStep.type);

  /*
   * ----------------------------------------------------
   * Restore localStorage
   * ----------------------------------------------------
   */

  useEffect(() => {
    let mounted = true;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const saved = JSON.parse(raw);
const savedReportLink =
  window.localStorage.getItem(
    "kayapalat_report_link"
  );

if (savedReportLink) {
  setReportLink(savedReportLink);
}
        if (
          saved.answers &&
          typeof saved.answers === "object"
        ) {
          if (mounted) {
            setAnswers(saved.answers);
          }
        }

        if (Array.isArray(saved.messages)) {
          if (mounted) {
            setMessages(saved.messages);
          }

          /*
           * Mark only the actual question/message steps as
           * already displayed.
           *
           * Do NOT mark answer messages as steps.
           */
          saved.messages.forEach((message) => {
            const index = steps.findIndex(
              (step) => step.id === message.id
            );

            if (index >= 0) {
              hasRunStep.current.add(index);
            }
          });
        }

        if (typeof saved.stepIndex === "number") {
          const restoredIndex = Math.max(
            0,
            Math.min(saved.stepIndex, steps.length - 1)
          );

          if (mounted) {
            setStepIndex(restoredIndex);
          }
        }

        if (saved.report) {
          if (mounted) {
            setReport(saved.report);
          }
        }

        if (saved.reportId) {
          if (mounted) {
            setReportId(saved.reportId);
          }
        }

        if (saved.reportUnlocked === true) {
          if (mounted) {
            setReportUnlocked(true);
          }
        }

        if (saved.emailSent === true) {
          if (mounted) {
            setEmailSent(true);
          }
        }
      }
    } catch (err) {
      console.error(
        "Failed to restore assessment:",
        err
      );
    } finally {
      if (mounted) {
        setHydrated(true);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * ----------------------------------------------------
   * Persist state
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 1,
          stepIndex,
          answers,
          messages,
          emailSent,
          savedAt: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error(
        "Failed to save assessment:",
        err
      );
    }
  }, [
    hydrated,
    stepIndex,
    answers,
    messages,
    reportId,
    report,
    reportUnlocked,
    emailSent,
  ]);

 useEffect(() => {
  if (!reportUnlocked) return;

  const link = "/health-check/report";

  try {
    window.localStorage.setItem(
      "kayapalat_report_link",
      link
    );

    setReportLink(link);
  } catch (error) {
    console.error(
      "Failed to save report link:",
      error
    );
  }
}, [reportUnlocked]);

  useEffect(() => {
    if (!hydrated) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({
            behavior: "auto",
            block: "end",
          });
        } else if (scrollRef.current) {
          scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight;
        }
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [
    hydrated,
    messages,
    isTyping,
    inputVisible,
    reportGenerating,
    reportLoadingIndex,
    stepIndex,
  ]);

  /*
   * ----------------------------------------------------
   * Report loading text
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!reportGenerating) return;

    const interval = setInterval(() => {
      setReportLoadingIndex((current) =>
        Math.min(
          current + 1,
          REPORT_LOADING_MESSAGES.length - 1
        )
      );
    }, 1800);

    return () => clearInterval(interval);
  }, [reportGenerating]);

  /*
   * ----------------------------------------------------
   * Process questions
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!hydrated) return;

    if (stepIndex >= steps.length) return;

    if (hasRunStep.current.has(stepIndex)) {
      /*
       * If the restored step is an answerable question
       * and it hasn't received its input yet, show it.
       */
      const restoredStep = steps[stepIndex];

      if (
        restoredStep &&
        ANSWERABLE_TYPES.has(restoredStep.type) &&
        !report
      ) {
        setInputVisible(true);
      }

      return;
    }

    const step = steps[stepIndex];

    /*
     * If report already exists after reload,
     * don't generate it again.
     */

    if (step.type === "report" && report) {
      hasRunStep.current.add(stepIndex);

      setInputVisible(false);
      setIsTyping(false);
      setReportGenerating(false);

      return;
    }

    hasRunStep.current.add(stepIndex);

    setInputVisible(false);
    setError("");

    /*
     * Report step
     */

    if (step.type === "report") {
      generateFinalReport();
      return;
    }

    /*
     * Normal question
     */

    setIsTyping(true);

    const upcomingText = step.bot(answers);

    const textLength = upcomingText?.length || 20;

    const dynamicDelay = Math.min(
      2800,
      600 + textLength * 20
    );

    const timer = setTimeout(() => {
      setIsTyping(false);

      setMessages((current) => {
        if (
          current.some(
            (message) => message.id === step.id
          )
        ) {
          return current;
        }

        return [
          ...current,
          {
            id: step.id,
            sender: "bot",
            kind: "text",
            text: step.bot(answers),
          },
        ];
      });

      /*
       * Automatic bot-only step.
       */

      if (step.type === "bot") {
        const nextTimer = setTimeout(() => {
          setStepIndex((index) => index + 1);
        }, 500);

        /*
         * Store timer on window so cleanup isn't needed
         * for this small transition.
         */
        window.__kayapalatNextStepTimer = nextTimer;
      } else {
        /*
         * User must answer this step.
         */

        setInputVisible(true);
      }
    }, dynamicDelay);

    return () => {
      clearTimeout(timer);

      if (window.__kayapalatNextStepTimer) {
        clearTimeout(
          window.__kayapalatNextStepTimer
        );

        window.__kayapalatNextStepTimer = null;
      }
    };
  }, [hydrated, stepIndex]);

  /*
   * ----------------------------------------------------
   * Generate report
   * ----------------------------------------------------
   */

  async function generateFinalReport() {
    /*
     * Never generate again if report already exists.
     */

    if (report) {
      setIsTyping(false);
      setReportGenerating(false);
      return;
    }

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
          data?.error ||
            "Failed to generate report"
        );
      }

      const id = data.reportId;

      if (!id) {
        throw new Error(
          "Report ID was not returned"
        );
      }

      setReportId(id);

      let reportResponseData  = null;

      try {
        const reportResponse = await fetch(
          `/api/report/${id}`
        );

        if (reportResponse.ok) {
          reportResponseData =
            await reportResponse.json();
        }
      } catch (err) {
        console.error(
          "Failed to fetch report details:",
          err
        );
      }

      if (!reportResponseData ) {
        throw new Error(
          "Report details could not be loaded"
        );
      }
const reportData = reportResponseData.report;
      setReport(reportData);

      setReportGenerating(false);
      setIsTyping(false);

      setReportUnlocked(false);

      /*
       * Add both messages in ONE state update.
       * This avoids React state batching issues.
       */

      setMessages((current) => {
        const next = [...current];

        if (
          !next.some(
            (message) =>
              message.id === "report-success"
          )
        ) {
          next.push({
            id: "report-success",
            sender: "bot",
            kind: "text",
            text:
              "Your personalized health report is ready.",
          });
        }

        if (
          !next.some(
            (message) =>
              message.id === "report-card"
          )
        ) {
          next.push({
            id: "report-card",
            sender: "bot",
            kind: "report",
            report: reportData,
            reportId: id,
          });
        }

        return next;
      });

      setTimeout(() => {
        setEmailSent(true);
      }, 800);
    } catch (err) {
      console.error(
        "Report generation error:",
        err
      );

      setReportGenerating(false);
      setIsTyping(false);

      setMessages((current) => {
        if (
          current.some(
            (message) =>
              message.id === "report-error"
          )
        ) {
          return current;
        }

        return [
          ...current,
          {
            id: "report-error",
            sender: "bot",
            kind: "text",
            text:
              "Sorry, we couldn't generate your report right now. Please try again.",
          },
        ];
      });
    }
  }

  /*
   * ----------------------------------------------------
   * Answer handler
   * ----------------------------------------------------
   */

  const handleAnswer = (value, display) => {
    const step = steps[stepIndex];

    if (!step) return;

    /*
     * Prevent accidental double submission.
     */

    if (!isAnswerable) return;

    setInputVisible(false);
    setError("");

    /*
     * Add user message.
     */

    setMessages((current) => [
      ...current,
      {
        id: `${step.id}-answer`,
        sender: "user",
        kind: "text",
        text: display,
      },
    ]);

    /*
     * Contact validation
     */

    if (step.id === "contact") {
      const {
        name,
        email,
        mobile,
      } = value || {};

      if (!name?.trim()) {
        setError("Please enter your name");
        setInputVisible(true);
        return;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email || ""
        )
      ) {
        setError(
          "Please enter a valid email address"
        );

        setInputVisible(true);
        return;
      }

      if (
        !/^[6-9]\d{9}$/.test(
          mobile || ""
        )
      ) {
        setError(
          "Please enter a valid 10-digit mobile number"
        );

        setInputVisible(true);
        return;
      }

      const updatedAnswers = {
        ...answers,
        name: name.trim(),
        email: email
          .trim()
          .toLowerCase(),
        mobile: mobile.trim(),
      };

      setAnswers(updatedAnswers);
    } else if (step.key) {
      setAnswers((current) => ({
        ...current,
        [step.key]: value,
      }));
    }

    /*
     * IMPORTANT:
     *
     * Increment exactly once.
     *
     * The previous question is never rendered again.
     */

    setStepIndex((index) => index + 1);
  };

  /*
   * ----------------------------------------------------
   * Payment
   * ----------------------------------------------------
   */

  const handleUnlock = () => {
    setShowPayment(true);
  };

  const handlePayment = () => {
    

    setShowPayment(false);

    
  };

  const unlockReport = () => {
    setReportUnlocked(true);
    setShowPayment(false);
  };

  /*
   * ----------------------------------------------------
   * Close
   * ----------------------------------------------------
   */

  const closeChat = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }

    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "CLOSE_CHAT",
        },
        "*"
      );

      return;
    }

    window.history.back();
  };

  /*
   * ----------------------------------------------------
   * CTA
   * ----------------------------------------------------
   */

  const handleCTA = (type) => {
    if (type === "continue") {
      window.location.href = "/";
      return;
    }

    if (type === "support") {
      window.location.href = "/gold-plan";
      return;
    }

    if (type === "download") {
      if (!reportId || !reportUnlocked) {
        return;
      }

      window.location.href =
        `/api/report/${reportId}/download`;
    }
  };

  /*
   * ----------------------------------------------------
   * Reset
   * ----------------------------------------------------
   */

  const resetAssessment = () => {
    try {
      window.localStorage.removeItem(
        STORAGE_KEY
      );
    } catch (err) {
      console.error(
        "Failed to clear assessment:",
        err
      );
    }

    hasRunStep.current = new Set();

    setStepIndex(0);
    setAnswers({});
    setMessages([]);

    setError("");
    setInputVisible(false);

    setEmailSent(false);

    setReportUnlocked(false);
    setShowPayment(false);

    setReportId(null);
    setReport(null);

    setReportGenerating(false);
    setReportLoadingIndex(0);

    setIsTyping(false);
  };

  /*
   * ----------------------------------------------------
   * Loading
   * ----------------------------------------------------
   */

  if (!hydrated) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-[#FAFAFA]">
        <div className="text-sm text-gray-500">
          Restoring your assessment...
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------------------
   * UI
   * ----------------------------------------------------
   */

  return (
    <>
      <div className="mx-auto flex h-[100dvh] w-full flex-col overflow-hidden border border-gray-300 bg-[#FAFAFA] font-sans shadow-sm sm:h-[90vh] sm:min-w-2xl">

        {/* HEADER */}

        <header className="sticky top-0 z-30 shrink-0 border-b border-gray-300 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between">

            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full p-1 sm:h-12 sm:w-12 ${BRAND_GRADIENT}`}
              >
                <img
                  src="/3.png"
                  alt="Kayapalat Logo"
                  className="h-8 w-auto sm:h-10"
                />
              </div>

              <div>
                <p className="text-xl font-bold font-sans dark:text-gray-900 sm:text-2xl">
                  Kayapalat
                </p>

                <p className="mt-0.5 text-[9px] uppercase text-ink/50 dark:text-gray-600 sm:text-[11px]">
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
                  className="text-black/10"
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

              <span className="absolute text-[9px] font-bold text-forest dark:text-gray-900">
                {progressPct}%
              </span>
            </div>
          </div>
        </header>

        {/* CHAT */}

        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-6"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* IMPORTANT:
              NO mt-auto HERE.
          */}

          <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 pb-4">

            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-80">
                <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#FECFEF] blur-2xl" />
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                {message.kind === "report" ? (
                  <div className="flex flex-col items-center py-4">

                    {message.report &&
                      (reportUnlocked ? (
                        <ReportView
                          answers={answers}
                          report={message.report}
                          onCTA={handleCTA}
                        />
                      ) : (
                        <BasicReport
                          answers={answers}
                          report={message.report}
                          onUnlock={handleUnlock}
                        />
                      ))}

                    {/* Final actions */}

                    {reportUnlocked && (
  <div className="mt-5 w-full space-y-3">

    {/* FULL REPORT LINK */}
    {reportLink && (
      <a
        href={reportLink}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] px-4 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:shadow-md"
      >
        View Full Report
        <ArrowRight size={16} />
      </a>
    )}

    <div className="grid grid-cols-2 gap-3">

      <button
        type="button"
        onClick={() =>
          handleCTA("continue")
        }
        className="flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
      >
        Continue on my own

        <ArrowRight size={16} />
      </button>

      <button
        type="button"
        onClick={() =>
          handleCTA("support")
        }
        className="flex items-center justify-center gap-1 rounded-xl bg-gray-800 px-4 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-gray-900"
      >
        Need Kayapalat Support

        <HeadsetIcon size={16} />
      </button>

    </div>

    <button
      type="button"
      onClick={() =>
        handleCTA("download")
      }
      disabled={!reportId}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] px-4 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
    >
      Download the Report

      <DownloadIcon size={16} />
    </button>

  </div>
)}
                  </div>
                ) : message.sender === "bot" ? (
                  <BotBubble>
                    {message.text}
                  </BotBubble>
                ) : (
                  <UserBubble>
                    {message.text}
                  </UserBubble>
                )}
              </div>
            ))}

            {/* Report loading */}

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
                          index <=
                          reportLoadingIndex
                            ? "bg-emerald-600"
                            : "bg-gray-200"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {isTyping &&
              !reportGenerating && (
                <TypingBubble />
              )}

            {emailSent && report && (
              <div className="mx-auto mt-2 flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-xs text-forest">
                <span>✓</span>

                <span>
                  A copy of your report has been
                  emailed to{" "}
                  {answers.email}
                </span>
              </div>
            )}

            {/* 
              THIS IS THE IMPORTANT PART.
              Always keep a scroll target at the
              absolute bottom of the conversation.
            */}

            <div
              ref={bottomRef}
              className="h-px w-full shrink-0"
              aria-hidden="true"
            />

          </div>
        </div>

        {/* INPUT */}

        <div className="relative z-20 flex min-h-[85px] max-h-[50dvh] shrink-0 flex-col justify-end overflow-y-auto bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">

          <div className="mx-auto w-full max-w-2xl transition-all duration-300">

            {stepIndex >= steps.length ||
            currentStep?.type === "report" ? (
              <div className="flex w-full items-center gap-3 rounded-full bg-gray-50 px-3 py-2 opacity-50 ring-1 ring-black/5">

                <input
                  disabled
                  placeholder={
                    reportGenerating
                      ? "Preparing your report..."
                      : reportUnlocked
                        ? "Report unlocked"
                        : "Assessment complete"
                  }
                  className="h-10 w-full cursor-not-allowed bg-transparent px-2 text-[16px] outline-none dark:text-gray-800"
                />

              </div>
            ) : isAnswerable &&
              !isTyping &&
              inputVisible ? (

              <div className="animate-in fade-in slide-in-from-bottom-2 opacity-100 transition-all duration-500 ease-out">

                {error && (
                  <p className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                )}

                <QuestionInput
                  key={
                    currentStep.id ||
                    stepIndex
                  }
                  step={currentStep}
                  onAnswer={handleAnswer}
                />

              </div>

            ) : (

              <div className="flex w-full animate-pulse items-center gap-3 rounded-xl bg-white px-3 py-2 opacity-60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5">

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
                    className="w-full bg-transparent text-[16px] outline-none dark:text-gray-800"
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

      {/* PAYMENT */}

      {showPayment && (
        <PaymentModal
          amount={10}
          onClose={() =>
            setShowPayment(false)
          }
          onPay={handlePayment}
        />
      )}
    </>
  );
}

/*
 * ============================================================
 * BASIC REPORT
 * ============================================================
 */

function BasicReport({
  report,
  answers,
  onUnlock,
}) {
  if (!report) return null;

  const fallbackTargetZone =
    buildTargetZone(answers);

  const targetZone =
    report.targetZone ??
    fallbackTargetZone;

  const targetWeight =
    targetZone?.weight;

  const targetWaist =
    targetZone?.waist;

  const targetWaistValue =
    targetWaist?.targetMax ??
    targetWaist?.max ??
    null;

  return (
    <div className="w-full space-y-5">

      {/* SCORE */}

      <section className="rounded-3xl bg-white p-6 text-center shadow-lg ring-1 ring-black/5">

        <p className="text-sm font-medium text-slate-500">
          Your Wellness Score
        </p>

        <div className="mt-3 bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] bg-clip-text text-6xl font-extrabold text-transparent">
          {report.score ?? "—"}
        </div>

        <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
          out of 100
        </p>

        <div className="mt-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {report.scoreLabel ??
            report.label ??
            "Wellness Snapshot"}
        </div>

      </section>

      {/* BASIC MEASUREMENTS */}

      <section className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-black/5">

        <h3 className="text-lg font-bold text-slate-800">
          Your Current Snapshot
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          A quick overview from the information
          you provided.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">

          <Metric
            label="Weight"
            value={answers?.weight}
            unit="kg"
          />

          <Metric
            label="Height"
            value={answers?.height}
            unit="cm"
          />

          <Metric
            label="BMI"
            value={report.bmi}
          />

          <Metric
            label="Waist"
            value={answers?.waist}
            unit="cm"
          />

          <Metric
            label="Waist / Height"
            value={report.whtr}
          />

          <Metric
            label="Body Shape"
            value={report.bodyShape}
          />

        </div>
      </section>

      {/* TARGET ZONE */}

      {targetZone && (
        <section className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-black/5">

          <div className="flex items-center gap-3">

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${BRAND_GRADIENT}`}
            >
              🎯
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Your Target Zone
              </h3>

              <p className="text-xs text-slate-500">
                Reference ranges based on your
                measurements
              </p>
            </div>

          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">

            <TargetMetric
              label="Target Weight"
              value={
                targetWeight
                  ? `${targetWeight.min}–${targetWeight.max} kg`
                  : "—"
              }
            />

            <TargetMetric
              label="Target Waist"
              value={
                targetWaistValue
                  ? `≤ ${targetWaistValue} cm`
                  : "—"
              }
            />

            <TargetMetric
              label="BMI Reference"
              value="18.5–24.9"
            />

            <TargetMetric
              label="WHtR Reference"
              value="< 0.53"
            />

          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
            These are educational reference ranges,
            not a diagnosis or a guaranteed personal
            target.
          </p>

        </section>
      )}

      {/* LOCKED REPORT */}

      <section className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5">

        <div className="pointer-events-none select-none blur-[5px]">

          <h3 className="text-lg font-bold text-slate-800">
            Your Personalised Analysis
          </h3>

          <div className="mt-4 space-y-3">
            <div className="h-4 rounded-full bg-slate-200" />
            <div className="h-4 rounded-full bg-slate-200" />
            <div className="h-4 w-4/5 rounded-full bg-slate-200" />
            <div className="h-20 rounded-2xl bg-slate-100" />
          </div>

        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-white/65 backdrop-blur-[2px]">

          <div className="w-full max-w-sm px-5 text-center">

            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white ${BRAND_GRADIENT}`}
            >
              <LockKeyhole size={21} />
            </div>

            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Unlock Your Full Report
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Get detailed health patterns, score
              drivers, risk areas, priorities,
              target zones, future outlook and
              your personalised action plan.
            </p>

            <button
              type="button"
              onClick={onUnlock}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e77074] via-[#e382c5] to-[#dc8bc3] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:shadow-xl active:scale-[0.98]"
            >
              Unlock Full Report — ₹299
            </button>

            <p className="mt-3 text-[11px] text-slate-400">
              One-time payment
            </p>

          </div>

        </div>

      </section>
    </div>
  );
}

/*
 * ============================================================
 * PAYMENT MODAL
 * ============================================================
 */

function PaymentModal({
  amount,
  onClose,
  onPay,
}) {
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);
      setPaymentError("");

      /*
       * Get mobile from the same localStorage
       * used by the health assessment.
       */
      const raw = window.localStorage.getItem(
        "kayapalat_health_reality_check_v1"
      );

      if (!raw) {
        throw new Error(
          "Your assessment information could not be found. Please complete the assessment again."
        );
      }

      const saved = JSON.parse(raw);

      const mobile = String(
        saved?.answers?.mobile || ""
      ).replace(/\D/g, "");

      if (!mobile) {
        throw new Error(
          "Mobile number is required to continue with payment."
        );
      }

      /*
       * Optional user information from assessment.
       */
      const name =
        saved?.answers?.name ||
        saved?.answers?.fullName ||
        "Health Report User";

      const email =
        saved?.answers?.email || "";

      /*
       * Create Instamojo payment request.
       */
      const response = await fetch(
        "/api/instamojo/report-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile,
            amount,
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Unable to create payment request."
        );
      }

      /*
       * Instamojo payment page URL.
       */
      if (!data?.paymentUrl) {
        throw new Error(
          "Payment URL was not received from Instamojo."
        );
      }

      /*
       * Optional callback.
       */
      if (typeof onPay === "function") {
        onPay(data);
      }

      /*
       * Redirect user to Instamojo.
       */
      window.location.href =
        data.paymentUrl;

    } catch (error) {
      console.error(
        "Health Report Payment Error:",
        error
      );

      setPaymentError(
        error?.message ||
          "Something went wrong while starting payment."
      );

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">

      <div className="w-full max-w-md overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Unlock Full Report
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              One-time payment
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close payment"
          >
            <X size={18} />
          </button>

        </div>

        {/* CONTENT */}
        <div className="space-y-5 p-5">

          {/* PRICE */}
          <div className="rounded-2xl bg-slate-50 p-5 text-center ring-1 ring-slate-100">

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Full personalised report
            </p>

            <p className="mt-2 text-4xl font-extrabold text-slate-900">
              ₹{amount}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Detailed analysis, priorities, score
              drivers, future outlook and
              personalised action plan.
            </p>

          </div>

          {/* FEATURES */}
          <div className="space-y-2 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <span className="text-emerald-600">
                ✓
              </span>

              Wellness score & detailed breakdown
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-600">
                ✓
              </span>

              Health priorities and improvement
              simulator
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-600">
                ✓
              </span>

              Future outlook and personalised
              action plan
            </div>

          </div>

          {/* ERROR */}
          {paymentError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
              {paymentError}
            </div>
          )}

          {/* PAYMENT BUTTON */}
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e77074] via-[#e382c5] to-[#dc8bc3] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                Creating Payment...
              </span>
            ) : (
              `Continue to Payment — ₹${amount}`
            )}
          </button>

          {/* FOOTER */}
          <p className="text-center text-[11px] leading-relaxed text-gray-400">
            Secure payment powered by Instamojo.
          </p>

        </div>
      </div>
    </div>
  );
}

/*
 * ============================================================
 * METRIC
 * ============================================================
 */

function Metric({
  label,
  value,
  unit,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-lg font-bold text-slate-800">

        {value ?? "—"}

        {unit && (
          <span className="ml-1 text-xs font-medium text-slate-400">
            {unit}
          </span>
        )}

      </p>
    </div>
  );
}

/*
 * ============================================================
 * TARGET METRIC
 * ============================================================
 */

function TargetMetric({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-4 ring-1 ring-slate-100">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-base font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
}

/*
 * ============================================================
 * FALLBACK TARGET ZONE
 * ============================================================
 *
 * Kept here because BasicReport calls buildTargetZone().
 *
 * If your API already returns targetZone, the API value
 * takes priority.
 */

function buildTargetZone(answers = {}) {
  const weight = Number(answers?.weight);
  const height = Number(answers?.height);
  const waist = Number(answers?.waist);

  if (!weight || !height) {
    return null;
  }

  /*
   * Height in metres.
   */

  const heightM = height / 100;

  if (!heightM || heightM <= 0) {
    return null;
  }

  /*
   * Educational BMI reference range.
   */

  const minWeight = Number(
    (18.5 * heightM * heightM).toFixed(1)
  );

  const maxWeight = Number(
    (24.9 * heightM * heightM).toFixed(1)
  );

  /*
   * Waist reference based on WHtR < 0.53.
   */

  const maxWaist = Number(
    (height * 0.53).toFixed(1)
  );

  return {
    weight: {
      min: minWeight,
      max: maxWeight,
    },

    waist: {
      max: maxWaist,
      targetMax: maxWaist,
    },

    current: {
      weight,
      waist: waist || null,
    },
  };
}