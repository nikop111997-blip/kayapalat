import ExperienceDifference from "@/component/Experience";
import FaqSectionServer from "@/component/FaqSection";
import Testimonials from "@/component/FeTesti";
import PricingPlans from "@/component/PricingPlans";
import TestimonialGrid from "@/component/PricingTestiGrid";
import ResultsSection from "@/component/ResultsSection";
export const metadata = {
  title:
    "Pricing Plans | Kayapalat - Choose Your Transformation Program",

  description:
    "Explore Kayapalat pricing plans designed for fat loss, muscle building, fitness transformation, and sustainable lifestyle coaching. Choose the perfect program to begin your health journey today.",

  keywords: [
    "Kayapalat pricing",
    "fitness coaching plans",
    "online fitness program",
    "weight loss plans",
    "body transformation pricing",
    "nutrition coaching plans",
    "muscle building program",
    "fat loss coaching",
    "Ajay Sethi pricing",
    "fitness membership India",
    "wellness coaching",
    "health transformation program",
  ],

  authors: [
    {
      name: "Kayapalat",
      url: "https://kayapalat.in",
    },
  ],

  creator: "Kayapalat",

  publisher: "Kayapalat",

  metadataBase: new URL("https://kayapalat.in"),

  alternates: {
    canonical: "/pricing",
  },

  openGraph: {
    title:
      "Pricing Plans | Kayapalat - Choose Your Transformation Program",

    description:
      "Compare Kayapalat transformation plans and start your fitness, nutrition, and lifestyle journey with expert guidance.",

    url: "https://kayapalat.in/pricing",

    siteName: "Kayapalat",

    images: [
      {
        url: "/pricing-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kayapalat Pricing Plans",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Pricing Plans | Kayapalat - Choose Your Transformation Program",

    description:
      "Explore flexible transformation plans for fitness, nutrition, and wellness coaching with Kayapalat.",

    images: ["https://kayakalap.vercel.app/_next/image?url=%2Flogo.avif&w=384&q=75"],
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
export default function Pricing() {
  return (
    <div className=" bg-[#FAF9F6] font-manrope">
      <PricingPlans />
      <Testimonials />
      <TestimonialGrid />
      <ExperienceDifference />
      <ResultsSection />
      <FaqSectionServer />
    </div>
  );
}