import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4 md:px-8 font-manrope">
      <div className="max-w-[800px] w-full flex flex-col items-center text-center">
   
        {/* Floating Badge */}
        <span className="inline-block px-5 py-1.5 bg-white border border-gray-200 text-gray-500 text-sm font-medium rounded-full mb-6 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]">
          404 Error
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-[48px] font-bold text-gray-900 tracking-tight mb-6">
          Looks like you've lost your way
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-[16px] md:text-[20px] font-semibold leading-relaxed mb-10 max-w-2xl">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}