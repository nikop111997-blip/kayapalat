"use client";

import React from "react";

// The requested gradient values for SVG usage
const GRADIENT = {
  from: "#e77074",
  via: "#e382c5",
  to: "#dc8bc3",
};

export function Gauge({ score }) {
  const radius = 90;
  const circumference = Math.PI * radius; // semicircle
  const pct = Math.max(2, Math.min(100, score)) / 100;
  const offset = circumference * (1 - pct);
  const gradId = "gauge-gradient";

  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 220 120" className="w-full drop-shadow-sm">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={GRADIENT.from} />
            <stop offset="50%" stopColor={GRADIENT.via} />
            <stop offset="100%" stopColor={GRADIENT.to} />
          </linearGradient>
        </defs>
        {/* Background Track */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="#f1f5f9" // slate-100
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Foreground Track */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
          {score}
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          out of 100
        </span>
      </div>
    </div>
  );
}

// NEW CHART: A mini circular progress ring for the Snapshot metrics
export function RingChart({ value, label, subLabel }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  // Assuming value is a percentage for the ring fill (0-100)
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const offset = circumference * (1 - pct);
  const gradId = `ring-grad-${label.replace(/\s+/g, "")}`;

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center">
      <div className="relative mb-2 h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90 transform">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={GRADIENT.from} />
              <stop offset="100%" stopColor={GRADIENT.to} />
            </linearGradient>
          </defs>
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-slate-700">{subLabel}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-slate-500">{label}</span>
    </div>
  );
}