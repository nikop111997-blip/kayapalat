"use client";
import React, { useState } from 'react';

export default function HowItWorks() {
  const [openStep, setOpenStep] = useState('01');

  // Separated into baseText (always visible) and expandedText (slides down)
  const steps = [
    {
      id: '01',
      title: 'Share Your Story',
      baseText: "We begin by listening, not prescribing. You share where you are, what's holding you back, and what you truly want. This isn't about fitting you into a plan; it's about creating one that fits into your life.",
      expandedText: "We continue by evaluating your daily routines to ensure our approach is seamless. You share where you are, what's holding you back, and what you truly want. This isn't about fitting you into a plan; it's about creating one that fits into your life."
    },
    {
      id: '02',
      title: 'Get Your Personalized Roadmap',
      baseText: 'Receive a clear, step-by-step plan that fits your life, no crash diets, no exhausting workouts.',
      expandedText: 'We begin by listening, not prescribing. You share where you are, what’s holding you back, and what you truly want. This isn’t about fitting you into a plan; it’s about creating one that fits into your life.'
    },
    {
      id: '03',
      title: 'Daily Coaching & Accountability',
      baseText: 'Stay consistent with daily check-ins, reminders, and real-time support.',
      expandedText: 'We begin by listening, not prescribing. You share where you are, what’s holding you back, and what you truly want. This isn’t about fitting you into a plan; it’s about creating one that fits into your life.'
    },
    {
      id: '04',
      title: 'Feel the Change',
      baseText: 'Experience more energy in 7 days and visible progress in 3 weeks.',
      expandedText: 'We begin by listening, not prescribing. You share where you are, what’s holding you back, and what you truly want. This isn’t about fitting you into a plan; it’s about creating one that fits into your life.'
    },
    {
      id: '05',
      title: 'Celebrate & Sustain',
      baseText: 'Regain confidence, health, and joy that last, while inspiring others around you.',
      expandedText: 'We begin by listening, not prescribing. You share where you are, what’s holding you back, and what you truly want. This isn’t about fitting you into a plan; it’s about creating one that fits into your life.'
    }
  ];

  const toggleStep = (id) => {
    setOpenStep(openStep === id ? null : id);
  };

  return (
    <section className="bg-[#FAF9F6] py-20 px-6 md:px-12 font-manrope min-h-screen">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-block px-4 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-500 mb-6 shadow-sm">
            How Does It Work
          </div>
          
          <h2 className="text-3xl md:text-[48px] font-bold text-gray-900 leading-[115%] tracking-tight max-w-4xl">
            <span className="relative inline-block">
              Transform
              {/* Hand-drawn yellow underline SVG */}
              <svg 
                className="absolute w-[110%] h-3 -bottom-1 -left-1 text-[#F2C94C]" 
                viewBox="0 0 100 10" 
                preserveAspectRatio="none" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
              >
                <path d="M2,6 Q45,2 98,8" />
              </svg>
            </span>{' '}
            your health and feel in<br className='hidden sm:block'/>  control with a personalized plan just<br className='hidden sm:block'/> for you.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col">
          {steps.map((step) => {
            const isOpen = openStep === step.id;

            return (
              <div 
                key={step.id} 
                className="group border-b border-gray-200 py-8 cursor-pointer"
                onClick={() => toggleStep(step.id)}
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                  
                  {/* Step Number (Pinned to top) */}
                  <div className="text-md font-medium text-gray-500 md:w-16 pt-1">
                    {step.id}
                  </div>
                  
                  {/* Step Title (Pinned to top) */}
                  <div className="md:w-[35%]">
                    <h3 className="text-[28px] font-semibold text-gray-900 tracking-tight leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Content & Icon */}
                  <div className="flex-1 flex items-start gap-6 w-full justify-between mt-2 md:mt-0">
                    
                    {/* Text Container */}
                    <div className="flex flex-col w-full pr-4">
                      {/* Base Description (Always visible) */}
                      <div className="text-sm md:text-[18px] font-bold text-[#636363] leading-relaxed">
                        {step.baseText}
                      </div>

                      {/* Smooth Expanding Section (Drops down below) */}
                      <div 
                        className={`grid transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                          isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm md:text-[18px] font-bold text-gray-900 leading-relaxed">
                            {step.expandedText}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Icon (Pinned to top right) */}
                    <button 
                      className={`flex-shrink-0 pt-1 transition-all duration-300 ${
                        isOpen ? 'text-gray-900 rotate-90' : 'text-gray-400 hover:text-gray-600 rotate-0'
                      }`}
                      aria-label={isOpen ? "Collapse step" : "Expand step"}
                    >
                      {isOpen ? (
                        // X icon
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      ) : (
                        // Plus icon
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      )}
                    </button>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}