export default function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "emerald",
}) {
  const colors = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700" },
    red: { bg: "bg-red-50", text: "text-red-600" },
    orange: { bg: "bg-amber-50", text: "text-amber-600" },
    blue: { bg: "bg-gray-100", text: "text-gray-700" },
    violet: { bg: "bg-gray-100", text: "text-gray-700" },
  };

  const theme = colors[color] || colors.emerald;

  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 transition hover:border-gray-300">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <p className="uppercase tracking-[2px] text-[10px] font-semibold text-gray-400">
            {title}
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-gray-900 tracking-tight truncate">
            {value}
          </h2>

          {subtitle && (
            <p className="text-[13px] text-gray-500 mt-1.5">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div
            className={`w-9 h-9 shrink-0 rounded-md ${theme.bg} flex items-center justify-center`}
          >
            <Icon className={theme.text} size={17} strokeWidth={2} />
          </div>
        )}
      </div>
    </div>
  );
}