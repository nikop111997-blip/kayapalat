import React from 'react';

export default function TestimonialGrid() {
  const topRowImages = [
    "https://framerusercontent.com/images/KVRqUSc2UEs2dWmEUdMdNiY8OA.jpg",
    "https://framerusercontent.com/images/9Vq6KSFPgUfuhTd3rONBChAs.jpg",
    "https://framerusercontent.com/images/zdUDv5STUfUOw4nzitlJKMJdxw.jpg",
    "https://framerusercontent.com/images/7wkjNB4rYL4D5uc6SLydBQOuXw.jpg",
    "https://framerusercontent.com/images/QHUCs55Ry0Tj6mrRUtKjyZMK21A.jpg",
    "https://framerusercontent.com/images/Ruhz2LILpmzQZQc2K6a2U8fqs.jpg",
  ];

  const bottomRowImages = [
    "https://framerusercontent.com/images/4MmdoZKqWaZTQ4PICgXHuzW3xA.jpg",
    "https://framerusercontent.com/images/1OURX8zwJDM873NgUGHkzogZBc.jpg",
    "https://framerusercontent.com/images/BHtnoTJabfZmRcggIlHVDHwAA.jpg",
    "https://framerusercontent.com/images/gtC9iSdps6nffTOWfdp6M1k6JE.jpg",
    "https://framerusercontent.com/images/01AndbLUiwfEBwmmLLJxE0pd3bg.jpg",
    "https://framerusercontent.com/images/NN3apx0DY59Md1uXDnLAy4XSjyU.jpg"
  ];

  const topRowImages2 = [
   "https://framerusercontent.com/images/eeikcl3gMpBBHPxvOM8BGG2PMk.jpg",
"https://framerusercontent.com/images/T5HzKBqNZDkK0HkfzM78TsdNEU.jpg",
"https://framerusercontent.com/images/1JUsB9y82UhAmqkssIVE3t3SmI.jpg",
"https://framerusercontent.com/images/NxC9PJcG3AHJ4EqPK0efUV2g.jpg",
"https://framerusercontent.com/images/0WzeAAGgcHfNNTDx8lYgPqAIY.jpg",
"https://framerusercontent.com/images/746YlA7rdynIaWfWKwuVdPLKKo.jpg"
  ];

  const bottomRowImages2 = [
   "https://framerusercontent.com/images/X2k5DEb7TvGUnr8UdbfEpFuPY3I.jpg",
"https://framerusercontent.com/images/jhuCDCHsK7FQFQMubwJidKGP7VM.jpg",
"https://framerusercontent.com/images/3LHPMxHUzyuaR5ydD0aM6Qy2r8.jpg",
"https://framerusercontent.com/images/r8UosYBNt7BlN8he0vSHtahoZg.jpg",
"https://framerusercontent.com/images/Om7YQdsHYXZyjQLFxSgIpBFc8Mg.jpg",
"https://framerusercontent.com/images/X8fNeLNYikJLZ1ECubzTm0Jtd0.jpg"
  ];

  return (
    <section className="bg-[#FAF9F6] py-24 sm:pb-28 sm:pt-16 overflow-hidden font-manrope">
      {/* Heading Section */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-[32px] md:text-[48px] font-bold text-gray-900 tracking-tight">
          Thousands have taken the first step <br className="hidden md:block" />
          and gone way{' '}
          <span className="relative inline-block">
            beyond.
            {/* Yellow underline SVG drawn under "beyond." */}
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-[#F2C94C]"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="M2,8 Q50,2 98,6" />
            </svg>
          </span>
        </h2>
      </div>

      {/* Marquee Tracks */}
      <div className="flex flex-col gap-4 md:gap-6">
        
        {/* Row 1: Scrolling Right */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-right flex gap-4 md:gap-6 whitespace-nowrap min-w-full pl-4 md:pl-6 hover:[animation-play-state:paused]">
            {[...topRowImages, ...topRowImages].map((imgSrc, index) => (
              <div 
                key={`row1-${index}`} 
                className="w-[280px] h-[340px] md:w-[340px] md:h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={imgSrc}
                  alt="Transformation Success"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Left */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-left flex gap-4 md:gap-6 whitespace-nowrap min-w-full pl-4 md:pl-6 hover:[animation-play-state:paused]">
            {[...bottomRowImages, ...bottomRowImages].map((imgSrc, index) => (
              <div 
                key={`row2-${index}`} 
                className="w-[280px] h-[340px] md:w-[340px] md:h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={imgSrc}
                  alt="Transformation Success"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Scrolling Right */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-right flex gap-4 md:gap-6 whitespace-nowrap min-w-full pl-4 md:pl-6 hover:[animation-play-state:paused]">
            {[...topRowImages2, ...topRowImages2].map((imgSrc, index) => (
              <div 
                key={`row3-${index}`} 
                className="w-[280px] h-[340px] md:w-[340px] md:h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={imgSrc}
                  alt="Transformation Success"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 4: Scrolling Left */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-left flex gap-4 md:gap-6 whitespace-nowrap min-w-full pl-4 md:pl-6 hover:[animation-play-state:paused]">
            {[...bottomRowImages2, ...bottomRowImages2].map((imgSrc, index) => (
              <div 
                key={`row4-${index}`} 
                className="w-[280px] h-[340px] md:w-[340px] md:h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={imgSrc}
                  alt="Transformation Success"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Internal CSS for the continuous animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeLeft {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-50% - 12px));
              }
            }

            @keyframes marqueeRight {
              0% {
                transform: translateX(calc(-50% - 12px));
              }
              100% {
                transform: translateX(0);
              }
            }

            /* Mobile Speed */
            .animate-marquee-left {
              animation: marqueeLeft 10s linear infinite;
            }

            .animate-marquee-right {
              animation: marqueeRight 10s linear infinite;
            }

            /* Desktop Slower Speed */
            @media (min-width: 768px) {
              .animate-marquee-left {
                animation: marqueeLeft 25s linear infinite;
              }

              .animate-marquee-right {
                animation: marqueeRight 25s linear infinite;
              }
            }
          `,
        }}
      />
    </section>
  );
}