import BookingComponent from "./Booking2Comp";


const faqs = [
  {
    question: "I've tried so many things before. How is Kayapalat different?",
    answer: "Most programs only focus on one thing, diet or exercise. At Kayapalat, we combine three pillars of transformation: body (food & movement), physiology (metabolism & hormones), and emotions (mindset & stress). This inside-out approach is what makes results sustainable, not temporary."
  },
  {
    question: "Do I need to go to a gym or buy equipment?",
    answer: "Not at all! Kayapalat is designed to be 100% home-friendly. Whether you’re a new mom, a busy professional, or someone who hates the gym you’ll be able to follow our plan with ease."
  },
  {
    question: "I'm too busy / too old / too unfit. Will this really work for me?",
    answer: "Absolutely. We have helped members from 12 to 90 years old and include busy executives, businessmen, homemakers, and grandparents. The program adapts to your lifestyle and priorities, not the other way around."
  },
  {
    question: "Is this just another weight loss program?",
    answer: "No. Weight loss is only one part of the journey. Our focus is on helping you gain energy, confidence, and emotional wellness. The kilos you lose are just proof of the lifestyle shift you’ve created."
  },
  {
    question: "Do I need to follow strict diets or give up my favorite food?",
    answer: "Never. At Kayapalat, we don’t believe in crash diets or restrictions. We teach you balanced, flexible nutrition, so you can enjoy food, family meals, and festivals without guilt."
  },
  {
    question: "Will I have someone to guide me every day?",
    answer: "Yes. You’ll have live coaching, daily accountability, and community support. You’re never left on your own,  your coach checks in, answers questions, and ensures you stay on track."
  },
  {
    question: "How soon will I see results?",
    answer: "Most members feel lighter and more energetic within the first 7 days. Visible changes usually show in 3 weeks, and lasting transformation builds over 90 days and beyond."
  },
  {
    question: "How much does Kayapalat cost?",
    answer: "Kayapalat is not a one-size-fits-all. The cost depends on your goals and the plan you choose. We’ve designed it to be accessible for anyone who sees health as an investment, not a cost. With 10,000+ members served, most say it’s the best investment they’ve ever made."
  },
  {
    question: "How do I know this is worth it?",
    answer: "Over 97% of our members report positive results. Most realize the real waste was the time, money, and energy spent on things that didn’t work. At Kayapalat, you don’t just lose kilos, you gain energy, confidence, and health that uplift your family, work, and everyday life. That’s the true value."
  }
];

export default function FaqSectionServer({landing=false}) {
  return (
    <section id="faq" className="bg-[#FAF8F5] py-10 px-4 md:px-8 font-manrope">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Area */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-white border border-gray-200 text-gray-500 text-xs font-medium rounded-full mb-6 shadow-sm">
            FAQs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Got questions?
          </h2>
          <p className="text-gray-500 md:text-lg max-w-3xl mx-auto leading-relaxed font-semibold">
            You're not alone. Our members asked them too.<br className="hidden md:block" />
            Here are the answers that helped thousands take their first step and stay on track.
          </p>
        </div>

        {/* FAQ Accordion Card */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className={`group border-b border-gray-200 last:border-b-0 ${index !== 0 ? 'mt-2' : ''}`}
            >
              <summary className="w-full py-4 flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                <span className="text-gray-800 font-medium pr-6 group-hover:text-black transition-colors">
                  {faq.question}
                </span>
                
                {/* The +/- Icon Toggle using Tailwind's group-open */}
                <span className="text-gray-400 font-light text-2xl group-hover:text-gray-600 transition-colors relative w-6 h-6 flex items-center justify-center">
                  <span className="absolute group-open:opacity-0 transition-opacity duration-200">+</span>
                  <span className="absolute opacity-0 group-open:opacity-100 transition-opacity duration-200">−</span>
                </span>
              </summary>
              
              {/* Answer Content */}
              <div className="pb-5 pt-1 text-gray-600 text-sm md:text-base pr-8">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Footer Area */}
        <div className="mt-12 text-center">
          <p className="text-gray-900 font-semibold text-sm md:text-base leading-relaxed">
            Your doubts are natural; every member once had them, too. The difference is, they chose to start. <br className="hidden md:block" />
            Now it's your turn to transform.
          </p>
        </div>
          <div className="flex items-center justify-center my-8">
            <BookingComponent />
          </div>
      </div>
    </section>
  );
}