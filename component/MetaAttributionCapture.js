
"use client";

import { useEffect } from "react";

export default function MetaAttributionCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");

    if (fbclid) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 90);

      document.cookie =
        `fbclid=${encodeURIComponent(fbclid)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
    }
  }, []);

  return null;
}
