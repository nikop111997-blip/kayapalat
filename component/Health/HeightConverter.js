"use client";

import { useMemo, useState } from "react";
import Picker from "react-mobile-picker";
import { Ruler, RulerIcon, VideoIcon } from "lucide-react";
import MeasureGuide from "./MeasureGuide";

const feetOptions = Array.from({ length: 5 }, (_, i) => (i + 3).toString());
const inchOptions = Array.from({ length: 12 }, (_, i) => i.toString());

export default function HeightConverter({ onUse }) {
    const [tab,setTab]=useState("convert");
  const [pickerValue, setPickerValue] = useState({
    feet: "5",
    inch: "8",
  });

  const cm = useMemo(() => {
    const total =
      Number(pickerValue.feet) * 12 +
      Number(pickerValue.inch);

    return (total * 2.54).toFixed(1);
  }, [pickerValue]);

  return (
    <div className="space-y-6">
<div className="mb-5 flex rounded-full bg-gray-100 p-1">

<button
onClick={()=>setTab("convert")}
className={`flex-1 rounded-full py-3 text-sm font-semibold transition
${
tab==="convert"
?"bg-white shadow text-[#d55559]"
:"text-gray-500"
}`}
>

<span className="flex items-center justify-center  gap-2">
<RulerIcon/> Convert</span>

</button>

<button
onClick={()=>setTab("guide")}
className={`flex-1 rounded-full py-3 text-sm font-semibold transition
${
tab==="guide"
?"bg-white shadow text-[#d55559]"
:"text-gray-500"
}`}
>
<span className="flex items-center justify-center  gap-2">
<VideoIcon/> How to Measure</span>

</button>

</div>
{tab === "guide" && <MeasureGuide />}
  {tab === "convert" && (
  <>    <div className="flex items-center justify-between gap-3">
<div className="flex items-center gap-3">
        <div className="rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] p-3">
          <Ruler className="text-white" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Height Converter
          </h3>

          <p className="text-sm text-gray-500">
            Select your height
          </p>
          </div>
        </div>
         <button
        onClick={() => onUse(Number(cm))}
        className="h-14 w-fit px-12 cursor-pointer rounded-full bg-gradient-to-br from-[#e77074] via-[#e382c5] to-[#dc8bc3] font-semibold text-white"
      >
        Use this Height
      </button>
</div>
      

      {/* Picker */}

      <div className="rounded-2xl border border-gray-300 bg-white p-2">

        <Picker
          value={pickerValue}
          onChange={setPickerValue}
          height={180}
          itemHeight={44}
        >

          <Picker.Column name="feet">

            {feetOptions.map((item) => (
              <Picker.Item key={item} value={item}>
                {({ selected }) => (
                  <div
                    className={`text-center text-xl transition
                    ${
                      selected
                        ? "font-bold text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {item} ft
                  </div>
                )}
              </Picker.Item>
            ))}

          </Picker.Column>

          <Picker.Column name="inch">

            {inchOptions.map((item) => (
              <Picker.Item key={item} value={item}>
                {({ selected }) => (
                  <div
                    className={`text-center text-xl transition
                    ${
                      selected
                        ? "font-bold text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {item} in
                  </div>
                )}
              </Picker.Item>
            ))}

          </Picker.Column>

        </Picker>

      </div>

      {/* Result */}

      <div className="rounded-2xl bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] p-6 text-center">

        <p className="text-sm text-white">
          Converted Height
        </p>

        <p className="mt-2 text-6xl font-bold text-white">
          {cm}
        </p>

        <p className="mt-1 text-sm text-white">
          cm
        </p>

      </div>

     
</> )}
    </div>
  );
}