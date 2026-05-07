import { 
  BookOpen, 
  Focus, 
  Flame, 
  Lock, 
  Heart, 
  Accessibility, 
  Handshake, 
  LayoutGrid, 
  PartyPopper 
} from 'lucide-react';

const coreValues = [
  {
    icon: BookOpen,
    title: 'Curiosity',
    description: 'Stay endlessly curious. Ask, explore, and grow in every moment of life.'
  },
  {
    icon: Focus,
    title: 'Clarity',
    description: 'See things clearly. Lead with honesty & intent; clarity drives right action.'
  },
  {
    icon: Flame,
    title: 'Courage',
    description: 'Choose courage over comfort. Embrace resistance and rise through it.'
  },
  {
    icon: Lock,
    title: 'Commitment',
    description: 'We never leave anyone behind; show up, stand tall, and go the distance.'
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Lead with kindness. Be present, gentle, and patient with others.'
  },
  {
    icon: Accessibility,
    title: 'Connection',
    description: 'Build meaningful connections by seeing, hearing, and valuing others deeply.'
  },
  {
    icon: Handshake,
    title: 'Contribution',
    description: 'Make every action a contribution. Always give more than expected.'
  },
  {
    icon: LayoutGrid,
    title: 'Community',
    description: 'We rise together. Our strength is shared by each person and the community.'
  },
  {
    icon: PartyPopper,
    title: 'Celebration',
    description: 'We celebrate every step; wellness is a joyful celebration of life not struggle.'
  }
];

export default function CoreValuesSection() {
  return (
    <section className="bg-[#FAF8F5] py-10 px-4 md:px-8 font-manrope">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-block px-5 py-1.5 font-semibold bg-white border border-gray-200 text-gray-500 text-sm font-medium rounded-full mb-6 shadow-sm">
            Our Values
          </span>
          <h2 className="text-3xl md:text-[48px] font-bold text-gray-900 leading-tight max-w-3xl tracking-tight">
            The core values that define who we are and how we show up every day at Kayapalat
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-[22px] font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed font-semibold">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}