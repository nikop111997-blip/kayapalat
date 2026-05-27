import Image from 'next/image';
import React from 'react';

const UserAvatarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function AboutAuthor() {
  return (
    <section className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <span className="text-[#ffd54c] font-bold text-sm tracking-widest uppercase">The Creator</span>
          <h2 className="text-4xl font-bold tracking-tight">Mr. Ajay Sethi</h2>
          <h3 className="text-xl text-gray-400">Wellness Coach & Author</h3>
          <p className="text-gray-300 leading-relaxed">
            "I created the KP Journal because I couldn't find a system that balanced ruthless execution with mindful reflection. True transformation (Kayapalat) doesn't happen overnight. It happens in the 5 minutes you spend planning your day and the 5 minutes you spend reflecting on it."
          </p>
          <div className="pt-4 flex gap-8 border-t border-gray-800">
            <div>
              <h4 className="text-3xl font-bold text-[#ffd54c]">10k+</h4>
              <p className="text-xs text-gray-300 uppercase tracking-wide mt-1">Lives Impacted</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-[#ffd54c]">30+</h4>
              <p className="text-xs text-gray-300 uppercase tracking-wide mt-1">Years Coaching</p>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="aspect-square bg-gradient-to-tr from-gray-50 to-gray-700 rounded-lg overflow-hidden relative shadow-2xl">
           
               <Image
                 src="https://framerusercontent.com/images/VaJVz7sLas8kHWe1d2ITuHvrA.png?width=429&height=607"
                 alt="Ajay Sethi - Wellness Coach"
                 fill
                 className="object-cover object-top scale-100 grayscale"
               />

          </div>
        </div>
      </div>
    </section>
  );
}