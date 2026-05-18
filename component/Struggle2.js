import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ActionButton } from './HeroSection';
import BookingComponent from './Booking2Comp';

const cardsData = [
  {
    id: 1,
    // Replace with your actual image paths
    image: 'https://framerusercontent.com/images/Fv3S6vSwUzjnqjhRBcsxYWYxUsY.jpg?width=454&height=380',
    myth: 'Strict, hunger-prone diets are the way.',
    truth: 'Skipping meals or starving only leads to cravings and fatigue. Real change comes from balanced, sustainable eating that fuels your life.'
  },
  {
    id: 2,
    image: 'https://framerusercontent.com/images/KNh1c0asb9O1ADdn2A0eAH1MEo.jpg?width=454&height=380',
    myth: 'The harder you exercise, the faster you\'ll lose weight.',
    truth: 'Overtraining causes pain, burnout, and quitting. Lasting results come from short, smart workouts that fit your body and lifestyle.'
  },
  {
    id: 3,
    image: 'https://framerusercontent.com/images/oRmD1pYd1ULwEkrxKlcS8xzjrmY.jpg?width=454&height=380',
    myth: 'You need strong willpower and mental toughness to succeed.',
    truth: 'Real transformation isn\'t about pushing harder. It\'s about aligning your body, mind, and emotions. When you feel good, habits stick and results last.'
  }
];

export default function StruggleSection({landing=false}) {
  return (
    <section id='why-kayapalat' className="w-full bg-[#F8F7F4] px-4 py-20 font-manrope sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-[28px] font-bold tracking-tight text-black md:text-4xl lg:text-[40px]">
            Why most people struggle with weight loss
          </h2>
          <p className="text-[17px] text-gray-600">
            It's not your fault. Most of us have been told the wrong things about health and fitness.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cardsData.map((card) => (
            <div 
              key={card.id} 
              className="flex flex-col overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-md"
            >
              {/* Card Image */}
              <div className="relative mb-8 aspect-[4/2.5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.myth}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Myth Section */}
              <div className="mb-4 flex flex-col items-center text-center">
                <span className="mb-3 inline-block rounded-full bg-[#FF4D4D] px-4 py-1 text-[13px] font-bold text-white">
                  Myth
                </span>
                <h3 className="text-md font-bold leading-snug text-black">
                  {card.myth}
                </h3>
              </div>

              {/* Truth Section */}
              <div className="flex flex-col items-center text-center">
                <span className="mb-3 inline-block rounded-full bg-[#238b3f] px-4 py-1 text-[13px] font-bold text-white">
                  Truth
                </span>
                <p className="text-[14px] font-bold leading-relaxed text-gray-500">
                  {card.truth}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Content */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mb-12 text-[15px] font-semibold leading-relaxed text-gray-500">
            At Kayapalat, we don't rely on shortcuts or extremes. Our structured and science-backed approach helps you build habits that actually fit your lifestyle to deliver lasting results.
          </p>

          {/* Primary Action Button (Reused from previous sections) */}
         {landing? <BookingComponent /> : <ActionButton text="Start Your Transformation" 
                variant="primary" 
                href="/pricing" /> }

          {/* Social Proof Subtext */}
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 mt-4">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#34A853]" />
            <span>Join over 11,000+ permanent transformations.</span>
          </div>
        </div>

      </div>
    </section>
  );
}