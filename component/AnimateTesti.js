import React from 'react';

export default function TestimonialGrid() {
  // Placeholder images - replace these with your actual image paths from the public folder
  // e.g., '/testimonials/person1.jpg'
  const topRowImages = [
    "https://framerusercontent.com/images/QHUCs55Ry0Tj6mrRUtKjyZMK21A.jpg?width=522&height=460",
    "https://framerusercontent.com/images/KVRqUSc2UEs2dWmEUdMdNiY8OA.jpg?width=395&height=460",
    "https://framerusercontent.com/images/1OURX8zwJDM873NgUGHkzogZBc.jpg?width=556&height=460",
    "https://framerusercontent.com/images/wBuD01U98yOFOxPRnpI8EQrdWk.jpg?width=613&height=460",
    "https://framerusercontent.com/images/r8UosYBNt7BlN8he0vSHtahoZg.jpg?width=556&height=460",
    "https://framerusercontent.com/images/Om7YQdsHYXZyjQLFxSgIpBFc8Mg.jpg?width=441&height=460",
  ];

  const bottomRowImages = [
    "https://framerusercontent.com/images/3LHPMxHUzyuaR5ydD0aM6Qy2r8.jpg?width=538&height=460",
    "https://framerusercontent.com/images/746YlA7rdynIaWfWKwuVdPLKKo.jpg?width=431&height=460",
    "https://framerusercontent.com/images/01AndbLUiwfEBwmmLLJxE0pd3bg.jpg?width=556&height=460",
    "https://framerusercontent.com/images/eeikcl3gMpBBHPxvOM8BGG2PMk.jpg?width=495&height=460",
    "https://framerusercontent.com/images/4MmdoZKqWaZTQ4PICgXHuzW3xA.jpg?width=508&height=460e",
    "https://framerusercontent.com/images/zdUDv5STUfUOw4nzitlJKMJdxw.jpg?width=548&height=460",
  ];

  return (
    <section className="bg-[#FAF9F6] py-24 sm:py-10 overflow-hidden font-manrope">
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
        
        {/* Top Row: Scrolling Right to Left */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-right flex gap-4 md:gap-6 whitespace-nowrap min-w-full pl-4 md:pl-6 hover:[animation-play-state:paused]">
            {/* Render array twice to create the seamless infinite loop */}
            {[...topRowImages, ...topRowImages].map((imgSrc, index) => (
              <div 
                key={`top-${index}`} 
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

        {/* Bottom Row: Scrolling Left to Right */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-left flex gap-4 md:gap-6 whitespace-nowrap min-w-full pl-4 md:pl-6 hover:[animation-play-state:paused]">
            {/* Render array twice to create the seamless infinite loop */}
            {[...bottomRowImages, ...bottomRowImages].map((imgSrc, index) => (
              <div 
                key={`bottom-${index}`} 
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