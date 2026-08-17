export default function InfoCard({ title, children }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-7">
      <h3 className="text-base font-semibold mb-4 text-gray-900 tracking-tight">
        {title}
      </h3>

      <div className="text-[14px] leading-7 text-gray-600">{children}</div>
    </div>
  );
}