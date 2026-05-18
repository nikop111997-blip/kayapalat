"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ActionButton } from "./HeroSection";

export default function ExperienceDifference({landing=false}) {
  const [activeVideo, setActiveVideo] = useState(null);

  // Add your YouTube video IDs here
  const testimonials = [
    {
      id: 1,
      club: "5 KG",
      name: "Ritu",
      videoId: "7RoyqmqS5tI",
      thumbnail: "https://img.youtube.com/vi/7RoyqmqS5tI/hqdefault.jpg",
    },
    {
      id: 2,
      club: "5 KG",
      name: "Priya",
      videoId: "P71iAFcpPbc",
      thumbnail: "https://img.youtube.com/vi/P71iAFcpPbc/hqdefault.jpg",
    },
    {
      id: 3,
      club: "5 KG",
      name: "Kavita",
      videoId: "Q9nskQLdoWw",
      thumbnail: "https://img.youtube.com/vi/Q9nskQLdoWw/hqdefault.jpg",
    },
    {
      id: 4,
      club: "5 KG",
      name: "Sunita",
      videoId: "jLQlcEaQC9Y",
      thumbnail: "https://img.youtube.com/vi/jLQlcEaQC9Y/hqdefault.jpg",
    },
    {
      id: 5,
      club: "10 KG",
      name: "Poonam",
      videoId: "rcHPR4_lf3g",
      thumbnail: "https://img.youtube.com/vi/rcHPR4_lf3g/hqdefault.jpg",
    },
    {
      id: 6,
      club: "10 KG",
      name: "Seema",
      videoId: "vlgEvqss__U",
      thumbnail: "https://img.youtube.com/vi/vlgEvqss__U/hqdefault.jpg",
    },
  ];

  const openVideo = (videoId) => {
    setActiveVideo(videoId);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeVideo();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <section id="transformations" className="bg-[#FAF9F6] px-4 md:px-8 font-manrope">
        <div className="max-w-6xl mx-auto flex flex-col items-center">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-[48px] font-bold text-gray-900 tracking-tight">
              Experience the{" "}
              <span className="relative inline-block">
                Kayapalat
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
              </span>{" "}
              difference.
            </h2>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12 max-w-4xl">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                onClick={() => openVideo(testimonial.videoId)}
                className="relative w-full aspect-[16/9] md:aspect-[8/5] rounded-xl overflow-hidden flex bg-[#0A2A4A] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >

            

                {/* Right Video Thumbnail */}
                <div className="w-full h-full relative overflow-hidden rounded-br-xl">

                  <Image
                    src={testimonial.thumbnail}
                    alt={testimonial.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-12 bg-black/60  rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-black/90 transition-all duration-300 shadow-xl">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Video Label */}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                    Watch Story
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          {!landing &&<ActionButton text="Explore Transformation" 
                          variant="primary" 
                          href="/pricing" /> }
        </div>
      </section>

      {/* VIDEO POPUP */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">

          {/* Background Overlay */}
          <div
            className="absolute inset-0"
            onClick={closeVideo}
          />

          {/* Video Container */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden z-10 shadow-2xl">

            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold hover:scale-105 transition-transform"
            >
              ✕
            </button>

            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}