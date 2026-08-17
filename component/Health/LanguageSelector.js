"use client";

import { LanguagesIcon, Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "as", name: "অসমীয়া (Assamese)" },
  { code: "kok", name: "Konkani" },
  { code: "ne", name: "नेपाली (Nepali)" },
  { code: "sd", name: "Sindhi" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("English");
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved) {
      const lang = languages.find((l) => l.code === saved);
      if (lang) {
        // Always show English instead of translating the button
        setSelected(lang.code === "en" ? "English" : lang.name);
      }
    }
  }, []);

  const changeLanguage = (code) => {
    const combo = document.querySelector(".goog-te-combo");

    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    }

    localStorage.setItem("language", code);

    const lang = languages.find((l) => l.code === code);

    if (lang) {
      setSelected(lang.code === "en" ? "English" : lang.name);
    }

    setOpen(false);
  };

  return (
    <>
      {/* Globe Button */}
      <button
        onClick={() => setOpen(true)}
        translate="no"
        className="flex items-center gap-2  text-white rounded-full border border-gray-300 px-4 py-2 sm:px-12 sm:py-2 hover:bg-white hover:text-black cursor-pointer transition-colors notranslate"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        <span className="text-xs sm:text-sm font-medium notranslate" translate="no">
          {selected}
        </span>
      </button>

      {/* Center Popup */}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 font-sans"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white shadow-2xl mx-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 p-5 flex items-center gap-3 rounded-t-2xl">
                <div className="text-white p-2 rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3]">
                  <LanguagesIcon />
                </div>
                <h2 className="text-lg font-semibold">Choose Language</h2>
              </div>
           <div className="border-b border-gray-200 p-4">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search language..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
    />
  </div>
</div>
              <div className="max-h-[400px] overflow-y-auto p-3">
                {filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 transition hover:bg-gray-100"
                  >
                    <span>{lang.name}</span>

                    {selected ===
                      (lang.code === "en" ? "English" : lang.name) && (
                      <svg
                        className="h-5 w-5 text-pink-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}