'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { name: 'Why Kayapalat', href: 'https://kayapalat.in/#why-kayapalat' },
  { name: 'How it works', href: 'https://kayapalat.in/#how-it-works' },
  { name: 'Programs', href: '/pricing' },
  { name: 'Transformations', href: 'https://kayapalat.in/#transformations' },
  { name: 'About', href: '/about' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'FAQ', href: 'https://kayapalat.in/#faq' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
const router = useRouter()
  // Approximate brand color from your images
  const bgColor = 'bg-[#003460]';

  return (
    // CHANGED: Replaced 'relative' with 'sticky top-0'
    <nav className={`w-full ${bgColor} text-white font-manrope sticky top-0 z-50`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href={'/'} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            {/* Custom SVG approximating the Kayapalat asterisk logo */}
            <Image 
            src="https://framerusercontent.com/images/msjGzrRn1eu9rQWQOuvoSNpE2yE.png?scale-down-to=512&width=644&height=164"
            alt="Kayapalat Logo"
            width={236}
            height={36}
            className=""
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-md text-gray-100 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#f9cf01] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Action Button with Hover "Fill" Animation */}
          <div className="hidden lg:block">
            <button onClick={()=>router.push("/pricing")} className="group relative overflow-hidden rounded-full border border-white px-6 py-2 transition-colors duration-300 hover:border-[#f9cf01]">
              {/* The yellow background that fills in from the left */}
              <span className="absolute inset-0 w-0 bg-[#f9cf01] transition-all duration-300 ease-out group-hover:w-full"></span>
              
              {/* Button text and arrow */}
              <span className="relative flex items-center justify-center group-hover:gap-2 text-sm font-semibold text-white transition-all duration-500 group-hover:text-black">
                Join Kayapalat
                <ArrowRight className="h-4 w-4 w-0 opacity-0 -translate-x-4 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-8 w-8" aria-hidden="true" />
              ) : (
                <Menu className="block h-8 w-8" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 left-0 h-screen w-full ${bgColor} transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden z-40`}
      >
        <div className="flex justify-between items-center h-20 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform rotate-45"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
            </svg>
            <span className="font-bold text-2xl tracking-widest uppercase">
              Kayapalat
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white hover:text-gray-300 focus:outline-none"
          >
            <X className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col items-center justify-center space-y-6 pt-12 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-8">
            <button className="rounded-full border border-white px-8 py-3 text-white transition-colors duration-300 hover:bg-white hover:text-[#053254]">
              Join Kayapalat
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}