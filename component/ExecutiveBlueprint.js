

const articles = [
  {
    id: 1,
    tag: 'Nutrition',
    title: 'The Biggest Lie the Fitness Industry Sold You About Exercise',
    description: 'Discover why the common belief that "exercise is the key to weight loss" is misleading, and learn how metabolic health and nutrition play a far more critical role in achieving sustainable fitness results.',
    // Replace with your actual image paths
    imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    tag: 'Performance',
    title: 'Food Is Not the Problem. Your Relationship With Food Is..',
    description: 'Uncover the psychological and emotional factors that drive unhealthy eating habits, and learn how to cultivate a positive relationship with food that supports long-term health and performance goals.',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    tag: 'Lifestyle',
    title: 'Why Counting Calories Is Like Counting Bricks Instead of Building a House',
    description: 'Explore why focusing solely on calorie counting is an oversimplified approach to health and fitness, and how building a strong foundation of metabolic health, nutrient quality, and lifestyle habits is essential for true transformation.',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

export default function ExecutiveBlueprint() {
  return (
    <section className="bg-[#FAF9F6] py-8 px-4 md:px-8 font-manrope">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4 tracking-tight">
            The Executive Blueprint: Insights<br className="hidden md:block" /> on Longevity & Performance.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed font-semibold">
            Expert perspectives on metabolic health, psychological resilience,<br className="hidden md:block" /> and the clinical science of sustainable high-performance living.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="relative w-full h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#FFD600] text-gray-900 text-xs font-semibold rounded-sm mb-4">
                    {article.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-snug pr-4">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-300 pr-2 line-clamp-3">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}