import BackgroundPattern from "./BackgroundPattern";

export default function PageContainer({
  children,
  title,
  subtitle,
  eyebrowRight,
}) {
  return (
    <section
      className="
        report-page
        relative
        bg-white
        border border-gray-100
        font-sans
        shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.08)]
        p-8
      "
    >
      <BackgroundPattern />

      {/* Accent glow */}
      <div
        className="
          absolute
          -bottom-32
          -left-32
          w-80
          h-80
          bg-teal-50
          rounded-full
          blur-3xl
          opacity-70
          pointer-events-none
        "
      />

      <div className="relative z-10">
        {title && (
          <div className="flex items-start justify-between border-b border-gray-100 pb-5 mb-6">
            <div>
              <p className="uppercase tracking-[3px] text-[10px] font-semibold text-emerald-700">
                {title}
              </p>

              {subtitle && (
                <h2 className="text-[24px] leading-tight font-semibold mt-1.5 text-gray-900 tracking-tight">
                  {subtitle}
                </h2>
              )}
            </div>

            {eyebrowRight && (
              <p className="text-[10px] uppercase tracking-[2px] text-gray-400 mt-1">
                {eyebrowRight}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}