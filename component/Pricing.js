import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { BUNDLES } from '@/lib/data';

export default function Pricing({ openCartWithBundle }) {
  return (
    <section id="bundles" className="bg-[#F8F9FA] py-16 px-4 md:px-8 font-manrope">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#003460] font-bold text-sm tracking-widest uppercase">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-2 mb-4 tracking-tight">
            Choose your commitment.
          </h2>
          <p className="text-[#151515] text-[16px] md:text-[18px] font-medium leading-relaxed">
            Invest in your discipline today. Ships free anywhere in India.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BUNDLES.map((bundle) => {
            const isHighlighted = bundle.popular;

            return (
              <div 
                key={bundle.id}
                onClick={() => openCartWithBundle(bundle)}
                className={`rounded-[24px] p-8 flex flex-col h-full cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${
                  isHighlighted 
                    ? 'bg-gradient-to-b from-[#f9cf01] to-white shadow-sm' 
                    : 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
                }`}
              >
                {/* Top Pill / Badge */}
                <div className="mb-5">
                  <span 
                    className={`inline-block px-5 py-2 rounded-full text-[15px] font-semibold tracking-wide ${
                      isHighlighted 
                        ? 'bg-white text-black shadow-sm' 
                        : 'bg-[#f9cf01] text-black'
                    }`}
                  >
                    {bundle.badge}
                  </span>
                </div>

                {/* Pricing Info */}
                <div className={`mb-6 min-h-[90px] ${isHighlighted ? 'text-[#1b1b1b]' : 'text-[#1c1d1d]'}`}>
                  <h3 className="text-2xl font-bold mb-1">{bundle.name}</h3>
                  <p className="text-sm opacity-80 mb-4">{bundle.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">₹{bundle.price}</span>
                    <span className="text-lg opacity-60 line-through">₹{bundle.originalPrice}</span>
                  </div>
                  {bundle.savings && (
                    <p className="text-green-700 font-bold text-sm mt-2">{bundle.savings}</p>
                  )}
                </div>

                {/* Divider Line */}
                <hr className={`border-t-2 mb-8 ${isHighlighted ? 'border-[#f9cf01]/60' : 'border-[#F3F4F6]'}`} />

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                  {bundle.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <svg 
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHighlighted ? 'text-black' : 'text-black'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[15px] text-gray-800 font-medium leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="flex flex-col gap-3 mt-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents double firing since the card itself is clickable
                      openCartWithBundle(bundle);
                    }}
                    className={`w-full py-3.5 rounded-[12px] font-semibold text-[16px] transition-all duration-200 flex justify-center items-center bg-[#080808] text-white hover:bg-black`}
                  >
                    Select {bundle.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}