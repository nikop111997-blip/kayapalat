import React from 'react';

const timelineSteps = [
  { day: '1', title: 'Get Started, Feel Good', icon: '🌞' },
  { day: '7', title: 'Feel Light and Energetic', icon: '💡' },
  { day: '14', title: 'Improved Digestion & Better Sleep', icon: '😺' },
  { day: '21', title: 'Visible Progress, and Reduce Fat', icon: '📈' },
  { day: '28', title: 'Stronger Habits, Noticeable Results', icon: '💪' },
  { day: '90', title: 'Leaner, Fitter, Confident YOU', icon: '🏆' },
];

export default function Timeline() {
  return (
    <section id='how-it-works' className="w-full overflow-hidden bg-[#F8F7F4] px-4 font-manrope sm:px-6 lg:px-8">
      
      {/* 
        Inline CSS for Step-by-Step Animation Sequence 
      */}
      <style>{`
        @keyframes popInStep {
          0% { opacity: 0; transform: scale(0.5); }
          70% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes drawLineHorizontal {
          0% { transform: scaleX(0); opacity: 0; }
          1% { opacity: 1; transform: scaleX(0); }
          100% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes drawLineVertical {
          0% { transform: scaleY(0); opacity: 0; }
          1% { opacity: 1; transform: scaleY(0); }
          100% { transform: scaleY(1); opacity: 1; }
        }
        
        .animate-node {
          opacity: 0; 
          animation: popInStep 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-track-h {
          transform: scaleX(0);
          transform-origin: left;
          animation: drawLineHorizontal 0.4s linear forwards;
        }

        .animate-track-v {
          transform: scaleY(0);
          transform-origin: top;
          animation: drawLineVertical 0.4s linear forwards;
        }
      `}</style>

      <div className="mx-auto max-w-[1200px]">
        
        {/* Header Section */}
        <div className="mb-24 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-[48px]">
            See change faster than you think
          </h2>
          <p className="mx-auto font-semibold max-w-2xl text-[18px] leading-relaxed text-gray-500">
            Feel lighter and more energetic in the first 7 days. See visible progress
            within 3 weeks, and enjoy lasting transformation in just 90 days.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="flex w-full flex-col justify-between md:flex-row">
          {timelineSteps.map((step, index) => {
            // Timing Math: Node appears, then line draws, then next node appears.
            const nodeDelay = index * 0.8; 
            const lineDelay = nodeDelay + 0.4; 

            return (
              <div key={step.day} className="flex flex-1 flex-col items-center">
                
                {/* Top Label (DAY X) */}
                <span 
                  className="animate-node mb-6 text-[13px] font-bold tracking-widest text-black uppercase"
                  style={{ animationDelay: `${nodeDelay}s` }}
                >
                  DAY {step.day}
                </span>

                {/* Circle & Connecting Line Wrapper */}
                <div className="relative flex w-full justify-center">
                  
                  {/* 
                    Horizontal Line (Desktop) 
                    Changed from -z-10 to z-0 so it doesn't hide behind the section background
                  */}
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute left-1/2 top-1/2 z-0 hidden h-[2.5px] w-full -translate-y-1/2 md:block">
                      <div 
                        className="animate-track-h h-full w-full bg-black" 
                        style={{ animationDelay: `${lineDelay}s` }}
                      />
                    </div>
                  )}

                  {/* 
                    Vertical Line (Mobile) 
                    Set height to 200px so it guarantees a connection to the next item, 
                    hiding perfectly behind the next circle.
                  */}
                

                  {/* 
                    The White Circle Icon 
                    Added `relative z-10` to ensure it sits above the lines
                  */}
                  <div 
                    className="animate-node relative z-10 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-white text-5xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                    style={{ animationDelay: `${nodeDelay}s` }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Bottom Title text */}
                <p 
                  className="animate-node mb-16 mt-8 max-w-[150px] text-center text-[14px] font-semibold leading-snug text-black md:mb-0"
                  style={{ animationDelay: `${nodeDelay}s` }}
                >
                  {step.title}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}