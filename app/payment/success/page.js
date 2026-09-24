"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function verifyPaymentWithRetry() {
      const params = new URLSearchParams(window.location.search);
      const paymentId = params.get("payment_id");
      const paymentRequestId = params.get("payment_request_id");
      const paymentStatus = params.get("payment_status");

      if (!paymentId && !paymentRequestId) {
        setError("Payment identification details are missing.");
        setLoading(false);
        return;
      }

      if (paymentStatus && paymentStatus !== "Credit") {
        setError("Payment was not successful.");
        setLoading(false);
        return;
      }

      // Retry up to 4 times with a 1.5s delay to handle webhook latency
      const maxRetries = 4;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const queryParams = new URLSearchParams();
          if (paymentId) queryParams.set("payment_id", paymentId);
          if (paymentRequestId) queryParams.set("payment_request_id", paymentRequestId);

          const response = await fetch(
            `/api/health-report/payment-status?${queryParams.toString()}`,
            { method: "GET", cache: "no-store" }
          );

          const data = await response.json();

          if (response.ok && data.success && data.paid && data.reportId) {
            if (!isMounted) return;
            setPaid(true);
            setReportId(data.reportId);

            localStorage.setItem(
              "kayapalat_report_link",
              `/health-check/report?reportId=${encodeURIComponent(data.reportId)}`
            );
            setLoading(false);
            return;
          }

          // If payment was found but webhook is still unlocking
          if (data.reportUnlocked === false && attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            continue;
          }

          if (attempt === maxRetries) {
            throw new Error(data?.error || "Payment verification timed out.");
          }
        } catch (err) {
          if (attempt === maxRetries) {
            if (!isMounted) return;
            console.error(err);
            setError(err?.message || "Unable to verify payment.");
            setLoading(false);
            return;
          }
        }

        // Wait 1.5 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      if (isMounted) setLoading(false);
    }

    verifyPaymentWithRetry();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewReport = () => {
    if (!reportId) return;
    window.location.href = `/report/print/${encodeURIComponent(reportId)}`;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8fb] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* Loading */}
          {loading && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8e9f3]">
                <Loader2 size={30} className="animate-spin text-[#d55559]" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Verifying your payment
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Please wait while we confirm your payment and prepare your health report.
              </p>
            </>
          )}

          {/* Success */}
          {!loading && paid && reportId && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 size={34} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Payment Successful
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your full Kayapalat Health Report is now unlocked.
              </p>
              <button
                type="button"
                onClick={handleViewReport}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#d55559] via-[#e382c5] to-[#dc8bc3] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.01] hover:shadow-lg"
              >
                Go to Full Report
                <ArrowRight size={18} />
              </button>
            </>
          )}

          {/* Error */}
          {!loading && !paid && error && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Payment Verification
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Check Again
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}