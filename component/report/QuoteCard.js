import { Quote } from "lucide-react";

export default function QuoteCard({ title, text }) {
  return (
    <div className="rounded-md bg-gray-900 text-white p-8 mt-8">
      <div className="flex gap-2 items-center">
      <Quote size={14} className="opacity-30 mb-4" strokeWidth={2} />

      <h3 className="text-[13px] uppercase tracking-[2px] font-semibold text-emerald-400 mb-3">
        {title}
      </h3>
</div>
      <p className="text-[12px] leading-6 text-gray-200">{text}</p>
    </div>
  );
}