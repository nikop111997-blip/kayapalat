import React from 'react';

// Placeholder data - replace the URLs with the actual paths to your screenshots
const testimonialImages = [
  { id: 1, src: 'https://framerusercontent.com/images/g5HIq602tkfQCLGFMcmFRp671U.jpg?width=304&height=365', alt: 'Client testimonial from Poonam' },
  { id: 2, src: 'https://framerusercontent.com/images/Ad7LMU8G5y6jOtFhkfHsDF3DSw.jpg?width=340&height=250', alt: 'Client testimonial from Preeti' },
  { id: 3, src: 'https://framerusercontent.com/images/SsiP1bWeMJ4nvClXc64nvYg.jpg?width=309&height=276', alt: 'Client testimonial from Priya' },
  { id: 4, src: 'https://framerusercontent.com/images/h4V0dvcEJ5IykjdHLrWSd1Pw4.jpg?width=318&height=256', alt: 'Client testimonial from Crew' },
  { id: 5, src: 'https://framerusercontent.com/images/x7hvTLgy11Lv3fvTm6VoybhW8U.jpg?width=318&height=348', alt: 'Client testimonial from Manjari' },
  { id: 6, src: 'https://framerusercontent.com/images/ra3BUwNIit1p5NDM8cOj94qd3s.jpg?scale-down-to=1024&width=879&height=1600', alt: 'Client testimonial from Harishankar' },
  { id: 7, src: 'https://framerusercontent.com/images/Iy7vsYrKsugfreeUk1OTUMYDfrs.jpg?width=285&height=195', alt: 'Client testimonial from Asha' },
  { id: 8, src: 'https://framerusercontent.com/images/rqPWWagtgefaXEhQrFgLhrxC5g.jpg?scale-down-to=1024&width=922&height=1280', alt: 'Client testimonial from Seema' },
    { id: 9, src: 'https://framerusercontent.com/images/7BSiYFuW1OiYrgyYbuPjp91hNME.jpg?width=326&height=164', alt: 'Client testimonial from Anju' },
    { id: 10, src: 'https://framerusercontent.com/images/5rWJR2eEE7AWOTkNcPqtDETmec.jpg?scale-down-to=1024&width=752&height=1280', alt: 'Client testimonial from Dr Gaveshna' },
    { id: 11, src: 'https://framerusercontent.com/images/7BSiYFuW1OiYrgyYbuPjp91hNME.jpg?width=326&height=164', alt: 'Client testimonial from Poonam' },
  { id: 12, src: 'https://framerusercontent.com/images/2NPpMlHbUFhAau1lEAmkSUFUvo.jpg?width=338&height=139', alt: 'Client testimonial from Preeti' },
  { id: 13, src: 'https://framerusercontent.com/images/NeWpdupxIXQe30UScoJa8l0Jyg8.jpg?width=916&height=661', alt: 'Client testimonial from Priya' },
  { id: 14, src: 'https://framerusercontent.com/images/OktagNKbRxdQoqqPhgEZROeaSM.jpg?width=312&height=271', alt: 'Client testimonial from Crew' },
  { id: 15, src: 'https://framerusercontent.com/images/SLBsA0LGcclhZdGQBdgHzd2INM.jpg?width=284&height=153', alt: 'Client testimonial from Manjari' },
  { id: 16, src: 'https://framerusercontent.com/images/Yvfp9R5WoiLBGZR5TMN8mkR0qBU.jpg?width=746&height=1600', alt: 'Client testimonial from Harishankar' },
  { id: 17, src: 'https://framerusercontent.com/images/14IZRgZBDYcGuSfugZFYua5k3fE.jpg?scale-down-to=1024&width=1280&height=1036', alt: 'Client testimonial from Asha' },
  { id: 18, src: 'https://framerusercontent.com/images/rqPWWagtgefaXEhQrFgLhrxC5g.jpg?scale-down-to=1024&width=922&height=1280', alt: 'Client testimonial from Seema' },
    { id: 19, src: 'https://framerusercontent.com/images/oG3RW5fqYw0Qi9NLmIjHV8YSohk.jpg?scale-down-to=1024&width=1040&height=7854', alt: 'Client testimonial from Anju' },
    { id: 20, src: 'https://framerusercontent.com/images/Yvfp9R5WoiLBGZR5TMN8mkR0qBU.jpg?width=746&height=1600', alt: 'Client testimonial from Dr Gaveshna' },
    { id: 21, src: 'https://framerusercontent.com/images/SpwcfsY2z37x8jMH62kuuCLds0.jpg?width=798&height=1600', alt: 'Client testimonial from Manjari' },
  { id: 22, src: 'https://framerusercontent.com/images/SjO7xng6VND8tg7X4PlMwIOjZP4.jpg?scale-down-to=1024&width=1080&height=854', alt: 'Client testimonial from Harishankar' },
  { id: 23, src: 'https://framerusercontent.com/images/hVhU3b7uACHMYkkzPdGEI3Lvng.jpg?width=519&height=1280', alt: 'Client testimonial from Asha' },
  { id: 24, src: 'https://framerusercontent.com/images/DMuWvsyXWrGwI9PEZpPOYGZuhhg.jpg?scale-down-to=1024&width=1080&height=379', alt: 'Client testimonial from Seema' },
    { id: 25, src: 'https://framerusercontent.com/images/gt2MZuAvYUl3O2HIamItfLxIhDE.jpg?scale-down-to=1024&width=1080&height=851', alt: 'Client testimonial from Anju' },
    { id: 26, src: 'https://framerusercontent.com/images/XyqgwkTrdeCOjBzgrtn2hj530.jpg?scale-down-to=1024&width=1080&height=1280', alt: 'Client testimonial from Dr Gaveshna' }
];

export default function ResultsSection() {
  return (
    <section className="bg-[#FAF8F5] py-20 px-4 md:px-8 font-manrope">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight z-10 relative">
              Our Results Speak for Themselves!
            </h2>
            {/* Yellow sketch underline effect */}
            <svg 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[80%] h-3 text-yellow-400 -z-0" 
              viewBox="0 0 200 9" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path 
                d="M2.00016 6.5C38.0002 2.5 131.5 -1.5 198 6.5" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="opacity-80"
              />
            </svg>
          </div>
        </div>

        {/* Masonry Grid Setup using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {testimonialImages.map((image) => (
            <div 
              key={image.id} 
              className="break-inside-avoid shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden bg-gray-900"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}