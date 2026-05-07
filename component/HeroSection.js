import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Star } from 'lucide-react';
import BookingComponent from './BookingComponent';

// ==========================================
// REUSABLE BUTTON COMPONENT (Server Component Safe)
// ==========================================
export const ActionButton = ({ text, variant = 'primary', href = '#', className = '' }) => {
  if (variant === 'primary') {
    return (
      <Link
        href={href}
        // Removed hover:bg-[#FFCE00] from parent so the expanding circle handles the fill
        className={`group relative flex w-fit items-center justify-between gap-4 overflow-hidden rounded-full border-2 border-black bg-black px-6 py-3 font-semibold text-white transition-colors duration-500 hover:border-[#FFCE00] hover:text-black ${className}`}
      >
        {/* 1. The Expanding Yellow Background */}
        {/* Placed exactly at the right padding (right-6). Scales up 30x on hover to create the fill effect. */}
        <div className="absolute right-6 top-1/2 z-0 h-8 w-8 -translate-y-1/2 rounded-full bg-[#FFCE00] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[30]" />

        {/* 2. Button Text */}
        <span className="relative z-10">{text}</span>
        
        {/* 3. Icons Container */}
        {/* This acts as the spacer in the flex layout, keeping the icons above the expanding background */}
        <div className="relative z-10 flex h-8 w-8 items-center justify-center">
          
          {/* Default State Icon (ArrowUpRight) */}
          <ArrowUpRight 
            className="absolute h-5 w-5 text-black transition-all duration-300 group-hover:scale-0 group-hover:opacity-0" 
            strokeWidth={2.5} 
          />

          {/* Hover State Icon (ArrowRight) - Slides in from the right */}
          <ArrowRight 
            className="absolute h-5 w-5 translate-x-6 text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" 
            strokeWidth={2.5} 
          />
        </div>
      </Link>
    );
  }

  // Secondary Variant (Outline to Solid Black) - Kept exactly as you had it
  return (
    <Link
      href={href}
      className={`group flex w-fit items-center justify-center gap-2 rounded-full border border-black bg-transparent px-8 py-4 font-medium text-black transition-all duration-300 hover:bg-black hover:text-white ${className}`}
    >
      <span>{text}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
    </Link>
  );
};

// ==========================================
// MAIN HERO SECTION COMPONENT
// ==========================================
export default function HeroSection() {
  return (
    <section className="w-full bg-[#F8F7F4] px-4 py-10 font-manrope sm:px-6 lg:px-8">
      <style>{`
        @keyframes slideUpReveal {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-ease-in {
          opacity: 0;
          animation: slideUpReveal 0.6s ease-in forwards;
        }
      `}</style>

      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          
          {/* Left Content Column - Centered content on mobile, left-aligned on desktop */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left px-4 lg:px-0">
            
            {/* The heading text with the specified animation */}
            <h1 className="animate-reveal-ease-in mb-6 text-[40px] font-bold lg:tracking-[-2px] leading-[110%] text-[#0E1728] lg:text-[48px]">
              Reclaim Your Body's <br className='hidden sm:block'/> True Vitality and<br className='hidden sm:block'/>  Strength with <br className='hidden sm:block'/> Kayapalat.
            </h1>
            
            {/* Paragraph appears statically */}
            <p className="mb-10 max-w-lg text-md font-medium leading-relaxed text-gray-600">
              Stop fighting daily burnout and a stalling metabolism. A clinical, 3-pillar wellness protocol designed to help driven individuals lose stubborn weight, restore natural energy, and build lifelong physical resilience.
            </p>

            {/* The action buttons with the specified animation, delayed slightly */}
            <div className="animate-reveal-ease-in flex flex-col gap-4 sm:flex-row sm:items-center mb-12 [animation-delay:200ms]">
              <ActionButton 
                text="Start Your Transformation" 
                variant="primary" 
                href="/pricing" 
              />
              <BookingComponent />
            </div>

            {/* Social Proof / Reviews - appears statically, centered by parent flex */}
            <div className="flex flex-col gap-4">
              <div className="flex -space-x-3">
                {/* Dummy Avatars */}
                {[
                  'https://framerusercontent.com/images/eReyUFsJ5CwFffO5fX5Zz3u8thU.png?scale-down-to=512&width=762&height=714',
                  'https://framerusercontent.com/images/ASqjnG02UN449uspzNvtOXXV71w.png?width=384&height=390',
                  'https://framerusercontent.com/images/qclynGPPjevldXBRWXUaSDOWdxo.png?scale-down-to=512&width=568&height=550',
                  'https://framerusercontent.com/images/Ekfrc4OcB1tZgUvaqDxB1uZ9Gw.png?scale-down-to=512&width=548&height=540',
                ].map((src, index) => (
                  <div key={index} className="relative h-12 w-12 overflow-hidden rounded-full border-[3px] border-[#FFCE00]">
                    <Image
                      src={src}
                      alt={`Client ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-black text-black" />
                  ))}
                  <span className="ml-1 font-bold text-black">4.8/5</span>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  10,000+ Clients Transformed
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Column - Appears statically, centered on mobile */}
          <div className="relative mt-8 flex justify-center lg:mt-0 lg:justify-end hidden lg:block">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] md:aspect-[4/3] lg:aspect-[4/4.5]">
              {/* Replace src with your actual family image from your public folder */}
              <Image
                src="https://framerusercontent.com/images/dpoEu6bAixQRYKwFTttRq5qg84U.jpg?scale-down-to=1024&width=1200&height=1298"
                alt="Happy family showing vitality"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}