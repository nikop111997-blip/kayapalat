import KPJournalLanding from "./Journal";
import Testimonials from '@/component/Testimonials';
import AboutAuthor from '@/component/Author';
import FAQ from '@/component/FAQs';

export const metadata = {
  title:
    "KP Journal by Ajay Sethi | Daily Discipline Planner for Focus, Growth & Productivity",

  description:
    "Transform your daily habits with the KP Journal by Ajay Sethi. A premium daily discipline system featuring time-blocking, top priorities, gratitude, reflection, and habit tracking. Trusted by 10,000+ users across India.",

  keywords: [
    "KP Journal",
    "Ajay Sethi",
    "Daily Planner",
    "Productivity Journal",
    "Discipline Journal",
    "Time Blocking Planner",
    "Goal Setting Journal",
    "Gratitude Journal",
    "Habit Tracker",
    "Self Improvement Journal",
    "Personal Growth",
    "Success Planner",
    "Wellness Journal",
    "Kayapalat Journal",
    "Daily Reflection Journal",
  ],

  metadataBase: new URL("https://www.kayapalat.in"),

  alternates: {
    canonical: "https://www.kayapalat.in/journal",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "KP Journal by Ajay Sethi | Your Daily Discipline System",
    description:
      "Build discipline, stay consistent, and transform daily. The KP Journal combines planning, productivity, gratitude, and reflection into one powerful daily system.",

    url: "https://www.kayapalat.in/journal",

    siteName: "Kayapalat",

    type: "website",

    locale: "en_IN",

    images: [
      {
        url: "https://www.kayapalat.in/journal.jpeg",
        width: 1200,
        height: 630,
        alt: "KP Journal by Ajay Sethi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "KP Journal by Ajay Sethi | Daily Discipline Planner",
    description:
      "A premium productivity and discipline journal designed to help you execute, reflect and grow every day.",

    images: [
      "https://www.kayapalat.in/journal.jpeg",
    ],
  },

  authors: [
    {
      name: "Ajay Sethi",
      url: "https://www.kayapalat.in",
    },
  ],

  creator: "Ajay Sethi",

  publisher: "Kayapalat",

  category: "Productivity",

  other: {
    "product:name": "KP Journal",
    "product:brand": "Kayapalat",
    "product:availability": "in stock",
  },
};

export default function Page(){
    const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "KP Journal",
  image: [
    "https://www.kayapalat.in/journal.jpeg"
  ],
  description:
    "Premium daily discipline journal created by Ajay Sethi featuring time blocking, gratitude, reflection, goal setting and habit tracking.",
  brand: {
    "@type": "Brand",
    name: "Kayapalat"
  },
  manufacturer: {
    "@type": "Organization",
    name: "Kayapalat"
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: "899",
    availability: "https://schema.org/InStock",
    url: "https://www.kayapalat.in/journal"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "10000"
  }
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does one KP Journal last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each KP Journal is designed to last for approximately 90 days of daily use. For a complete year of planning and reflection, we recommend purchasing multiple journals or the Discipline Mastery bundle."
      }
    },
    {
      "@type": "Question",
      "name": "Is the KP Journal suitable for beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The KP Journal is designed for both beginners and experienced planners. Its structured daily planning, gratitude, reflection, and habit tracking system makes it easy to build discipline and consistency from day one."
      }
    },
    {
      "@type": "Question",
      "name": "When will I receive my order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orders are typically processed within 24 to 48 hours and delivered across India within 3 to 7 business days depending on your location."
      }
    },
    {
      "@type": "Question",
      "name": "What is the return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your journal arrives damaged or defective, please contact our support team within the specified return period. We will assist with a replacement or resolution according to our return policy."
      }
    },
    {
      "@type": "Question",
      "name": "What makes the KP Journal different from other planners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The KP Journal combines time-blocking, top priorities, daily reflection, gratitude practice, and habit-building into one integrated system developed by wellness coach Ajay Sethi to help users stay disciplined and achieve meaningful personal growth."
      }
    }
  ]
};
    return(
        <>
        <KPJournalLanding/>
         <Testimonials />
              <AboutAuthor />
              <FAQ />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(productSchema),
  }}
/>
<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqSchema),
    }}
  />
        </>
    )
}