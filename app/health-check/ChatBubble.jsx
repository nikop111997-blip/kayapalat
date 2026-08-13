

export function BotBubble({ children }) {
  return (
    <div className="flex items-end gap-2 animate-rise">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] p-1">
              <img src="/3.png" alt="Kayapalat Logo" className="h-6 w-auto" />
            </div>
      <div className="max-w-[82%] rounded-2xl bg-gray-100 text-gray-950 rounded-bl-sm  px-4 py-3 text-[15px] leading-relaxed text-ink shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function UserBubble({ children }) {
  return (
    <div className="flex justify-end animate-rise">
      <div className="max-w-[82%] rounded-2xl rounded-br-sm px-4 py-3 text-[15px] leading-relaxed border border-gray-200 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex items-end gap-2 animate-in fade-in slide-in-from-bottom-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] p-1">
              <img src="/3.png" alt="Kayapalat Logo" className="h-6 w-auto" />
            </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3.5 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] animate-bounce [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] animate-bounce [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] animate-bounce [animation-delay:300ms]" />
      </div>
      <p className="text-xs text-gray-500">Kayapalat AI is thinking...</p>
    </div>
  );
}