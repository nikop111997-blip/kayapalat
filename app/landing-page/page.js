import AboutFounder from "@/component/AboutFounder";
import TestimonialGrid from "@/component/AnimateTesti";
import ExperienceDifference from "@/component/Experience";
import ExploreEvents from "@/component/ExploreEvents";
import FaqSectionServer from "@/component/FaqSection";
import Testimonials from "@/component/FeTesti";
import HowItWorks from "@/component/HowItWorks";
import LandEaml from "@/component/LadningPageSc";
import HeroSection from "@/component/LandHero";
import PricingPlans from "@/component/LandPrice";
import LandTestimonial from "@/component/LandTesti";
import LegacySection from "@/component/LegacyStats";
import StruggleSection from "@/component/Struggle2";
import StrugglesSection from "@/component/StrugglesSection";
import Timeline from "@/component/Timeline";
import Image from "next/image";
export const metadata = {
  title: "Kayapalat - Transform Your Health, Transform Your Life",

  description:
    "Discover the power of personalized health coaching with Kayapalat. Our expert coaches guide you through a transformative journey to achieve your wellness goals through fitness, nutrition, mindset, and sustainable lifestyle transformation.",

  keywords: [
    "Kayapalat",
    "fitness transformation",
    "health coaching",
    "fat loss",
    "muscle building",
    "nutrition coaching",
    "wellness program",
    "Ajay Sethi",
    "fitness coach India",
    "online fitness coaching",
    "mindset coaching",
    "healthy lifestyle",
    "body transformation",
    "weight loss program",
  ],

  authors: [
    {
      name: "Kayapalat",
      url: "https://kayapalat.in/",
    },
  ],

  creator: "Kayapalat",

  publisher: "Kayapalat",

  metadataBase: new URL("https://kayapalat.in/"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Kayapalat - Transform Your Health, Transform Your Life",

    description:
      "Join Kayapalat and unlock your best self with expert fitness, nutrition, and lifestyle coaching tailored for sustainable transformation.",

    url: "https://kayapalat.in/",

    siteName: "Kayapalat",

    images: [
      {
        url: "https://kayakalap.vercel.app/_next/image?url=%2Flogo.avif&w=384&q=75",
        width: 1200,
        height: 630,
        alt: "Kayapalat - Transform Your Health, Transform Your Life",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Kayapalat - Transform Your Health, Transform Your Life",

    description:
      "Experience personalized fitness, nutrition, and mindset coaching with Kayapalat.",

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
export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <LegacySection />
      <LandTestimonial/>
      <StrugglesSection />
      <StruggleSection landing={true} />
      <Timeline />
      <AboutFounder landing={true} />
      <TestimonialGrid />
      <HowItWorks />
      <ExperienceDifference landing={true} />
      <PricingPlans />
      <ExploreEvents />
      <LandEaml />
      <FaqSectionServer landing={true} />
    </div>
  );
}
