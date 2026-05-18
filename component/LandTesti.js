"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    quote: '"Losing 24 kilos post-pregnancy with Kayapalat gave me back my energy and confidence, all while staying home and caring for my little one."',
    name: 'Shradha Rastogi, 32',
    role: 'Homemaker, Prayagraj',
    image: 'https://framerusercontent.com/images/tuOOPqYWe0PN4lzLpZbatG64qQ.jpg?width=120&height=120', 
  },
  {
    id: 2,
    quote: '"With Kayapalat, I lost 23 kilos and 28 inches, something I never thought possible. Now I feel lighter, sharper, and more confident than ever."',
    name: 'Asha Bangera, 57',
    role: 'Professional, Mumbai',
    image: 'https://framerusercontent.com/images/6gBbPzztaRoGcPnjVZHOQJd3uU.jpg?width=120&height=120',
  },
  {
    id: 3,
    quote: '"With Kayapalat, I shed 14 kilos and 21 inches, gained strength, ran a half-marathon, and with Dipti losing 8 kilos, we live healthier together."',
    name: 'CP Singh, 35',
    role: 'Businessmen, Varanasi',
    image: 'https://framerusercontent.com/images/Blpx70ptKQEvNoJzQy3CcJW6r70.jpg?width=120&height=120',
  },
  {
    id: 4,
    quote: '"I tried countless fad diets, but Kayapalat changed the game. I dropped 15 kilos and actually reversed my pre-diabetes in just 6 months!"',
    name: 'Rahul Sharma, 42',
    role: 'Software Engineer, Pune',
    image: 'https://framerusercontent.com/images/tuOOPqYWe0PN4lzLpZbatG64qQ.jpg?width=120&height=120',
  },
  {
    id: 5,
    quote: '"The customized meal plans were effortless to follow. I lost 12 kilos without ever feeling starved. Highly recommend it to all busy moms."',
    name: 'Priya Desai, 38',
    role: 'Teacher, Ahmedabad',
    image: 'https://framerusercontent.com/images/6gBbPzztaRoGcPnjVZHOQJd3uU.jpg?width=120&height=120',
  },
  {
    id: 6,
    quote: '"A phenomenal transformation! Not only did I lose 18 kilos, but my joint pain has completely disappeared. I feel 10 years younger today."',
    name: 'Anil Kapoor, 50',
    role: 'Bank Manager, Delhi',
    image: 'https://framerusercontent.com/images/Blpx70ptKQEvNoJzQy3CcJW6r70.jpg?width=120&height=120',
  },
];

export default function LandTestimonial() {
  // Duplicating the array ensures a seamless, infinite loop for the slider
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section className="w-full bg-[#FAF9F6] px-4 py-10 lg:py-8 font-manrope sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Section Heading */}
        <h2 className="mb-6 lg:mb-12 text-center text-[24px] font-bold tracking-tight text-black md:text-[28px]">
          Real People.<br className='block sm:hidden' /> Real Results.<br className='block sm:hidden' /> No False Promises.
        </h2>

        {/* Auto-Running Slider */}
        <div className="flex w-full overflow-hidden mask-image-fade">
          <motion.div
            className="flex gap-12 md:gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 115, // Adjust this value to make the slider faster or slower
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                // Using index in key because of duplicated items
                key={`${testimonial.id}-${index}`} 
                className="flex w-[300px] shrink-0 flex-col items-center md:w-[350px]"
              >
                
                {/* Quote Text */}
                <p className="mb-4 text-center text-[15px] font-semibold leading-[1.6] text-gray-500 whitespace-normal">
                  {testimonial.quote}
                </p>
                
                {/* Author Info */}
                <div className="mt-auto flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[15px] font-bold text-black whitespace-nowrap">
                      {testimonial.name}
                    </h4>
                    <p className="text-[13px] font-medium text-gray-900 whitespace-nowrap">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>
        <div className='flex items-center justify-center mt-8'>
            <Link href={"#transformations"} className='bg-black rounded-full text-white px-8 py-3 flex items-center gap-3 justify-center'>See the Transformation Journey <ArrowRight className='h-4 w-4 mt-1'/></Link>
            </div>
      </div>
    </section>
  );
}