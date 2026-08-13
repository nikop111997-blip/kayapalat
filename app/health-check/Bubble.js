function LeafMark() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-cream shadow-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20c8-1 14-7 15-15-8 1-14 7-15 15Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <path d="M6 18C10 14 13 11 17 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function BotBubble({ children }) {
  return (
    <div className="flex items-end gap-2 animate-rise">
      <LeafMark />
      <div className="max-w-[82%] rounded-2xl rounded-bl-sm bg-sage px-4 py-3 text-[15px] leading-relaxed text-ink shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function UserBubble({ children }) {
  return (
    <div className="flex justify-end animate-rise">
      <div className="max-w-[82%] rounded-2xl rounded-br-sm bg-forest px-4 py-3 text-[15px] leading-relaxed text-cream shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex items-end gap-2 animate-rise">
      <LeafMark />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-sage px-4 py-3.5 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-forest/60 animate-bounce1 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-forest/60 animate-bounce1 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-forest/60 animate-bounce1 [animation-delay:300ms]" />
      </div>
    </div>
  );
}