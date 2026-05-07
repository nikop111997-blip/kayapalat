import React from 'react';

export default function StrugglesSection() {
  const struggles = [
    "You don't have time to think about your health, let alone act on it.",
    "You start a routine but can't stick to it because life gets in the way.",
    "You feel tired, unmotivated, and guilty for not doing more.",
    "You've tried diets or plans that don't fit your real-life struggles."
  ];

  return (
    <section className="w-full bg-[#F8F7F4] px-4 py-12 font-manrope sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1000px]">
        
        {/* Heading Section */}
        <div className="mb-14 text-center">
          <h2 className="mx-auto mb-6 max-w-3xl text-[32px] font-bold leading-[1.1] tracking-tight text-black md:text-[48px] lg:text-[48px]">
            Being healthy sounds easy. But It's <br className="hidden sm:block" />
            hard when{' '}
            <span className="relative inline-block">
              life won't slow down.
              {/* Hand-drawn yellow underline SVG */}
              <svg 
                className="absolute -bottom-3.5 left-0 w-full text-[#FFCE00]" 
                viewBox="0 0 300 15" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M2 10C50 4 150 2 298 8" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
              </svg>
            </span>
          </h2>
          
          <p className="text-[20px]  font-medium text-gray-500">
            If you've felt any of this, you're not alone:
          </p>
        </div>

        {/* 2x2 Grid Section */}
        <div className="mx-auto max-w-[850px]">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {struggles.map((text, index) => (
              <div key={index} className="flex items-start gap-4">
                
                {/* Custom 8-point asterisk icon matching the design */}
                <div className="mt-3.5 flex-shrink-0 text-[#FFCE00]">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 4v16M4 12h16M6.34 6.34l11.32 11.32M6.34 17.66L17.66 6.34" />
                  </svg>
                </div>

                {/* List Item Text */}
                <p className="text-[20px] leading-relaxed text-gray-600">
                  {text}
                </p>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}