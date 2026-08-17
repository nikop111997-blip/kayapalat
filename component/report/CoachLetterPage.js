import { Award } from "lucide-react";
import PageContainer from "./PageContainer";

export default function CoachLetterPage({ report }) {
  return (
    <PageContainer title="Personal Coach Letter" subtitle="A Note From Your Health Coach">
      <div className="max-w-3=5xl mx-auto">
        <div className="rounded-md bg-gray-50 border border-gray-200 p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center">
              <Award className="text-white" size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Dear,</h2>

              <p className="text-gray-500 text-[13px] mt-1">
                Thank you for completing your Health Reality Assessment.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-[14.5px] leading-7 text-gray-700 whitespace-pre-line">
            {report.ai.coachLetter}
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <h3 className="text-[13px] font-semibold text-gray-900">Warm Regards, - Ajay Sethi</h3>

            <p className="mt-1.5 text-[14px] text-gray-700">Senior Health Coach</p>

            <p className="text-emerald-700 font-semibold text-[13px]">Kayapalat Wellness</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}