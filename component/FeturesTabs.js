'use client'
import React, { useState } from 'react';
import { ChevronDown
} from 'lucide-react';
export default function FeaturesTabs() {
  const [active, setActive] = useState(0);
  const tabs = [
    { title: 'Daily Coaching', desc: 'Consistency beats intensity. Our coaches guide and support you every day, keeping you focused and on track.' },
    { title: '12 Live FIT Hours', desc: 'Structured short-duration live sessions designed for real people with real schedules. No complicated routines.' },
    { title: 'Structured WODs', desc: 'Easy-to-follow workouts (Walk/Run, Stairs, Skipping) that fit seamlessly into your day without gym dependency.' },
    { title: 'Nutrition Guidance', desc: 'No starvation. No extreme diets. Learn to nourish your body while enjoying food and living life fully.' },
  ];
  return (
    <div className="border-l-[3px] border-[#dce8f5] pl-6 relative">
      <div
        className="absolute left-[-3px] w-[3px] bg-[#003460] rounded-full transition-all duration-300"
        style={{ top: `${active * 25}%`, height: '25%' }}
      />
      {tabs.map((tab, i) => (
        <div key={i} className={`py-5 ${i < tabs.length - 1 ? 'border-b border-[#dce8f5]' : ''}`}>
          <button
            onClick={() => setActive(i)}
            className={`w-full text-left flex items-center justify-between font-semibold text-xl lg:text-2xl tracking-tight transition-colors
              ${active === i ? 'text-[#003460]' : 'text-[#b0c4d8] hover:text-[#0d0d0d]'}`}
          >
            {tab.title}
            <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300
              ${active === i ? 'rotate-180 text-[#e6b800]' : 'text-[#ccd8e5]'}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-500
            ${active === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-[#0d0d0d] leading-relaxed font-medium max-w-sm">{tab.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 