"use client";

export default function InlineLink({
  href,
  children,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 font-semibold underline hover:text-green-700"
    >
      {children}
    </a>
  );
}