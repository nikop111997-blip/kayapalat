"use client";

import { useEffect, useRef, useState } from "react";
import { validators } from "@/lib/validators";
import { validateNumber } from "@/lib/validateNumber";
import MeasurementToolsModal from "@/component/Health/MeasurementToolsModal";
import HeightConverter from "@/component/Health/HeightConverter";
import WaistConverter from "@/component/Health/WaistConverter";
export default function QuestionInput({ step, onAnswer }) {
  if (step.type === "number") return <NumberInput step={step} onAnswer={onAnswer} />;
  if (step.type === "choice") return <ChoiceInput step={step} onAnswer={onAnswer} />;
  if (step.type === "multi") return <MultiInput step={step} onAnswer={onAnswer} />;
  if (step.type === "slider") return <SliderInput step={step} onAnswer={onAnswer} />;
  if (step.type === "photo") return <PhotoInput step={step} onAnswer={onAnswer} />;
  if (step.type === "contact") return <ContactInput step={step} onAnswer={onAnswer} />;
  return null;
}

// Wrapping layout mimicking the pill-shaped floating bar
function FloatingDock({ children, helper }) {
  return (
    <div className="animate-rise w-full">
      {helper && <p className="mb-3 text-center text-xs text-ink/50">{helper}</p>}
      <div className="flex w-full items-center gap-3 rounded-full bg-white px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5 transition-all">
        {children}
      </div>
    </div>
  );
}

function NumberInput({ step, onAnswer }) {
  const [val, setVal] = useState("");
  const inputRef = useRef(null);
  const [showTools,setShowTools]=useState(false);
  const [validation, setValidation] = useState({
    status:"idle",
    message:""
});
const canUseTools =
    step.id === "height" ||
    step.id === "waist" ||
    step.id === "chest" ||
    step.id === "hip";
  const submit = () => {
    const n = parseFloat(val);
    if (!val || isNaN(n) || n <= 0) return;
    onAnswer(n, `${n}${step.unit ? " " + step.unit : ""}`);
  };

  return (
    <>
      {
validation.status==="error" && (

<p className="mt-2 mb-2 px-4 text-sm text-red-600">
 {validation.message}
</p>

)
}{
validation.status==="warning" && (

<p className="mt-2 mb-2 px-4 text-sm text-yellow-600">
 {validation.message}
</p>

)
}
    <FloatingDock helper={step.helper}>
     <div className="relative inline-flex flex-col items-center">
  {/* The Popover Menu */}
 {canUseTools && (
  <div className="absolute bottom-full mb-3 w-max max-w-[250px] origin-bottom animate-in fade-in zoom-in-95 rounded-xl bg-gray-900 p-1.5 shadow-xl ring-1 ring-gray-800 z-50 sm:whitespace-nowrap">
    <button
      onClick={() => {
        // Add your logic here to toggle between inches and cm
        setShowTools(false);
      }}
      className="w-full rounded-lg px-4 py-1 text-xs font-medium text-slate-50 transition active:bg-gray-800"
    >
      Click to convert inch to cm
    </button>
    
    {/* Popover Arrow/Pointer */}
    <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-gray-800 bg-gray-900" />
  </div>
)}

  {/* Your Original Button (Modified to toggle showTools) */}
  <button
    type="button"
    onClick={() => canUseTools && setShowTools(!showTools)}
    className={`relative flex h-10 w-10 items-center justify-center rounded-full transition
    ${
        canUseTools
            ? "bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] text-white"
            : "text-slate-400" // Updated to standard tailwind color for fallback
    }`}
  >
    {canUseTools && (
        <>
            <span className="absolute inset-0 animate-ping rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] opacity-20" />
            <span className="absolute inset-0 animate-pulse rounded-full border border-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3]" />
        </>
    )}

    <svg
        className={`relative z-10 transition-transform duration-200 ${showTools ? "rotate-45" : "rotate-0"}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path
            d="M12 5v14M5 12h14"
            strokeLinecap="round"
        />
    </svg>
  </button>
</div>

      
      <div className="flex flex-1 items-center gap-2">
        {/* Globe icon placeholder */}
       
        <input
        ref={inputRef}
          inputMode="decimal"
          autoFocus
          value={val}
          onChange={(e)=>{

    const value=e.target.value;

    if(!/^\d*\.?\d*$/.test(value))
        return;

    setVal(value);

    if(!validators[step.id])
        return;

    const result=validateNumber(
        value,
        validators[step.id]
    );

    setValidation(result);

}}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          
          placeholder={step.placeholder || "Enter value..."}
          className={`w-full rounded-lg px-3 py-2 text-[15px] outline-none transition-colors
${
  validation.status === "error"
    ? "bg-red-50 border border-red-500"
    : "bg-transparent border border-transparent"
}`}
        />
      
        {step.unit && <span className="pr-2 text-sm text-ink/40">{step.unit}</span>}
      </div>
      
      <button className="flex h-10 w-10 items-center justify-center text-ink/40 hover:text-ink/70">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      </button>

      <button
        onClick={submit}
        disabled={
!val ||
validation.status==="error"
}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition hover:bg-black disabled:opacity-30"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </FloatingDock>
    <div className="max-w-2xl mx-auto">
    <MeasurementToolsModal
    open={showTools}
    onClose={() => setShowTools(false)}
>
    {step.id === "height" && (
        <HeightConverter
            onUse={(cm) => {

                setVal(cm.toString());

                // Run validation automatically
                const result = validateNumber(
                    cm,
                    validators.height
                );

                setValidation(result);

                setShowTools(false);
            }}
        />
    )}
    {step.id === "waist" && (
      <WaistConverter
    onUse={(cm)=>{

        setVal(cm.toString());

        setValidation(
            validateNumber(
                cm,
                validators.waist
            )
        );

        setShowTools(false);

    }}
/>
    )}
</MeasurementToolsModal>
</div>
    </>
  );
}

// Adapted standard block components (Choice, Multi, Contact, Slider) to blend with floating dock style
function ChoiceInput({ step, onAnswer }) {
  return (
    <div className="animate-rise flex flex-wrap justify-center gap-2">
      {step.options?.map((opt) => (
        <button
          key={opt}
          onClick={() => onAnswer(opt, opt)}
          className="rounded-full border border-sagedeep/50 bg-white px-5 py-3 text-sm font-medium text-ink shadow-sm transition hover:border-forest hover:bg-sage/20 active:scale-[0.98]"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MultiInput({ step, onAnswer }) {
  const [selected, setSelected] = useState([]);
  const toggle = (opt) =>
    setSelected((s) => (s.includes(opt) ? s.filter((o) => o !== opt) : [...s, opt]));
  return (
    <div className="animate-rise w-full rounded-3xl bg-white p-4 shadow-lg ring-1 ring-black/5">
      <div className="flex flex-wrap justify-center gap-2">
        {step.options?.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition active:scale-[0.98] ${
                active
                  ? "border-[#e77074] bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] text-white shadow-md"
                  : "border-gray-200 bg-white text-ink hover:border-gray-300"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <button
        disabled={selected.length === 0}
        onClick={() => onAnswer(selected, selected.join(", "))}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-4 py-3.5 text-sm font-semibold text-cream transition hover:bg-forestdark disabled:opacity-30"
      >
        Continue
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// Remaining components (Slider, Photo, Contact) retain logic but adapt visual wrappers
function SliderInput({ step, onAnswer }) {
  const [val, setVal] = useState(Math.round(((step.min ?? 1) + (step.max ?? 10)) / 2));
  return (
    <div className="animate-rise w-full rounded-3xl bg-white p-5 shadow-lg ring-1 ring-black/5">
      <div className="mb-4 flex items-center justify-between px-2">
        <span className="text-xs text-ink/50">Low</span>
        <span className="font-mono text-3xl font-semibold text-forest">{val}</span>
        <span className="text-xs text-ink/50">High</span>
      </div>
      <input
        type="range"
        min={step.min ?? 1}
        max={step.max ?? 10}
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value))}
        className="h-2 w-full appearance-none rounded-full bg-gray-400 accent-gray-900 outline-none"
      />
      <button
        onClick={() => onAnswer(val, `${val} / ${step.max ?? 10}`)}
        className="mt-6 w-full rounded-full bg-[#1A1A1A] px-4 py-3.5 text-sm font-medium text-white transition hover:bg-black"
      >
        Confirm
      </button>
    </div>
  );
}

function PhotoInput({ step, onAnswer }) {
  // Existing PhotoInput logic remains identical; applying wrapper styling
  const frontRef = useRef(null);
  const sideRef = useRef(null);
  const [front, setFront] = useState(null);
  const [side, setSide] = useState(null);

  const readFile = (file, set) => {
    const reader = new FileReader();
    reader.onload = () => set(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="animate-rise w-full rounded-3xl bg-white p-5 shadow-lg ring-1 ring-black/5">
      {/* Grid rendering remains unchanged internally */}
      <div className="grid grid-cols-2 gap-3">
         {/* ... mapped photo buttons ... */}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onAnswer({ front: null, side: null }, "Skipped photo upload")}
          className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-ink/70 transition hover:bg-gray-50"
        >
          Skip
        </button>
        <button
          onClick={() => onAnswer({ front, side }, front || side ? "Uploaded my photos" : "Skipped")}
          className="flex-1 cursor-pointer rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] px-4 py-3 text-sm font-medium text-white transition hover:bg-gradient-to-br hover:from-[#e77074] hover:via-[#e382c5] hover:to-[#dc8bc3]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function ContactInput({ step, onAnswer }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && mobile.trim().length >= 7;

  return (
    <div className="animate-rise max-w-2xl rounded-3xl bg-white p-5 shadow-lg ring-1 ring-black/5">
      <div className="space-y-3">
        <input
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full rounded-xl border-none bg-gray-50 px-4 py-3.5 text-[15px] outline-none ring-1 ring-gray-200 focus:ring-forest"
        />
        <input
          value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address" type="email"
          className="w-full rounded-xl border-none bg-gray-50 px-4 py-3.5 text-[15px] outline-none ring-1 ring-gray-200 focus:ring-forest"
        />
        <input
          value={mobile} onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile number" type="tel"
          className="w-full rounded-xl border-none bg-gray-50 px-4 py-3.5 text-[15px] outline-none ring-1 ring-gray-200 focus:ring-forest"
        />
      </div>
      <button
        disabled={!valid}
        onClick={() => onAnswer({ name, email, mobile }, `${name} · ${email} · ${mobile}`)}
        className="mt-4 w-full rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-gradient-to-br hover:from-[#e77074] hover:via-[#e382c5] hover:to-[#dc8bc3] disabled:opacity-40"
      >
        Generate Reality Report
      </button>
    </div>
  );
}