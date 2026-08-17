import { Crown, CheckCircle2, ArrowRight } from "lucide-react";

import PageContainer from "./PageContainer";
import { QRCodeSVG } from "qrcode.react";
export default function MembershipPage() {
  const membership = {
    name: "Gold Membership",
    reason:
      "Your assessment shows a solid health foundation with a few areas that can improve through structured guidance and consistent coaching.",
    description:
      "The Gold Membership is designed for people who want expert guidance, accountability, and sustainable lifestyle improvements without intensive medical supervision.",
    features: [
      "Personalised nutrition guidance",
      "Weekly health coaching sessions",
      "Monthly body composition review",
      "Workout and activity recommendations",
      "Progress tracking dashboard",
      "WhatsApp support during working hours",
      "Educational health resources",
      "Quarterly health reassessment",
    ],
  };

  return (
    <PageContainer title="Your Recommended Program" subtitle="Your Next Step Towards Better Health">
      {/* Hero */}
      <div className="rounded-md bg-gray-900 text-white p-12">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
            <Crown size={22} className="text-emerald-400" />
          </div>

          <div>
            <p className="uppercase tracking-[3px] text-[11px] text-gray-200 font-semibold">
              Recommended Membership
            </p>

            <h1 className="text-3xl font-semibold mt-2 tracking-tight">
              {membership.name}
            </h1>
          </div>
        </div>

        <p className="mt-8 text-[15px] leading-7 text-gray-300 max-w-2xl">
          {membership.reason}
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="text-lg font-semibold mb-6 text-gray-900 tracking-tight">
            What's Included
          </h2>

          <div className="space-y-4">
            {membership.features.map((feature, index) => (
              <div key={index} className="flex gap-3 items-start">
                <CheckCircle2 className="text-emerald-600 mt-0.5" size={16} />

                <p className="text-[13.5px] leading-6 text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              Why This Program?
            </h2>

            <p className="mt-4 text-[13.5px] leading-6 text-gray-600">
              {membership.description}
            </p>
          </div>

          <a href="https://www.kayapalat.in/gold-plan" className="mt-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-white px-6 py-4 text-[14px] font-semibold flex items-center justify-center gap-2.5">
            Book Your Health Consultation
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 rounded-md border border-dashed border-gray-300 p-8 text-center">
        <p className="text-[13.5px] text-gray-500">
          Scan the QR code or visit the Kayapalat website to begin your personalised wellness journey.
        </p>

        <div className="w-28 h-28  rounded-md mx-auto mt-6 flex items-center justify-center text-[11px] text-gray-400 font-medium">
          <div className="flex justify-center mt-6">
  <div className="">
    <QRCodeSVG
      value="https://kayapalat.com"
      size={126}
      level="H"
      includeMargin
    />
  </div>
</div>
        </div>
      </div>
    </PageContainer>
  );
}