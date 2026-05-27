'use client';

import React, { useEffect, useState, useRef } from 'react';

// ==========================================
// ANIMATED COUNTER COMPONENT
// ==========================================
const StatCard = ({ target, suffix, text }) => {
  // Start with the 'target' value. 
  // This guarantees that the static HTML fallback contains the real number for SEO and non-JS users.
  const [count, setCount] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Ease-out exponential function for smooth slowing down at the end
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animateValue = () => {
      let startTimestamp = null;
      const duration = 2000; // 2 seconds animation

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Calculate the current animated value
        const currentCount = Math.floor(easeOutExpo(progress) * target);
        setCount(currentCount);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(target); // Snap to exact target at the end
        }
      };

      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Trigger animation only once when the element comes into view
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the card is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, target]);

  return (
    <div 
      ref={elementRef}
      className="flex w-full flex-col items-center justify-center rounded-[24px] border border-gray-100 bg-white p-8 px-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-md"
    >
      <h3 className="mb-4 text-4xl text-[#000] md:text-[42px] font-bold">
        {count.toLocaleString('en-US')}{suffix}
      </h3>
      <p className="text-center text-sm font-medium leading-relaxed text-gray-700">
        {text}
      </p>
    </div>
  );
};

// ==========================================
// MAIN SECTION COMPONENT
// ==========================================
export default function LegacySection() {
  const stats = [
    {
      target: 11000,
      suffix: '+',
      text: 'Executive Lives Transformed',
    },
    {
      target: 70000,
      suffix: '+',
      text: 'Kilos Permanently Lost',
    },
    {
      target: 30,
      suffix: '+',
      text: 'Years of Clinical Coaching Experience',
    },
    {
      target: 100,
      suffix: '%',
      text: 'Human Led Coaching',
    },
  ];

  return (
    <section className="w-full bg-[#F8F7F4] py-10 px-4 sm:px-6 lg:px-8 font-manrope">
      <div className="mx-auto max-w-[1240px]">
        
        {/* Heading */}
        <h2 className="mb-14 text-center text-[40px] leading-[1.0] font-semibold tracking-[-1px] text-black md:text-[40px] md:leading-[1.2] font-manrope">
          Results Speak for Themselves
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              target={stat.target}
              suffix={stat.suffix}
              text={stat.text}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}