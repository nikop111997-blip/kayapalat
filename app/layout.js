import { Geist, Geist_Mono, Manrope, Montserrat  } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})
export const metadata = {
  title: "Kayapalat Wellness",
  description: "Transform your well-being with Kayapalat Wellness - Your ultimate destination for holistic health solutions. Discover personalized wellness programs, expert guidance, and a supportive community dedicated to helping you achieve optimal health and vitality. Join us on a journey to a healthier, happier you with Kayapalat Wellness.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <Navbar />
      <body className="min-h-full flex flex-col">{children}</body>
      <Footer />
    </html>
  );
}
