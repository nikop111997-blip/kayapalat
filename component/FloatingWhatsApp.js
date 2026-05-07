import React from 'react';
import Link from 'next/link';

export default function FloatingWhatsAppButton() {
  // Replace with the actual WhatsApp number (include country code, omit '+' or '00')
  // For India, it would be '91' followed by the 10-digit number.
  const phoneNumber = "916377092229"; 
  const defaultMessage = "Hi Kayapalat team! I'd like to know more.";
  
  // Create the API link
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <Link 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center gap-2.5 bg-[#25D366] text-gray-900 px-5 py-3 md:px-6 md:py-3.5 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:-translate-y-1 transition-all duration-300 font-sans font-medium text-[15px]"
    >
      {/* WhatsApp Icon SVG */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-5 h-5"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      
      {/* Text - hides on very small mobile screens, shows on sm and up */}
      <span className="hidden sm:inline-block">
        Message Kayapalat on WhatsApp
      </span>
      <span className="sm:hidden">
        WhatsApp Us
      </span>
    </Link>
  );
}