
import AboutFounder from "@/component/AboutFounder";
import CorePrinciplesSection from "@/component/CorePrinciplesSection";
import CoreValuesSection from "@/component/CoreValuesSection";
import FaqSectionServer from "@/component/FaqSection";
import TeamSection from "@/component/TeamSection";
export const metadata = {
  title:
    "About Us | Kayapalat - India's Fitness & Lifestyle Transformation Community",

  description:
    "Learn about Kayapalat, our mission, and the vision behind helping people transform their fitness, mindset, nutrition, and lifestyle through sustainable coaching and real-world strategies.",

  keywords: [
    "About Kayapalat",
    "fitness transformation India",
    "Ajay Sethi",
    "fitness coach",
    "health coaching",
    "wellness community",
    "online fitness coach India",
    "body transformation",
    "nutrition coaching",
    "mindset coaching",
    "healthy lifestyle",
    "fat loss coaching",
    "muscle building",
    "fitness community",
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
    canonical: "/about",
  },

  openGraph: {
    title:
      "About Us | Kayapalat - India's Fitness & Lifestyle Transformation Community",

    description:
      "Discover the story, mission, and coaching philosophy behind Kayapalat and how we help people achieve sustainable transformation.",

    url: "https://kayapalat.in/about",

    siteName: "Kayapalat",

    images: [
      {
        url: "/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About Kayapalat",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "About Us | Kayapalat - India's Fitness & Lifestyle Transformation Community",

    description:
      "Learn more about Kayapalat and our mission to transform lives through fitness, nutrition, and mindset coaching.",

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
export default function About(){
    return(
        <div className="bg-[#FAF9F6] font-manrope">
            <CorePrinciplesSection />
           <AboutFounder />
           <TeamSection />
           <CoreValuesSection />
            <FaqSectionServer />
        </div>
    )
}