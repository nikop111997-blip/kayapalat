import { Geist, Geist_Mono, Manrope, Montserrat } from "next/font/google";
import "./globals.css";

import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/component/CookieConsent";
import AnalyticsScripts from "@/component/AnalyticsScripts";
import GoogleTranslate from "@/component/GoogleTranslate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Kayapalat Wellness",
  description:
    "Transform your well-being with Kayapalat Wellness - Your ultimate destination for holistic health solutions.",
  verification: {
    google: "JHwZTFGpNjsXmKKQM7xa6hQoTMstdNrwMG1VxjiO-z0",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.kayapalat.in/#organization",
  name: "Kayapalat",
  url: "https://www.kayapalat.in",
  logo: {
    "@type": "ImageObject",
    url: "https://www.kayapalat.in/logo.png",
  },
  sameAs: [
    "https://www.instagram.com/kayapalat",
    "https://www.facebook.com/kayapalat",
    "https://www.youtube.com/@kayapalat",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">

        {/* Website only */}
        <div className="print:hidden">
          <GoogleTranslate />
          <Toaster />
          <Navbar />
        </div>

        {children}

        {/* Website only */}
        <div className="print:hidden">
          <AnalyticsScripts />
          <CookieConsent />
          <Footer />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}