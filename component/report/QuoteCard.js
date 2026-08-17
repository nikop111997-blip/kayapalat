import { Quote } from "lucide-react";

export default function QuoteCard({ title, text }) {
  return (
    <div className="rounded-md bg-gray-900 text-white p-8">
      <Quote size={22} className="opacity-30 mb-4" strokeWidth={2} />

      <h3 className="text-[13px] uppercase tracking-[2px] font-semibold text-emerald-400 mb-3">
        {title}
      </h3>

      <p className="text-[15px] leading-7 text-gray-200">{text}</p>
    </div>
  );
}