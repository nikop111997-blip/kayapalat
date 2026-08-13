"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,hi,bn,gu,kn,ml,mr,pa,ta,te,ur,fr,de,es,it,ja,ko,ru,zh-CN,ar",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Restore previously selected language
      const saved = localStorage.getItem("language");

      if (saved) {
        const timer = setInterval(() => {
          const combo = document.querySelector(".goog-te-combo");

          if (combo) {
            combo.value = saved;
            combo.dispatchEvent(new Event("change"));
            clearInterval(timer);
          }
        }, 300);
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{ display: "none" }}
    />
  );
}