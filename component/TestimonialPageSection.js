"use client";

import React, { useState } from "react";

// Replace these videoIds with your actual YouTube video IDs
const testimonials = [
  {
    id: 1,
    name: "Vanshika",
    location: "India",
    videoId: "vzjzr5VOUik", 
  },
  {
    id: 2,
    name: "Yogita",
    location: "India",
    videoId: "5x7abXbCEvs", 
  },
  {
    id: 3,
    name: "Ritu Mukesh Jain",
    location: "India",
    videoId: "XGymLDfn4P4", 
  },
];

export default function TestimonialSection() {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1); // Default to middle item

  return (
    <section className="w-full px-4 md:px-8 py-16 font-sans text-center overflow-hidden">
      {/* Header Section */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Real journeys. Real people. Real success.
        </h2>
       <p className="text-gray-800 max-w-3xl mx-auto text-lg leading-relaxed">
  Be inspired by real-life transformation stories from people who embraced
  change, broke limitations, and created a better version of themselves through
  the power of the Kayapalat journey.
</p>
      </div>

      {/* Carousel Dots Mockup */}
      <div className="flex justify-center items-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-8 h-2 rounded-full bg-gray-800"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      {/* Video Grid Container */}
      <div className="flex flex-col md:flex-row justify-center w-full items-stretch gap-6 h-auto md:h-[600px]">
        {testimonials.map((person, index) => {
          const isActive = index === activeIndex; 
          const isPlaying = playingVideoId === person.videoId;
          
          const thumbnailUrl = `https://img.youtube.com/vi/${person.videoId}/maxresdefault.jpg`;

          return (
            <div 
              key={person.id} 
              onMouseEnter={() => setActiveIndex(index)} 
              // Desktop handles Width (60% vs 15%). Mobile stays w-full.
              className={`flex flex-col w-full cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive ? 'md:w-[60%]' : 'md:w-[15%]'
              }`}
            >
              <div 
                // MOBILE FIX: Always h-[250px], fully visible (no blur).
                // DESKTOP: Uses h-full, applies blur & grayscale when inactive.
                className={`relative w-full rounded-2xl overflow-hidden bg-black transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-[250px] md:h-full ${
                  isActive 
                    ? 'opacity-100 grayscale-0 blur-0' 
                    : 'opacity-100 md:opacity-60 grayscale-0 md:grayscale blur-0 md:blur-[2px]'
                }`}
              >
                {isPlaying ? (
                  <iframe
                    className="w-full h-full absolute inset-0 rounded-2xl"
                    src={`https://www.youtube.com/embed/${person.videoId}?autoplay=1`}
                    title={`${person.name} Testimonial`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    <img
                      src={thumbnailUrl}
                      alt={`${person.name} video thumbnail`}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    
                    {/* Play Button - Always visible on mobile, fades out on desktop if inactive */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setPlayingVideoId(person.videoId);
                      }}
                      className={`absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/50 hover:bg-black/70 transition-all duration-300 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 shadow-lg ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-100 scale-100 md:opacity-0 md:scale-75 md:pointer-events-none'
                      }`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-sm font-semibold tracking-wide">Play Video</span>
                    </button>
                  </>
                )}
              </div>

              {/* Name & Location Labels - Always visible now */}
              <div className="text-left mt-4 whitespace-nowrap overflow-hidden">
                <h4 className="font-bold text-gray-900 transition-opacity duration-500">
                  {person.name}
                </h4>
                <p className="text-sm text-gray-500 transition-opacity duration-500">
                  {person.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}