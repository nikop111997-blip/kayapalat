"use client";

import React from "react";
import { Gauge, RingChart } from "./Gauge";

function Bar({ label, value }) {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
        <span className="text-slate-600 transition-colors group-hover:text-slate-900">
          {label}
        </span>
        <span className="text-slate-400">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#e77074] via-[#e382c5] to-[#dc8bc3] transition-all duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// Helper for check/cross icons
const CheckIcon = () => (
  <svg className="h-5 w-5 shrink-0 text-[#dc8bc3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const AlertIcon = () => (
  <svg className="h-5 w-5 shrink-0 text-[#e77074]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default function ReportView({ answers, report, onCTA }) {
  const firstName = answers.name ? answers.name.split(" ")[0] : "Your";

  return (
    <div className="mx-auto w-full max-w-[640px] animate-fade-in font-sans">
      
      {/* HEADER / SCORE CARD */}
      <div className="mb-6 overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60">
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            {firstName}'s Wellness Score
          </p>
          <Gauge score={report.score} />
          <p className="mt-4 text-xl font-semibold text-slate-800">
            {report.scoreLabel}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        
        {/* BREAKDOWN (BAR CHARTS) */}
        <section className="col-span-1 flex flex-col justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-800">
            Metric Breakdown
          </h3>
          <div className="space-y-4">
            {report.breakdown.map((b) => (
              <Bar key={b.label} label={b.label} value={b.value} />
            ))}
          </div>
        </section>

        {/* NEW VISUAL SNAPSHOT (RING CHARTS) */}
        <section className="col-span-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-800">
            Current Snapshot
          </h3>
          <p className="mb-5 text-xs text-slate-400">Your key physiological indicators.</p>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Example: Converting raw BMI into a percentage for the ring chart visualization (assuming 15-40 range for visuals) */}
            <RingChart 
              value={((report.bmi - 15) / 25) * 100} 
              label="BMI" 
              subLabel={report.bmi} 
            />
            <RingChart 
              value={report.whtr * 100} 
              label="Waist/Height" 
              subLabel={report.whtrRisk} 
            />
          </div>
          
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-center">
            <span className="text-xs font-medium text-slate-500">Body Shape: </span>
            <span className="text-sm font-semibold text-slate-700">{report.bodyShape}</span>
          </div>
        </section>

        {/* STRENGTHS & NEEDS ATTENTION */}
        <section className="col-span-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-800">
            Your Strengths
          </h4>
          <ul className="space-y-3 text-sm text-slate-600">
            {report.strengths.length ? (
              report.strengths.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="pt-0.5">{s}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">Building from the ground up — that's okay.</li>
            )}
          </ul>
        </section>

        <section className="col-span-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-800">
            Needs Attention
          </h4>
          <ul className="space-y-3 text-sm text-slate-600">
            {report.areasForAttention.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <AlertIcon />
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ACTION PLAN */}
        <section className="md:col-span-2 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-800">
            Personalised Action Plan
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            {report.actionPlan.map((step, i) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] font-bold text-white shadow-sm">
                  {i + 1}
                </span>
                <span className="pt-1 text-sm font-medium leading-relaxed text-slate-700">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* IF NOTHING CHANGES */}
        <section className="md:col-span-2 rounded-3xl bg-red-50/50 p-6 ring-1 ring-red-100">
          <div className="mb-3 flex items-center gap-2">
            <AlertIcon />
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#e77074]">
              If Nothing Changes...
            </h4>
          </div>
          <p className="mb-4 text-sm text-slate-600">
            Based on your current indicators, staying on this path may increase the likelihood of:
          </p>
          <div className="flex flex-wrap gap-2">
            {report.futureOutlook.map((f) => (
              <span key={f} className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/50">
                {f}
              </span>
            ))}
          </div>
        </section>

      </div>

      {/* MEMBERSHIP CTA */}
      <div className="mt-8 overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="relative p-8">
          {/* Subtle background glow effect using the gradient */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] opacity-20 blur-3xl" />
          
          <div className="relative z-10 text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              Recommended For You
            </p>
            <h4 className="mb-3 bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] bg-clip-text text-3xl font-extrabold text-transparent">
              {report.membership === "Elite" ? "Elite Membership" : "Gold Membership"}
            </h4>
            <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-slate-300">
              {report.membershipReason}
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => onCTA(report.membership === "Elite" ? "elite" : "gold")}
                className="rounded-xl bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
              >
                {report.membership === "Elite" ? "Apply for Elite" : "Join Gold Membership"}
              </button>
              <button
                onClick={() => onCTA("call")}
                className="rounded-xl bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Book Clarity Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-slate-400">
        This report is intended for educational wellness purposes only and is not a medical
        diagnosis or a substitute for professional healthcare advice.
      </p>
    </div>
  );
}