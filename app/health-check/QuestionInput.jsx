"use client";

import { useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
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
          className={`w-full rounded-lg px-3 py-2 text-[15px] dark:text-gray-800 outline-none transition-colors
${
  validation.status === "error"
    ? "bg-red-50 border border-red-500"
    : "bg-transparent border border-transparent"
}`}
        />
      
        {step.unit && <span className="pr-2 text-sm text-ink/40 dark:text-gray-800">{step.unit}</span>}
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
    <div className="animate-rise flex max-h-[45dvh] overflow-y-auto p-1 flex-wrap justify-center gap-2">
      {step.options?.map((opt) => (
        <button
          key={opt}
          onClick={() => onAnswer(opt, opt)}
          className="rounded-full border border-sagedeep/50 bg-white px-5 py-3 text-sm dark:text-gray-900 font-medium text-ink shadow-sm transition hover:border-forest hover:bg-sage/20 active:scale-[0.98]"
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
    <div className="animate-rise w-full flex flex-col max-h-[45dvh] rounded-3xl bg-white p-2 shadow-lg ring-1 ring-black/5">
      
      {/* Scrollable Options List */}
      <div className="flex-1 overflow-y-auto p-2">
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
                    : "border-gray-200 bg-white text-ink hover:border-gray-300 dark:text-gray-800"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="mt-2 shrink-0 border-t border-gray-50 px-2 pb-1 pt-3">
        <button
          disabled={selected.length === 0}
          onClick={() => onAnswer(selected, selected.join(", "))}
          className="flex w-full items-center justify-center gap-2 dark:text-gray-800 rounded-full bg-forest px-4 py-3.5 text-sm font-semibold text-cream transition hover:bg-forestdark disabled:opacity-30"
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  );
}

// Remaining components (Slider, Photo, Contact) retain logic but adapt visual wrappers
function SliderInput({ step, onAnswer }) {
  const [val, setVal] = useState(Math.round(((step.min ?? 1) + (step.max ?? 10)) / 2));
  return (
    <div className="animate-rise w-full rounded-3xl bg-white p-5 shadow-lg ring-1 ring-black/5">
      <div className="mb-4 flex items-center justify-between px-2 dark:text-gray-800">
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
  const frontCameraRef = useRef(null);
  const frontGalleryRef = useRef(null);
  const sideCameraRef = useRef(null);
  const sideGalleryRef = useRef(null);

  const [front, setFront] = useState(null);
  const [side, setSide] = useState(null);

  const [frontUploading, setFrontUploading] = useState(false);
  const [sideUploading, setSideUploading] = useState(false);

  const [error, setError] = useState("");

  // ----------------------------------------
  // UPLOAD PHOTO
  // ----------------------------------------

  const uploadPhoto = async (file, type) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10 MB.");
      return;
    }

    setError("");

    try {
      if (type === "front") {
        setFrontUploading(true);
      } else {
        setSideUploading(true);
      }

      const blob = await upload(
        `health-assessment/${type}-${Date.now()}-${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/upload",
        }
      );

      console.log(`${type} photo uploaded:`, blob.url);

      if (type === "front") {
        setFront(blob.url);
      } else {
        setSide(blob.url);
      }
    } catch (err) {
      console.error("Photo upload failed:", err);

      setError(
        err?.message || "Photo upload failed. Please try again."
      );
    } finally {
      if (type === "front") {
        setFrontUploading(false);
      } else {
        setSideUploading(false);
      }
    }
  };

  // ----------------------------------------
  // DELETE PHOTO
  // ----------------------------------------

  const deletePhoto = async (url, type) => {
    if (!url) return;

    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });
    } catch (err) {
      console.error("Failed to delete blob:", err);
    }

    if (type === "front") {
      setFront(null);

      if (frontCameraRef.current) {
        frontCameraRef.current.value = "";
      }

      if (frontGalleryRef.current) {
        frontGalleryRef.current.value = "";
      }
    }

    if (type === "side") {
      setSide(null);

      if (sideCameraRef.current) {
        sideCameraRef.current.value = "";
      }

      if (sideGalleryRef.current) {
        sideGalleryRef.current.value = "";
      }
    }
  };

  // ----------------------------------------
  // CONTINUE
  // ----------------------------------------

  const submit = () => {
    onAnswer(
      {
        front: front || null,
        side: side || null,
      },
      front || side
        ? "Uploaded my photos"
        : "Skipped photo upload"
    );
  };

  const uploading = frontUploading || sideUploading;

  // ----------------------------------------
  // PHOTO BOX
  // ----------------------------------------

  const PhotoBox = ({
    type,
    image,
    uploading,
    cameraRef,
    galleryRef,
  }) => {
    const title =
      type === "front"
        ? "Front View"
        : "Side View";

    return (
      <div className="min-w-0">

        {/* TITLE */}
        <h3 className="mb-2 text-[14px] font-semibold text-gray-800 sm:text-[15px]">
          {title}
        </h3>

        {/* -------------------------------- */}
        {/* CAMERA INPUT */}
        {/* -------------------------------- */}

        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              uploadPhoto(file, type);
            }
          }}
          className="hidden"
        />

        {/* -------------------------------- */}
        {/* GALLERY INPUT */}
        {/* -------------------------------- */}

        <input
          ref={galleryRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              uploadPhoto(file, type);
            }
          }}
          className="hidden"
        />

        {/* -------------------------------- */}
        {/* UPLOADED IMAGE */}
        {/* -------------------------------- */}

        {image ? (
          <div className="relative">

            <div className="overflow-hidden rounded-xl bg-gray-100">
              <img
                src={image}
                alt={`${title} uploaded`}
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* DELETE BUTTON */}

            <button
              type="button"
              onClick={() =>
                deletePhoto(image, type)
              }
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-50"
              aria-label={`Delete ${title}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 6h18"
                  strokeLinecap="round"
                />

                <path
                  d="M8 6V4h8v2"
                  strokeLinecap="round"
                />

                <path
                  d="M19 6l-1 14H6L5 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M10 11v5M14 11v5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* UPLOADED STATUS */}

            <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px] font-medium text-green-600">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />

                <path
                  d="m8 12 2.5 2.5L16 9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Photo uploaded

            </div>

          </div>
        ) : (

          /* -------------------------------- */
          /* EMPTY PHOTO BOX */
          /* -------------------------------- */

          <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-2">

            {uploading ? (
              <>
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#e77074]" />

                <span className="mt-2 text-[11px] text-gray-500">
                  Uploading...
                </span>
              </>
            ) : (
              <>

                {/* CAMERA ICON */}

                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">

                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M4 7a2 2 0 0 1 2-2h2l1-2h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                    />
                  </svg>

                </div>

                <p className="mb-2 text-center text-[10px] text-gray-500 sm:text-[11px]">
                  Upload a {type} photo
                </p>

                {/* -------------------------------- */}
                {/* CAMERA + GALLERY */}
                {/* -------------------------------- */}

                <div className="flex w-full gap-1.5">

                  {/* CAMERA */}

                  <button
                    type="button"
                    onClick={() =>
                      cameraRef.current?.click()
                    }
                    className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg bg-[#1A1A1A] px-1.5 text-[10px] font-semibold text-white transition hover:bg-black sm:text-[11px]"
                  >

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 7a2 2 0 0 1 2-2h2l1-2h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
                        strokeLinejoin="round"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                      />
                    </svg>

                    Camera

                  </button>

                  {/* GALLERY */}

                  <button
                    type="button"
                    onClick={() =>
                      galleryRef.current?.click()
                    }
                    className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-1.5 text-[10px] font-semibold text-gray-800 transition hover:bg-gray-50 sm:text-[11px]"
                  >

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                      />

                      <circle
                        cx="8.5"
                        cy="8.5"
                        r="1.5"
                      />

                      <path
                        d="m21 15-5-5L5 21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    Gallery

                  </button>

                </div>

              </>
            )}

          </div>
        )}

      </div>
    );
  };

  // ----------------------------------------
  // MAIN
  // ----------------------------------------

  return (
    <div className="animate-rise w-full max-w-2xl rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5 sm:p-4">

      {/* ERROR */}

      {error && (
        <div className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-[11px] text-red-600">
          {error}
        </div>
      )}

      {/* -------------------------------- */}
      {/* FRONT + SIDE */}
      {/* -------------------------------- */}

      <div className="grid grid-cols-2 gap-3">

        <PhotoBox
          type="front"
          image={front}
          uploading={frontUploading}
          cameraRef={frontCameraRef}
          galleryRef={frontGalleryRef}
        />

        <PhotoBox
          type="side"
          image={side}
          uploading={sideUploading}
          cameraRef={sideCameraRef}
          galleryRef={sideGalleryRef}
        />

      </div>

      {/* -------------------------------- */}
      {/* BOTTOM ACTIONS */}
      {/* -------------------------------- */}

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">

        {/* SKIP */}

        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            onAnswer(
              {
                front: null,
                side: null,
              },
              "Skipped photo upload"
            )
          }
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 sm:text-sm"
        >
          Skip
          <span className="ml-1 text-[10px] font-normal text-gray-400">
            (Optional)
          </span>
        </button>

        {/* CONTINUE */}

        <button
          type="button"
          disabled={uploading}
          onClick={submit}
          className="h-10 rounded-xl bg-gradient-to-r from-[#e77074] via-[#e382c5] to-[#dc8bc3] px-3 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
        >
          {uploading
            ? "Uploading..."
            : "Continue"}
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
          className="w-full rounded-xl border-none bg-gray-50 dark:text-gray-800 placeholder:text-gray-700 px-4 py-3.5 text-[15px] outline-none ring-1 ring-gray-200 focus:ring-forest"
        />
        <input
          value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address" type="email"
          className="w-full rounded-xl border-none bg-gray-50 px-4 py-3.5 text-[15px] outline-none dark:text-gray-800 placeholder:text-gray-700 ring-1 ring-gray-200 focus:ring-forest"
        />
        <input
          value={mobile} onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile number" type="tel"
          className="w-full rounded-xl border-none bg-gray-50 px-4 py-3.5 text-[15px] outline-none dark:text-gray-800 placeholder:text-gray-700 ring-1 ring-gray-200 focus:ring-forest"
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