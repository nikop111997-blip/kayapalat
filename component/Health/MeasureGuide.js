"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Ruler } from "lucide-react";

const steps = [
  "Remove your shoes",
  "Stand with your back against a wall",
  "Keep your head facing straight",
  "Measure from the floor to the top of your head",
];
const waistSteps = [
  "Stand up straight",
  "Relax your stomach muscles",
  "Keep your head facing straight",
  "Measure around your natural waistline",
];

export default function MeasureGuide({forType="height"}) {
  return (
    <>
    {forType === "height" && 
    <div className="space-y-8">

      {/* Illustration */}
<div className="flex ">
  
     <HeightMeasureIcon size={400} color="#1a1a1a" />

      {/* Instructions */}

      <div className="">

        {steps.map((step,index)=>(

          <motion.div
            key={step}
            
            className="flex items-center gap-3 border-b border-gray-300 bg-white p-4"
          >

            <CheckCircle2
              className="text-[#d55559]" size={14}
            />

            <span className="text-sm font-medium dark:text-gray-800">
              {step}
            </span>

          </motion.div>

        ))}

      </div>
</div>
      <button
        className="h-14 w-full rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] text-white font-semibold transition hover:bg-gradient-to-br hover:from-[#e77074] hover:via-[#e382c5] hover:to-[#dc8bc3]"
      >
        Got it
      </button>

    </div>}
    {forType === "waist" && 
    <div className="space-y-8">

      {/* Illustration */}
<div className="flex ">
  
     <WaistMeasureIcon size={400} color="#1a1a1a" />

      {/* Instructions */}

      <div className="">

        {waistSteps.map((step,index)=>(

          <motion.div
            key={step}
            
            className="flex items-center gap-3 border-b border-gray-300 bg-white p-4 "
          >

            <CheckCircle2
              className="text-[#d55559]" size={14}
            />

            <span className="text-sm font-medium dark:text-gray-800">
              {step}
            </span>

          </motion.div>

        ))}

      </div>
</div>
      <button
        className="h-14 w-full rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] text-white font-semibold transition hover:bg-gradient-to-br hover:from-[#e77074] hover:via-[#e382c5] hover:to-[#dc8bc3]"
      >
        Got it
      </button>

    </div>}
    </>
  );
}

import React from "react";

const HeightMeasureIcon = ({ size = 240 }) => {
  return (
    <div
      style={{
        width: size,
        height: (size * 320) / 680,
      }}
      className="flex items-center justify-center"
    >
      <video
        src="/height.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-contain"
      />
    </div>
  );
};

const WaistMeasureIcon = ({ size = 240 }) => {
  return (
    <div
      style={{
        width: size,
        height: (size * 320) / 680,
      }}
      className="flex items-center justify-center"
    >
      <video
        src="/waist.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-contain"
      />
    </div>
  );
};
;