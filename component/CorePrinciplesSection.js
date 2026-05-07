import React from 'react';

export default function CorePrinciplesSection() {
  return (
    <section className="bg-[#FAF8F5] py-12 px-6 md:px-12 font-manrope w-full">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        
        {/* Vision Column */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-block px-5 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] mb-6">
            Our Vision
          </span>
          <h3 className="text-[28px] md:text-[32px] font-medium text-black leading-tight tracking-tight">
            Transforming Lives
          </h3>
        </div>

        {/* Mission Column */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-block px-5 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] mb-6">
            Our Mission
          </span>
          <h3 className="text-[28px] md:text-[32px] font-medium text-black leading-tight tracking-tight max-w-[320px]">
            Lifetime health, fitness and happiness
          </h3>
        </div>

        {/* Belief Column */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-block px-5 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] mb-6">
            Our Belief
          </span>
          <div className="text-[24px] md:text-[28px] font-medium text-black leading-[1.4] tracking-tight flex flex-col items-center">
            <span>Work Together as a Team</span>
            <span>Honour Each Other</span>
            <span>Celebrate Like a Community</span>
          </div>
        </div>

      </div>
    </section>
  );
}