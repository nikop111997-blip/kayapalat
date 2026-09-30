"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Round arrow button: yellow fill slides in from the left on hover
function ArrowButton({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 text-gray-500 transition-colors duration-500 hover:border-[#f9cf01] hover:text-gray-900 dark:border-neutral-700 dark:text-gray-400 dark:hover:border-[#f9cf01] dark:hover:text-gray-900 active:scale-95"
    >
      <span className="absolute inset-0 -translate-x-full bg-[#f9cf01] transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="relative">{children}</span>
    </button>
  );
}

export default function BlogCarousel({ title, children }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <div className="flex gap-2">
          <ArrowButton onClick={() => scroll(-1)} label="Scroll left">
            <ArrowLeft className="h-4 w-4" />
          </ArrowButton>
          <ArrowButton onClick={() => scroll(1)} label="Scroll right">
            <ArrowRight className="h-4 w-4" />
          </ArrowButton>
        </div>
      </div>
      {/* pt/pb give room for the card hover lift + shadow so it isn't clipped */}
      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto pt-2 pb-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}