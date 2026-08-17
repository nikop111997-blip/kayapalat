import { Heart, ShieldCheck, Calendar, Mail, Phone, Globe, CheckSquare } from "lucide-react";

import PageContainer from "./PageContainer";

export default function ClosingPage({ report }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageContainer>
      {/* Thank You */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 mx-auto flex items-center justify-center">
          <Heart className="text-emerald-600" size={26} />
        </div>

        <h1 className="text-4xl font-semibold mt-7 text-gray-900 tracking-tight">
          Thank You
        </h1>

        <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-7">
          Thank you for taking the time to understand your health. Awareness
          is the first step toward long-term wellbeing.
        </p>
      </div>

      {/* Motivation */}
      <div className="mt-14 rounded-md bg-gray-900 p-10 text-white">
        <h2 className="text-lg font-semibold mb-5 tracking-tight">Final Message</h2>

        <p className="text-[15px] leading-8 italic text-gray-200">
          "{report.ai.motivation}"
        </p>
      </div>

      {/* Next Milestones */}
      {report.ai.nextMilestones?.length > 0 && (
        <div className="mt-14 rounded-md border border-gray-200 p-9">
          <div className="flex items-center gap-2.5 mb-5">
            <CheckSquare size={17} className="text-emerald-700" />

            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              Your Next Milestones
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {report.ai.nextMilestones.map((milestone, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-md border border-gray-300 shrink-0 mt-0.5" />

                <p className="text-[13.5px] leading-6 text-gray-600">{milestone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-56 rounded-md border border-amber-200 bg-amber-50 p-9">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-amber-600" size={20} />

          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Important Disclaimer
          </h2>
        </div>

        <p className="text-[13.5px] leading-6 text-gray-700">
          This report is generated from the information provided during your
          health assessment. It is intended for educational and wellness
          purposes only and should not be considered a medical diagnosis,
          treatment plan, or substitute for professional medical advice.
          Always consult a qualified healthcare professional for any medical
          concerns or decisions.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-14 border-t border-gray-200 pt-8">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <Calendar size={15} className="text-gray-400" />
              <span>Generated on {today}</span>
            </div>

            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <ShieldCheck size={15} className="text-gray-400" />
              <span>Health Reality Report By Kayapalat</span>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <Mail size={15} className="text-gray-400" />
              <span>kayapalatwellness@gmail.com</span>
            </div>

            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <Phone size={15} className="text-gray-400" />
              <span>+91 9314091140</span>
            </div>

            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <Globe size={15} className="text-gray-400" />
              <span>www.kayapalat.com</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}