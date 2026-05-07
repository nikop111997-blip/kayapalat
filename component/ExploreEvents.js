import Image from 'next/image';
import React from 'react';

export default function ExploreEvents() {
  // Using a structured array to define the varied sizes of the collage images.
  // You can replace the 'src' URLs with your actual image paths from the public folder.
  const eventImages = [
    { 
      id: 1, 
      src: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=600&auto=format&fit=crop', 
      span: 'col-span-2 md:col-span-1 row-span-2' // Tall image on left
    },
    { 
      id: 2, 
      src: 'https://images.unsplash.com/photo-1523580494112-071d324dd268?q=80&w=800&auto=format&fit=crop', 
      span: 'col-span-2 md:col-span-2 row-span-1' // Wide image top middle
    },
    { 
      id: 3, 
      src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop', 
      span: 'col-span-2 md:col-span-1 row-span-2' // Tall image on right
    },
    { 
      id: 4, 
      src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop', 
      span: 'col-span-1 md:col-span-1 row-span-1' // Small square
    },
    { 
      id: 5, 
      src: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop', 
      span: 'col-span-1 md:col-span-1 row-span-1' // Small square
    },
    { 
      id: 6, 
      src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop', 
      span: 'col-span-2 md:col-span-2 row-span-1' // Wide bottom left
    },
    { 
      id: 7, 
      src: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=800&auto=format&fit=crop', 
      span: 'col-span-2 md:col-span-2 row-span-1' // Wide bottom right
    },
  ];

  return (
    <section className="bg-[#FAF9F6] px-4 md:px-8 pb-12 font-manrope">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-[48px] font-bold text-black mb-6 tracking-tight">
            Explore Kayapalat Events
          </h2>
          <p className="text-[#636363] text-[15px] md:text-[18px] leading-relaxed font-semibold">
            Discover the Kayapalat way of life where fitness, mindset, and sustainable habits 
            come together to create lasting transformation, stronger communities, and a healthier you.
          </p>
        </div>

        {/* Collage Section */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ">
          
          {/* CSS Grid for Masonry/Collage layout */}
          <Image 
                  src="https://framerusercontent.com/images/VKXAstdJwrG80aBOXAVESiEMlw.png?scale-down-to=2048&width=3034&height=1433" 
                  alt="Kayapalat Event" 
                    width={3034}
                    height={1433}
                  className="w-full h-auto object-cover"
                />

          {/* Dark Bottom Gradient Overlay (Matches your reference image) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none"></div>

        </div>

      </div>
    </section>
  );
}