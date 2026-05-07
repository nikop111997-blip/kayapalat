import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FloatingWhatsAppButton from './FloatingWhatsApp';

// Helper component for the clean rollover animation
const RolloverLink = ({ href, children, isExternal = false, className = "" }) => {
  const content = (
    <>
      <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-[#f9cf01]">
        {children}
      </span>
    </>
  );

  const baseClasses = `group relative inline-flex overflow-hidden w-fit ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="bg-[#161616] pt-20 pb-16 px-6 md:px-12 font-manrope text-[#EAEAEA]">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 flex flex-col items-start">
            {/* Logo */}
              <Link href={'/'} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            {/* Custom SVG approximating the Kayapalat asterisk logo */}
            <Image 
            src="https://framerusercontent.com/images/msjGzrRn1eu9rQWQOuvoSNpE2yE.png?scale-down-to=512&width=644&height=164"
            alt="Kayapalat Logo"
            width={236}
            height={36}
            className="-ml-2 mb-3"
            />
          </Link>

            {/* Contact Info with Hover Effects */}
            <div className="flex flex-col space-y-3 text-[15px] text-gray-300 font-medium mt-4">
              <RolloverLink href="mailto:support@kayapalat.in" isExternal>
                support@kayapalat.in
              </RolloverLink>
              <RolloverLink href="tel:+916377092229" isExternal>
                +91 6377092229
              </RolloverLink>
            </div>
          </div>
          {/* Column 2: Navigation Links 1 */}
          <div className="flex flex-col space-y-4 text-[15px] font-medium text-gray-300">
            <RolloverLink href="https://kayapalat.in#why-kayapalat">Why Kayapalat</RolloverLink>
            <RolloverLink href="https://kayapalat.in#how-it-works">How it works</RolloverLink>
            <RolloverLink href="https://kayapalat.in/pricing">Programs</RolloverLink>
          </div>

          {/* Column 3: Navigation Links 2 */}
          <div className="flex flex-col space-y-4 text-[15px] font-medium text-gray-300">
            <RolloverLink href="https://kayapalat.in#transformations">Transformations</RolloverLink>
            <RolloverLink href="https://kayapalat.in/about">About</RolloverLink>
            <RolloverLink href="https://kayapalat.in#faq">FAQ</RolloverLink>
          </div>

          {/* Column 4: Social Icons */}
          <div className="flex justify-start lg:justify-end space-x-6 text-gray-300">
            {/* Instagram */}
            <a href="https://www.instagram.com/kayapalatwellness/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all duration-200" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/@kayapalat_wellness" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all duration-200" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/KayapalatWellness" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all duration-200" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4H14V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>

        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center space-y-3 text-sm text-gray-50 font-medium">
          <p>© 2026 Kayapalat Wellness. All rights reserved.</p>
          
          <div className="flex items-center space-x-4">
            <RolloverLink href="#" className="text-gray-50">
              Privacy Policy
            </RolloverLink>
            {/* Dot Separator */}
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <RolloverLink href="#" className="text-gray-50">
              Terms of Service
            </RolloverLink>
          </div>
        </div>

      </div>
      <FloatingWhatsAppButton />
    </footer>
  );
}