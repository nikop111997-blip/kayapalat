"use client";

import { motion } from "framer-motion";

export default function ScoreCircle({ score, label, size = 220 }) {
  const strokeWidth = 10;

  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#059669"; // emerald-600
    if (score >= 60) return "#D97706"; // amber-600
    if (score >= 40) return "#EA580C"; // orange-600
    return "#DC2626"; // red-600
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F1F1F1"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute text-center">
        <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-semibold">
          Score
        </p>

        <h1 className="text-[42px] leading-none font-semibold mt-2 text-gray-900 tracking-tight">
          {score}
        </h1>

        <p className="text-[13px] mt-2 text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  );
}