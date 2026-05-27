import { Geist, Geist_Mono, Manrope, Montserrat  } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

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
      <Toaster />
      <Navbar />
      <body className="min-h-full flex flex-col">
         <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '2381521732373787');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2381521732373787&ev=PageView&noscript=1"
          />
        </noscript>
        
        {children}</body>
      <Footer />
    </html>
  );
}
