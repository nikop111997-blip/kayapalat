import FaqSectionServer from "@/component/FaqSection";
import IBW from "@/component/IBWA";
import PlaylistGallery from "@/component/PlaylistGallery";
import TestimonialGrid from "@/component/PricingTestiGrid";
import TestimonialPageSection from "@/component/TestimonialPageSection";
import WeightVideoGallery from "@/component/WeightVideoGallery";
import WhatsAppTestimonials from "@/component/WhatsAppTestimonials";
export const metadata = {
  title:
    "Transformation Stories | Real Fitness & Lifestyle Success Stories - Kayapalat",

  description:
    "Discover inspiring transformation journeys from people who achieved remarkable fat loss, muscle gain, improved health, and lifestyle changes with Kayapalat's expert coaching and guidance.",

  keywords: [
    "fitness transformation stories",
    "body transformation",
    "weight loss success stories",
    "before and after transformation",
    "fitness journey",
    "Kayapalat transformations",
    "fat loss results",
    "muscle gain transformation",
    "real client success stories",
    "health transformation",
    "lifestyle transformation",
    "Ajay Sethi transformation",
    "fitness coaching results",
    "wellness success stories",
  ],

  authors: [
    {
      name: "Kayapalat",
      url: "https://www.kayapalat.in",
    },
  ],

  creator: "Kayapalat",

  publisher: "Kayapalat",

  metadataBase: new URL("https://www.kayapalat.in"),

  alternates: {
    canonical: "/transformation",
  },

  openGraph: {
    title:
      "Transformation Stories | Real Fitness & Lifestyle Success Stories - Kayapalat",

    description:
      "Explore inspiring transformation stories and real results from individuals who changed their lives through fitness, nutrition, and disciplined lifestyle habits.",

    url: "https://www.kayapalat.in/transformation",

    siteName: "Kayapalat",

    images: [
      {
        url: "/transformation-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kayapalat Transformation Stories",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Transformation Stories | Real Fitness & Lifestyle Success Stories - Kayapalat",

    description:
      "See how real people transformed their health, fitness, confidence, and lifestyle with Kayapalat.",

    images: [
      "https://www.kayapalat.in/transformation-og.webp",
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Health & Fitness",
};
export default function Page(){
    return(
        <div className="bg-[#FAF9F6]">
        <TestimonialPageSection />
        <IBW />
        <WeightVideoGallery />
        <PlaylistGallery />
        <WhatsAppTestimonials />
        <TestimonialGrid />
        <FaqSectionServer />
        </div>
    )
}