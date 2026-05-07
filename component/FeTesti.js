import React from 'react';
import Image from 'next/image';

const testimonialsData = [
  {
    id: 1,
    quote: '"Losing 24 kilos post-pregnancy with Kayapalat gave me back my energy and confidence, all while staying home and caring for my little one."',
    name: 'Shradha Rastogi, 32',
    role: 'Homemaker, Prayagraj',
    // Replace with your actual image path
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
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#FAF9F6] px-4 py-10 lg:py-8 font-manrope sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Section Heading */}
        <h2 className="mb-6 lg:mb-12 text-center text-[24px] font-bold tracking-tight text-black md:text-[28px]">
          Real People.<br className='block sm:hidden' /> Real Results.<br className='block sm:hidden' /> No False Promises.
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col items-center">
              
              {/* Quote Text */}
              <p className="mb-4 text-center text-[15px] font-semibold leading-[1.6] text-gray-500">
                {testimonial.quote}
              </p>
              
              {/* Author Info */}
              <div className="mt-auto flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-[15px] font-bold text-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-[13px] font-medium text-gray-900">
                    {testimonial.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}