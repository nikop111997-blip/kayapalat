import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } =
      new URL(req.url);

    const paymentId =
      searchParams.get("payment_id");

    console.log(
      "PAYMENT STATUS API:",
      paymentId
    );

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const client =
      await clientPromise;

    const db =
      client.db("kayakalap");


    const collection =
      db.collection("health_reports");
console.log(collection)
    
    const report =
      await collection.findOne({
        paymentId: paymentId,
      });

    console.log(
      "FOUND REPORT:",
      report
        ? {
            id: report._id.toString(),
            mobile: report.mobile,
            paymentId: report.paymentId,
            paymentStatus:
              report.paymentStatus,
            reportUnlocked:
              report.reportUnlocked,
          }
        : null
    );

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          paid: false,
          error:
            "Payment/report not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Payment exists but is not unlocked
     */
    if (
      report.paymentStatus !== "paid" ||
      report.reportUnlocked !== true
    ) {
      return NextResponse.json({
        success: true,
        paid: false,
        reportUnlocked: false,
        reportId: null,
      });
    }

    /*
     * SUCCESS
     */
    return NextResponse.json({
      success: true,
      paid: true,
      reportUnlocked: true,

      reportId:
        report._id.toString(),

      paymentId:
        report.paymentId,

      paymentRequestId:
        report.paymentRequestId,
    });

  } catch (error) {
    console.error(
      "Payment status error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Unable to verify payment",
      },
      {
        status: 500,
      }
    );
  }
}