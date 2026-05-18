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
          <div className="flex justify-start lg:justify-end space-x-6 text-gray-300">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/kayapalatwellness/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:-translate-y-1 transition-all duration-200"
              aria-label="Instagram"
            >
              {/* SVG */}
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@kayapalat_wellness"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:-translate-y-1 transition-all duration-200"
              aria-label="YouTube"
            >
              {/* SVG */}
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/KayapalatWellness"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:-translate-y-1 transition-all duration-200"
              aria-label="Facebook"
            >
              {/* SVG */}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-center space-y-3 text-sm text-gray-50 font-medium">
          <p>© 2026 Kayapalat Wellness. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <RolloverLink href="#" className="text-gray-50">
              Privacy Policy
            </RolloverLink>

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