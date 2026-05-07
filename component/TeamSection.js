import React from 'react';

const teamMembers = [
  {
    id: 1,
    quote: '"Prashant Singh Rajput is a Transformation Specialist with Kayapalat. A former aspiring actor turned Wellness Coach, he has personally guided thousands of people get into the best shape of their lives. He has a unique ability to turn most challenging situations into fun-to-follow steps, helping client progress to the next level."',
    name: 'Prashant Singh Rajput',
    title: 'Kayapalat Coach',
    // Replace with your actual image path
    imageUrl: 'https://framerusercontent.com/images/lazAjJGj8ZJDGw8XVcOZU6laU.jpg?width=250&height=280' 
  },
  {
    id: 2,
    quote: '"Amrish Bhatnagar is an accomplished professional and Kayapalat Coach with over 28 years of corporate experience. Today, he leverages his extensive background to guide individuals toward deep inner transformations. He is a devoted husband, proud father, and firm believer that if we focus on getting better at something we actually get better."',
    name: 'Amrish Bhatanagar',
    title: 'Kayapalat Coach',
    imageUrl: 'https://framerusercontent.com/images/jGNbosnE05YuMUAcYCXijuxLaw.jpg?width=250&height=280'
  },
  {
    id: 3,
    quote: '"Dr. Deeksha is a proud Kayapalat Coach who exemplifies the power of transformation. She turned her personal health crisis into a blueprint for success. She walks the talk, having shed a phenomenal 22 kg, dropped to a vibrant M size from XXL, and getting rid from all her chronic health issues. She is on a mission to empower 5,000 mothers to reclaim their strength, health, and confidence through Kayapalat approach."',
    name: 'Dr. Deeksha Mishra',
    title: 'Kayapalat Coach',
    imageUrl: 'https://framerusercontent.com/images/2HGrPOzRjOaFyToEYSy0HWGVxE.jpg?width=250&height=280'
  }
];

export default function TeamSection() {
  return (
    <section className="bg-[#FAF8F5] py-20 px-4 md:px-8 font-manrope">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header Area */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-white border border-gray-200 text-gray-500 text-xs font-medium rounded-full mb-6 shadow-sm">
            Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Meet the team
          </h2>
        </div>

        {/* Team Cards Container */}
        <div className="flex flex-col space-y-6">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-3xl p-5 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start shadow-sm"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="w-full aspect-[4/5] md:w-[260px] md:h-[260px] rounded-2xl overflow-hidden bg-gray-100">
                  {/* Note: Swap <img> for next/image <Image /> in production */}
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center h-full md:py-4 text-center md:text-left">
                <p className="text-[#333333] text-[16px] md:text-[20px] leading-relaxed mb-8 font-medium md:font-semibold">
                  {member.quote}
                </p>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-sm font-medium text-gray-500">
                    {member.title}
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