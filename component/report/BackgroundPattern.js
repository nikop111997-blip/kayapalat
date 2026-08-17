export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* very light wash of the cover's teal gradient */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background: "linear-gradient(155deg, #5EEAD4 0%, #0F766E 32%, #FFFFFF 72%)",
        }}
      />

      {/* faint concentric arc, echoing the cover's circular badge motif */}
      <svg
        className="absolute -top-28 -right-28 w-80 h-80 opacity-[0.05]"
        viewBox="0 0 320 320"
      >
        <circle cx="160" cy="160" r="150" fill="none" stroke="#0F766E" strokeWidth="1" />
        <circle cx="160" cy="160" r="118" fill="none" stroke="#0F766E" strokeWidth="1" />
        <circle cx="160" cy="160" r="86" fill="none" stroke="#0F766E" strokeWidth="1" />
      </svg>

      {/* quiet dot texture */}
      <svg width="100%" height="100%" className="opacity-[0.03]">
        <defs>
          <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.4" fill="#0D0D0D" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}