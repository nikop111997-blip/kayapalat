import React from 'react';

export default function PillarsSection() {
  return (
    <section className="w-full bg-[#F8F7F4] px-4 py-16 sm:py-32 font-manrope sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        
        {/* Header Section */}
        <div className="mb-8 sm:mb-20 text-center">
          <h2 className="mb-2 text-[32px] font-bold tracking-tight text-black md:text-[40px] lg:text-[48px]">
            Why Kayapalat Works (When other things fail)
          </h2>
          <p className="font-semibold text-[24px] text-gray-900 md:text-[28px]">
            The 3 pillars of lasting transformation
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[400px] flex-col items-center justify-center lg:max-w-[1000px]">
          
          {/* =========================================
              DESKTOP VIEW: VENN DIAGRAM (Hidden on Mobile)
              ========================================= */}
          <div className="relative hidden h-[540px] w-[540px] flex-shrink-0 lg:block">
            
            {/* Background Circles */}
            <div className="absolute left-0 top-0 h-[65%] w-[65%] rounded-full bg-[#FFD1B3] mix-blend-multiply" />
            <div className="absolute right-0 top-0 h-[65%] w-[65%] rounded-full bg-[#FFB5E8] mix-blend-multiply" />
            <div className="absolute bottom-0 left-[17.5%] h-[65%] w-[65%] rounded-full bg-[#A3D1FF] mix-blend-multiply" />

            {/* Top Left: Physical */}
            <div className="absolute left-[12%] top-[24%] z-10 flex origin-center -rotate-[55deg] items-center gap-1.5">
              <span className="text-[22px] drop-shadow-sm">🥗</span>
              <div className="text-center">
                <div className="text-[18px] font-bold leading-none text-black">Physical</div>
                <div className="mt-0.5 text-[16px] font-medium leading-tight text-gray-950">(Body)</div>
              </div>
            </div>

            {/* Top Right: Physiological */}
            <div className="absolute right-[8%] top-[24%] z-10 flex origin-center rotate-[55deg] items-center gap-1.5">
              <div className="text-center">
                <div className="text-[18px] font-bold leading-none text-black">Physiological</div>
                <div className="mb-0.5 text-[16px] font-medium leading-tight text-gray-950">(Internal Systems)</div>
              </div>
              <span className="text-[22px] drop-shadow-sm">🤸‍♀️</span>
            </div>

            {/* Bottom Center: Psychological */}
            <div className="absolute bottom-[16%] left-[50%] z-10 flex -translate-x-1/2 flex-col items-center gap-1">
              <span className="text-[22px] drop-shadow-sm">❤️</span>
              <div className="text-center">
                <div className="text-[18px] font-bold leading-none text-black">Psychological</div>
                <div className="mt-0.5 text-[16px] font-medium leading-tight text-gray-950">(Mind & Emotions)</div>
              </div>
            </div>

            {/* Center Intersection Text */}
            <div className="absolute left-[50%] top-[45%] z-20 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-[16px] font-bold leading-[1.2] text-black">
                The<br />Kayapalat<br />Way
              </div>
            </div>
          </div>

          {/* =========================================
              MOBILE VIEW: DONUT CHART (Hidden on Desktop)
              ========================================= */}
          <div 
            className="relative block h-[340px] w-[340px] flex-shrink-0 overflow-hidden rounded-full lg:hidden"
            style={{ background: 'conic-gradient(from 0deg, #A3D1FF 0deg 120deg, #FFB5E8 120deg 240deg, #FFD1B3 240deg 360deg)' }}
          >
            {/* White Separator Lines */}
            <div className="absolute left-[50%] top-0 h-[50%] w-[4px] origin-bottom -translate-x-1/2 rotate-[0deg] bg-[#F8F7F4]" />
            <div className="absolute left-[50%] top-0 h-[50%] w-[4px] origin-bottom -translate-x-1/2 rotate-[120deg] bg-[#F8F7F4]" />
            <div className="absolute left-[50%] top-0 h-[50%] w-[4px] origin-bottom -translate-x-1/2 rotate-[240deg] bg-[#F8F7F4]" />

            {/* Top Right: Physiological */}
            <div className="absolute right-[8%] top-[28%] rotate-[60deg] text-center">
              <div className="text-[17px] font-bold leading-none text-black">Physiological</div>
              <div className="mt-1 text-[13px] font-medium leading-tight text-gray-800">(Internal Sys...</div>
            </div>

            {/* Bottom Center: Psychological */}
            <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 text-center">
              <div className="text-[17px] font-bold leading-none text-black">Psychological</div>
              <div className="mt-1 text-[13px] font-medium leading-tight text-gray-800">(Mind & Em...</div>
            </div>

            {/* Top Left: Physical */}
            <div className="absolute left-[8%] top-[28%] -rotate-[60deg] text-center">
              <div className="text-[17px] font-bold leading-none text-black">Physical</div>
              <div className="mt-1 text-[13px] font-medium leading-tight text-gray-800">(Body)</div>
            </div>

            {/* Center Circle */}
            <div className="absolute left-[50%] top-[50%] flex h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8F7F4] text-center">
              <div className="text-[16px] font-bold leading-[1.2] text-black">
                The<br />Kayapalat<br />Way
              </div>
            </div>
          </div>


          {/* --- The Surrounding Explanatory Text --- */}

          {/* Desktop Surrounding Text */}
          <div className="hidden lg:block">
            <div className="absolute right-[calc(60%+220px)] top-[20%] w-[250px] text-center">
              <h4 className="text-[20px] font-bold uppercase text-black">FOOD & MOVEMENT</h4>
              <p className="mt-1.5 text-center font-bold leading-relaxed text-gray-800 text-[17px]">
                Balanced nutrition and smart workouts fuel your body without extremes.
              </p>
            </div>
            
            <div className="absolute left-[calc(60%+220px)] top-[20%] w-[250px] text-center">
              <h4 className="text-[20px] font-bold uppercase text-black">METABOLISM & HORMONES</h4>
              <p className="mt-1.5 font-bold leading-relaxed text-gray-800 text-[17px]">
                Sustainable results happen when your metabolism, energy & hormones are aligned.
              </p>
            </div>

            <div className="absolute left-[50%] top-[calc(100%+30px)] w-[300px] -translate-x-1/2 text-center">
              <h4 className="text-[20px] font-bold uppercase text-black">THOUGHTS & EMOTIONS</h4>
              <p className="mt-1.5 font-bold leading-relaxed text-gray-800 text-[17px]">
                Your mindset, stress & emotional wellness drive lasting habits & behaviors.
              </p>
            </div>
          </div>

         

        </div>

        {/* Footer Paragraph */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-[19px] sm:text-[24px] font-semibold leading-relaxed text-gray-500 lg:mt-48">
          Body transformation isn't just about food or exercise; it's about aligning your body, physiology, and emotions. Get lean, fit, flexible, and strong with <strong className="font-bold text-gray-600">proven, science-backed methods.</strong>
        </p>
        
      </div>
    </section>
  );
}