'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import FloatingWhatsAppButton from './FloatingWhatsApp';

// Helper component for the clean rollover animation
const RolloverLink = ({
  href,
  children,
  isExternal = false,
  className = "",
}) => {
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
  const pathname = usePathname();

  const isLandingPage = pathname === "/landing-page";

  // ONLY LOGO FOR LANDING PAGE
  if (isLandingPage) {
    return (
      <footer className="bg-[#161616] py-10 flex items-center justify-center">
        
          <Image
            src="https://framerusercontent.com/images/msjGzrRn1eu9rQWQOuvoSNpE2yE.png?scale-down-to=512&width=644&height=164"
            alt="Kayapalat Logo"
            width={236}
            height={36}
            priority
          />
      </footer>
    );
  }

  return (
    <footer className="bg-[#161616] pt-20 pb-16 px-6 md:px-12 font-manrope text-[#EAEAEA]">
      <div className="max-w-5xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">

          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 flex flex-col items-start">

            {/* Logo */}
            <Link
              href={'/'}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="https://framerusercontent.com/images/msjGzrRn1eu9rQWQOuvoSNpE2yE.png?scale-down-to=512&width=644&height=164"
                alt="Kayapalat Logo"
                width={236}
                height={36}
                className="-ml-2 mb-3"
              />
            </Link>

            {/* Contact Info */}
            <div className="flex flex-col space-y-3 text-[15px] text-gray-300 font-medium mt-4">
              <RolloverLink
                href="mailto:support@kayapalat.in"
                isExternal
              >
                support@kayapalat.in
              </RolloverLink>

              <RolloverLink
                href="tel:+916377092229"
                isExternal
              >
                +91 6377092229
              </RolloverLink>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-4 text-[15px] font-medium text-gray-300">
            <RolloverLink href="https://kayapalat.in#why-kayapalat">
              Why Kayapalat
            </RolloverLink>

            <RolloverLink href="https://kayapalat.in#how-it-works">
              How it works
            </RolloverLink>

            <RolloverLink href="https://kayapalat.in/pricing">
              Programs
            </RolloverLink>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-4 text-[15px] font-medium text-gray-300">
            <RolloverLink href="https://kayapalat.in#transformations">
              Transformations
            </RolloverLink>

            <RolloverLink href="https://kayapalat.in/about">
              About
            </RolloverLink>

            <RolloverLink href="https://kayapalat.in#faq">
              FAQ
            </RolloverLink>
          </div>

          {/* Social Icons */}
          <div className="flex justify-start lg:justify-end space-x-6 text-gray-300 dark:text-gray-50">

            
            <a
              href="https://www.instagram.com/kayapalatwellness/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:-translate-y-1 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
     width="24" 
     height="24" 
     viewBox="0 0 24 24" 
     fill="none">
  <rect x="2" y="2" width="20" height="20" rx="6" 
        stroke="currentColor" 
        stroke-width="2"/>
        
  <circle cx="12" cy="12" r="4" 
          stroke="currentColor" 
          stroke-width="2"/>
          
  <circle cx="18" cy="6" r="1.2" 
          fill="currentColor"/>
</svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@kayapalat_wellness"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:-translate-y-1 transition-all duration-200"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
     width="28" 
     height="28" 
     viewBox="0 0 24 24" 
     fill="none">
    
  <path d="M21.8 7.2C21.6 6.4 21 5.8 20.2 5.6C18.7 5.2 12 5.2 12 5.2C12 5.2 5.3 5.2 3.8 5.6C3 5.8 2.4 6.4 2.2 7.2C1.8 8.7 1.8 12 1.8 12C1.8 12 1.8 15.3 2.2 16.8C2.4 17.6 3 18.2 3.8 18.4C5.3 18.8 12 18.8 12 18.8C12 18.8 18.7 18.8 20.2 18.4C21 18.2 21.6 17.6 21.8 16.8C22.2 15.3 22.2 12 22.2 12C22.2 12 22.2 8.7 21.8 7.2Z" 
        stroke="currentColor" 
        stroke-width="2" 
        fill="none"/>
        
  <path d="M10 15L16 12L10 9V15Z" 
        fill="currentColor"/>
</svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/KayapalatWellness"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:-translate-y-1 transition-all duration-200"
              aria-label="Facebook"
            >
          <svg xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none">

  <rect x="2" y="2" width="20" height="20" rx="5"
        stroke="currentColor"
        stroke-width="2"/>

  <path d="M14 8H16V5H13.5C10.9 5 9 6.6 9 9.5V12H7V15H9V19H12V15H15L15.5 12H12V9.8C12 8.7 12.3 8 14 8Z"
        fill="currentColor"/>

</svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-center space-y-3 text-sm text-gray-50 font-medium">
         

          <div className="flex items-center space-x-4">
            <RolloverLink href="#" className="text-gray-50">
              Privacy Policy
            </RolloverLink>

            <span className="w-1 h-1 rounded-full bg-gray-500"></span>

            <RolloverLink href="#" className="text-gray-50">
              Terms of Service
            </RolloverLink>
          </div>
          <div className='flex gap-4'>
             <p>© 2026 Kayapalat Wellness. All rights reserved.</p>
             <p>Created by <RolloverLink href="https://www.brandhubble.com/" className="text-gray-50">
              Brand Hubble
            </RolloverLink>.</p>
          </div>
          
        </div>
      </div>

      <FloatingWhatsAppButton />
    </footer>
  );
}