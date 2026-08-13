"use client";

import { useMemo, useState } from "react";
import Picker from "react-mobile-picker";
import { Ruler, RulerIcon, VideoIcon } from "lucide-react";
import MeasureGuide from "./MeasureGuide";

const inchOptions = Array.from({ length: 61 }, (_, i) => (i + 20).toString());
// 20 inch → 80 inch

export default function WaistConverter({ onUse }) {
  const [tab, setTab] = useState("convert");

  const [pickerValue, setPickerValue] = useState({
    inch: "34",
  });

  const cm = useMemo(() => {
    return (Number(pickerValue.inch) * 2.54).toFixed(1);
  }, [pickerValue]);

  return (
    <div className="space-y-6">

      {/* Tabs */}

      <div className="flex rounded-full bg-gray-100 p-1">

        <button
          onClick={() => setTab("convert")}
          className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${
            tab === "convert"
              ? "bg-white text-[#d55559] shadow"
              : "text-gray-500"
          }`}
        >
          <span className="flex items-center justify-center  gap-2">
<RulerIcon/> Convert</span>
        </button>

        <button
          onClick={() => setTab("guide")}
          className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${
            tab === "guide"
              ? "bg-white text-[#d55559] shadow"
              : "text-gray-500"
          }`}
        >
          <span className="flex items-center justify-center  gap-2">
<VideoIcon/> How to Measure</span>
        </button>

      </div>

      {tab === "guide" && <MeasureGuide forType="waist" />}

      {tab === "convert" && (
        <>

          {/* Header */}

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] p-3">
              <Ruler className="text-white" />
            </div>

            <div>

              <h3 className="text-lg font-semibold">
                Waist Converter
              </h3>

              <p className="text-sm text-gray-500">
                Inches → Centimeters
              </p>

            </div>

          </div>

          {/* Picker */}

          <div className="rounded-3xl border border-gray-200 bg-white p-4">

            <Picker
              value={pickerValue}
              onChange={setPickerValue}
              height={180}
              itemHeight={44}
            >

              <Picker.Column name="inch">

                {inchOptions.map((item) => (

                  <Picker.Item
                    key={item}
                    value={item}
                  >

                    {({ selected }) => (

                      <div
                        className={`text-center text-xl transition ${
                          selected
                            ? "font-bold text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {item} <span className="text-gray-500 text-sm">in</span>
                      </div>

                    )}

                  </Picker.Item>

                ))}

              </Picker.Column>

            </Picker>

          </div>

          {/* Result */}

          <div className="rounded-3xl bg-gray-50 p-6 text-center">

            <p className="text-sm text-gray-700">
              Converted Waist
            </p>

            <p className="mt-2 text-6xl font-bold text-green-950">
              {cm}
            </p>

            <p className="text-xl text-gray-700">
              cm
            </p>

          </div>

          <button
            onClick={() => onUse(Number(cm))}
            className="h-14 w-full rounded-full bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] font-semibold text-white transition hover:bg-green-800"
          >
            Use this Waist
          </button>

        </>
      )}

    </div>
  );
}