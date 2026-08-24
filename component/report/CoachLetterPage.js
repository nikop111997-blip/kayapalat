'use client'
import { Award } from "lucide-react";
import PageContainer from "./PageContainer";

export default function CoachLetterPage({ report, name }) {
  return (
    <PageContainer title="Personal Coach Letter" subtitle="A Note From Your Health Coach">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-md bg-gray-50 border border-gray-200 p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center">
              <Award className="text-white" size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Dear, {name}</h2>

              <p className="text-gray-500 text-[13px] mt-1">
                Thank you for completing your Health Reality Assessment.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-[14.5px] leading-7 text-gray-700 whitespace-pre-line">
            {report.ai.coachLetter}
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex gap-4 items-center">
             <div className="flex items-center justify-center">
  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">
    <img
      src="https://framerusercontent.com/images/VaJVz7sLas8kHWe1d2ITuHvrA.png?width=429&height=607"
      alt="Assessment"
      className="h-full  object-center rotate-y-180 ml-4"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </div>
</div>
            <div>
            <h3 className="text-[13px] font-semibold text-gray-900">Warm Regards, - Ajay Sethi</h3>

            <p className="mt-1.5 text-[12px] text-gray-700">Founder & CEO</p>

            <p className="text-emerald-700 font-semibold text-[13px]">Kayapalat Wellness</p>
            </div>
            </div>
          </div>
        </div>
        {report?.ai?.mythsToKnow?.length > 0 && (
          <div className=" mt-12">
            <p className="font-bold text-xl mb-2">Myths to Know</p>
            <p className="text-sm text-gray-600 mb-4">Clear up common health and fitness misconceptions with simple, evidence-based guidance to help you make more informed decisions about your body, nutrition, exercise, and overall well-being.</p>
  <div className="grid grid-cols-2 gap-4">
    {report.ai.mythsToKnow.map((item, index) => (
      <div
        key={index}
        className="rounded-md border border-gray-200 bg-white p-4"
      >
        <div className="mb-2">
          <span className="rounded-xs border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium capitalize text-gray-700">
            {item.title}
          </span>
        </div>

        <p className="text-sm leading-6 text-gray-600">
          {item?.fact || "No recommendation available"}
        </p>
      </div>
    ))}
    </div>
  </div>
)}
      </div>
    </PageContainer>
  );
}