"use client";

import React, { useState, useEffect } from "react";

// Mock Data: Add your actual YouTube video IDs and assign them a weight category
const videoData = [
  { id: 2, title: "10 Kg Transformation", weight: 10, videoId: "vzjzr5VOUik" },
  { id: 3, title: "15 Kg Transformation", weight: 15, videoId: "sQ5EeNuFPl4" },
  { id: 4, title: "5 Kg Transformation", weight: 5, videoId: "P71iAFcpPbc" },
  { id: 5, title: "10 Kg Transformation", weight: 10, videoId: "rcHPR4_lf3g" },
  { id: 6, title: "45 Kg Transformation", weight: 40, videoId: "4nrQTC9xWR0" },
  { id: 7, title: "35 Kg Transformation", weight: 35, videoId: "-U0-scjcgpw" },
  { id: 8, title: "30 Kg Transformation", weight: 30, videoId: "9CszJnezSC8" },
  { id: 9, title: "25 Kg Transformation", weight: 25, videoId: "D0oSuOHx5Rc" },
  { id: 10, title: "20 Kg Transformation", weight: 20, videoId: "6tPbh8jFCQk" },
  { id: 11, title: "20 Kg Transformation", weight: 20, videoId: "IVmaMYewVdA" },
  { id: 12, title: "20 Kg Transformation", weight: 20, videoId: "YH_kMfVyLqk" },
  { id: 13, title: "15 Kg Transformation", weight: 15, videoId: "rHjcKdpy8Dg" },
  { id: 14, title: "15 Kg Transformation", weight: 15, videoId: "j9X72w3tpXA" },
  { id: 15, title: "15 Kg Transformation", weight: 15, videoId: "euynJj16jQU" },
  { id: 16, title: "10 Kg Transformation", weight: 10, videoId: "vlgEvqss__U" },
  { id: 17, title: "5 Kg Transformation", weight: 5, videoId: "jLQlcEaQC9Y" },
  { id: 18, title: "5 Kg Transformation", weight: 5, videoId: "7RoyqmqS5tI" },
  { id: 19, title: "5 Kg Transformation", weight: 5, videoId: "Q9nskQLdoWw" },
  { id: 20, title: "5 Kg Transformation", weight: 5, videoId: "4m-bo3M1vN0" },
  { id: 21, title: "10 Kg Transformation", weight: 10, videoId: "JBzUwJwffo0" },
  { id: 22, title: "5 Kg Transformation", weight: 5, videoId: "Yvet6hgY8yk" },
  
  { id: 23, title: "10 Kg Transformation", weight: 10, videoId: "ku-Xbbl1YA0" },
  
  { id: 24, title: "10 Kg Transformation", weight: 10, videoId: "wASm3KZjT6A" },
  { id: 25, title: "20 Kg Transformation", weight: 20, videoId: "BUsEEe7aBWo" },
  { id: 26, title: "5 Kg Transformation", weight: 5, videoId: "GETvEegcdgw" },
  { id: 27, title: "25 Kg Transformation", weight: 25, videoId: "48WcRRnhoi0" },
  { id: 28, title: "5 Kg Transformation", weight: 5, videoId: "IkhSr3fCDNg" },
  { id: 29, title: "10 Kg Transformation", weight: 10, videoId: "a_At45H8yTg" },
  
  { id: 30, title: "5 Kg Transformation", weight: 5, videoId: "5uEACuMeKSg" },
  
  { id: 31, title: "5 Kg Transformation", weight: 5, videoId: "siLnIU0Vyo4" },
  
  { id: 32, title: "23 Kg Transformation", weight: 25, videoId: "T8ac49qT1cw" },
  
  { id: 33, title: "5 Kg Transformation", weight: 5, videoId: "wN3nk89FH2Q" },
  
  { id: 34, title: "5 Kg Transformation", weight: 5, videoId: "HWKlshM8C7Q" },
  
  { id: 35, title: "5 Kg Transformation", weight: 5, videoId: "vzvQhEm3JHY" },
  
  { id: 36, title: "10 Kg Transformation", weight: 10, videoId: "ayUY8pxiJ_A" },
  
  { id: 37, title: "5 Kg Transformation", weight: 5, videoId: "i_q_y30W_pU" },
  
  { id: 38, title: "10 Kg Transformation", weight: 10, videoId: "1DvrvsPB3uE" },
  
  { id: 39, title: "15 Kg Transformation", weight: 15, videoId: "xmd2RwFuyGg" },
  { id: 40, title: "10 Kg Transformation", weight: 10, videoId: "WUQkGJ8_Ag4" },
  
  { id: 41, title: "15 Kg Transformation", weight: 15, videoId: "JDnjsLhGjIk" },
  
  { id: 42, title: "17 Kg Transformation", weight: 15, videoId: "S0freITNBbw" },
  
  { id: 43, title: "28 Kg Transformation", weight: 30, videoId: "31ztVvfzrUw" },
];

// Generate weight categories [5, 10, 15 ... 50]
const weightCategories = Array.from({ length: 10 }, (_, i) => (i + 1) * 5);

export default function WeightVideoGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter videos based on the active tab
  const filteredVideos = activeTab === "All" 
    ? videoData 
    : videoData.filter(video => video.weight === activeTab);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full px-4 md:px-8 py-16 font-sans bg-[#003460]">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-50 mb-4 tracking-tight">
          Milestone Achievers
        </h2>
        <p className="text-gray-100 text-lg max-w-2xl mx-auto">
          Explore journeys tailored to your goals. Select a weight category to watch specific transformations.
        </p>
      </div>

      {/* Filter Tabs - Horizontally scrollable on mobile */}
      <div className="flex justify-start md:justify-center items-center gap-3 mb-12 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <button
          onClick={() => setActiveTab("All")}
          className={`shrink-0 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeTab === "All"
              ? "bg-gray-900 text-white shadow-lg scale-105"
              : "bg-gray-200 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        
        {weightCategories.map((weight) => (
          <button
            key={weight}
            onClick={() => setActiveTab(weight)}
            className={`shrink-0 px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === weight
                ? "bg-gray-900 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {weight} Kg
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div 
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative cursor-pointer rounded-xl overflow-hidden bg-black aspect-video shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* High-Quality Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-full border border-white/20 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 fill-current pl-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Video Title Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="bg-yellow-400/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {video.weight} Kg
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-200">
            <p>No videos available for this weight category yet.</p>
          </div>
        )}
      </div>

      {/* Video Popup Modal (Glassmorphism design) */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)} // Close when clicking background
        >
          {/* Modal Content - Stop propagation so clicking the video doesn't close the modal */}
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-full border border-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      
    </section>
  );
}