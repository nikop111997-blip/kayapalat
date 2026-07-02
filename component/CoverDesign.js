"use client";

import Image from "next/image";
import { Playfair_Display, Cinzel } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const CoverDesign = ({ hintText }) => (
<div
  className="relative group flex items-stretch w-[320px] h-[400px] md:w-[360px] md:h-[520px]"
>
    {/* Spine */}
    <div
      style={{
        width: "18px",
        flexShrink: 0,
        background: "linear-gradient(to right, #050505, #111, #0a0a0a)",
        borderRadius: "4px 0 0 4px",
        boxShadow: "inset -2px 0 4px rgba(0,0,0,0.5)",
      }}
    />

    {/* Cover */}
    <div
      className="relative overflow-hidden flex flex-col justify-between"
      style={{
        flex: 1,
        borderRadius: "0 8px 8px 0",
        padding: "28px 26px",
        backgroundColor: "#1e2235",
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px),
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 6px)
        `,
        boxShadow: "4px 0 30px rgba(0,0,0,0.7), inset 0 0 80px rgba(0,0,0,0.3)",
      }}
    >
      {/* Depth overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(40,45,70,0.6) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(20,25,50,0.7) 0%, transparent 60%)",
        }}
      />

      {/* Gold border frame */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 14,
          right: 14,
          bottom: 14,
          left: 14,
          border: "1.5px solid rgba(212,175,55,0.45)",
          borderRadius: "3px",
        }}
      />

      {/* Corner ornaments */}
      {[
        { top: 10, left: 10 },
        { top: 10, right: 10 },
        { bottom: 10, left: 10 },
        { bottom: 10, right: 10 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: "rgba(212,175,55,0.65)",
            ...pos,
          }}
        />
      ))}

      {/* Logo */}
      <div className="relative z-10 flex justify-center items-center pt-1">
        <Image
  src="https://framerusercontent.com/images/msjGzrRn1eu9rQWQOuvoSNpE2yE.png?scale-down-to=512&width=644&height=164"
  alt="Kayapalat Logo"
  width={110}
  height={30}
  priority
  style={{
    filter:
      "brightness(0) saturate(100%) invert(72%) sepia(37%) saturate(925%) hue-rotate(10deg) brightness(95%) contrast(95%)",
  }}
/>
      </div>

      {/* Title */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 -mt-4">
        <h2
          className={`${playfair.className} text-center m-0`}
          style={{
            fontSize: "52px",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "0.05em",
            color: "#d4af37",
            textShadow:
              "1px 1px 8px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.1)",
          }}
        >
          KP
          <br />
          JOURNAL
        </h2>
        {/* Divider */}
        <div
          style={{
            width: 72,
            height: 1.5,
            marginTop: 14,
            background:
              "linear-gradient(to right, transparent, rgba(212,175,55,0.8), transparent)",
          }}
        />
      </div>

      {/* Bottom text */}
      <div className="relative z-10 text-center pb-1 space-y-1">
        <p
          className={`${cinzel.className} m-0`}
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "rgba(212,175,55,0.75)",
          }}
        >
          Your Daily Discipline System
        </p>
        <p
          className={`${playfair.className} m-0`}
          style={{
            fontSize: 10,
            fontStyle: "italic",
            letterSpacing: "0.05em",
            color: "rgba(212,175,55,0.5)",
          }}
        >
          by - Ajay Sethi
        </p>
      </div>

      {/* Hover hint */}
      {hintText && (
        <div
          className="absolute bottom-0 left-0 right-0 text-center text-white font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"
          style={{ fontSize: 10, letterSpacing: "0.3em" }}
        >
          {hintText}
        </div>
      )}
    </div>
  </div>
);

export default CoverDesign;