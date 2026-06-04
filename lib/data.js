export const FAQS = [
  { question: "How long does one KP Journal last?", answer: "Each KP Journal is designed to last for a full quarter (90 days) of daily use. We recommend the 4-pack bundle for a complete year of discipline." },
  { question: "Is this suitable for beginners?", answer: "Absolutely. The framework is built to guide you step-by-step. You don't need prior journaling experience, just the commitment to spend 5 minutes every morning and evening." },
  { question: "When will I receive my order?", answer: "We process all orders within 24 hours. Standard delivery takes 3-5 business days across India." },
  { question: "What is the return policy?", answer: "We offer a 7-day money-back guarantee if the journal arrives damaged. Due to the nature of the product, we cannot accept returns on used journals." }
];

export const TESTIMONIALS = [
  { name: "Rahul Sharma", role: "Entrepreneur", text: "The 6 AM - 9 PM schedule blocking completely changed how I run my startup. I'm getting more done in less time." },
  { name: "Priya Desai", role: "Fitness Coach", text: "I recommend the KP Journal to all my clients. The daily gratitude and 'Top 3 Priorities' sections are game-changers for mental health." },
  { name: "Amit Kumar", role: "Software Engineer", text: "Premium quality paper and binding. But more importantly, the system by Ajay Sethi actually works. Highly recommended." }
];

export const BUNDLES = [
{
      id: 'bundle-1',
      name: 'Starter Bundle',
      desc: 'Perfect to start your journey.',
      badge: 'Standard',
      price: 899,
      originalPrice: 1499,
      savings: 'Save ₹500',
      popular: false,
      features: [
        'Premium Hardcover Binding',
        'Undated 90-Day Layout',
        'Daily & Weekly Reviews',
        'Free Shipping in India',
      ],
    },
    {
      id: 'bundle-2',
      name: 'Discipline Mastery',
      desc: 'Commit to a full year of growth.',
      badge: 'Most Popular',
      price: 1599,
      originalPrice: 2699,
      savings: 'Save ₹2500',
      popular: true, // This triggers the gradient highlight
      features: [
        '2x Premium Hardcover Journals',
        'Undated 90-Day Layout',
        'Daily & Weekly Reviews',
        'Free Shipping in India',
        'Full Year Supply (2 Books)',
      ],
    },
    {
      id: 'bundle-3',
      name: 'Mentorship Bundle',
      desc: 'Personalized guidance + journal.',
      badge: 'Limited Slots',
      price: 1999,
      originalPrice: 3999,
      savings: 'Save ₹2000',
      popular: false,
      features: [
        'Premium Hardcover Binding',
        'Undated 90-Day Layout',
        'Daily & Weekly Reviews',
        'Free Shipping in India',
        '60 min call with Ajay Sethi Sir',
      ],
    },
];