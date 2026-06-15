// component/AnalyticsScripts.jsx
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function AnalyticsScripts() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // 1. Check if they already accepted cookies on previous visits
    if (localStorage.getItem("cookieConsent") === "accepted") {
      setHasConsent(true);
    }

    // 2. Listen for a custom event in case they click "Accept" right now
    const handleConsentGranted = () => setHasConsent(true);
    window.addEventListener("cookieConsentAccepted", handleConsentGranted);

    return () => window.removeEventListener("cookieConsentAccepted", handleConsentGranted);
  }, []);

  // If no consent, render absolutely nothing
  if (!hasConsent) return null;

  return (
    <>
      {/* Google Analytics */}
      <GoogleAnalytics gaId="G-5GT5HXDNTL" />

      {/* Meta Pixel */}
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
          alt=""
        />
      </noscript>
    </>
  );
}