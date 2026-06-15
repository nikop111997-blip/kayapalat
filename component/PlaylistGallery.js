"use client";

import React, { useState, useEffect } from "react";

// Replace with your actual Playlist ID
const PLAYLIST_ID = "PLddzVrNNTl_hCRmImVIJfgRsS-4aayrBb";

export default function PlaylistGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // State to control how many videos are visible at once (4 rows * 4 columns = 16)
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    // Fetch videos from the YouTube playlist
    const fetchPlaylistVideos = async () => {
      try {
       const response = await fetch(
  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
);
        const data = await response.json();
        
        if (data.items) {
          // Format the data
          const formattedVideos = data.items.map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            // Fallback to high quality if maxres isn't available
            thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url,
          }));
          
          // Filter out private or deleted videos
          const validVideos = formattedVideos.filter((v) => v.title !== "Private video" && v.title !== "Deleted video");
          
          setVideos(validVideos);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, []);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Calculate the subset of videos to display
  const displayedVideos = videos.slice(0, visibleCount);

  // Handle loading more videos
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 16);
  };

  return (
    <section className="w-full px-4 md:px-8 py-16 font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Story of the Week
        </h2>
        <p className="text-gray-800 max-w-4xl mx-auto text-lg leading-relaxed">
  At Kayapalat, we believe transformation is not an event—it's a journey.
  Every week, we showcase an inspiring story of someone who broke limitations,
  built better habits, and achieved remarkable growth. Let their journey
  motivate you to take the first step toward your own transformation.
</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {displayedVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail Container */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300 mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Play Button Overlay (Glassmorphism) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-90 transition-opacity duration-300 bg-black/20">
                    <div className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full border border-white/40 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-8 h-8 fill-current pl-1" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Video Details */}
                <h3 className="font-semibold text-gray-900 text-md line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < videos.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wide rounded-full shadow-md hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Load More Videos
              </button>
            </div>
          )}
        </>
      )}

      {/* Glassmorphic Video Modal Popup */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl scale-100 animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white p-2.5 rounded-full border border-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
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