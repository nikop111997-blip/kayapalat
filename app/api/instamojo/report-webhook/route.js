import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    /*
     * Instamojo sends webhook data as
     * application/x-www-form-urlencoded
     */

    const body = await req.text();

    const params = new URLSearchParams(body);

    const paymentId =
      params.get("payment_id");

    const paymentRequestId =
      params.get("payment_request_id");

    const status =
      params.get("status");

    const purpose =
      params.get("purpose");

    const buyerPhone =
      params.get("buyer_phone");

    const amount =
      params.get("amount");

    const buyer =
      params.get("buyer");

    const buyerName =
      params.get("buyer_name");

    console.log(
      "Health Report Instamojo Webhook:",
      {
        paymentId,
        paymentRequestId,
        status,
        purpose,
        buyerPhone,
        amount,
        buyer,
        buyerName,
      }
    );

    /*
     * Only successful payments should unlock
     * the report.
     *
     * Instamojo:
     * Credit = successful
     * Failed = unsuccessful
     */

    if (status !== "Credit") {
      return NextResponse.json({
        success: true,
        message: "Payment not completed",
      });
    }

    /*
     * Prefer buyer_phone.
     *
     * We also support:
     *
     * purpose = Health Report-9876543210
     */

    let mobile = String(
      buyerPhone || ""
    ).replace(/\D/g, "");

    if (!mobile && purpose) {
      const match =
        purpose.match(
          /^Health Report-(\d+)$/
        );

      if (match) {
        mobile = match[1];
      }
    }

    if (!mobile) {
      console.error(
        "Health report webhook: mobile not found",
        {
          purpose,
          buyerPhone,
        }
      );

      return NextResponse.json(
        {
          success: false,
          error: "Mobile number not found",
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
      db.collection(
        "health_reports"
      );

    /*
     * Find the report using mobile.
     */

    const report =
      await collection.findOne(
        {
          mobile,
        },
        {
          sort: {
            createdAt: -1,
          },
        }
      );

    if (!report) {
      console.error(
        "Health report not found:",
        mobile
      );

      return NextResponse.json(
        {
          success: false,
          error: "Health report not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Update report payment status.
     */

    await collection.updateOne(
      {
        _id: report._id,
      },
      {
        $set: {
          reportUnlocked: true,

          paymentStatus: "paid",

          paymentId,

          paymentRequestId,

          paymentAmount: amount
            ? Number(amount)
            : null,

          paymentBuyer: buyer || null,

          paymentBuyerName:
            buyerName || null,

          paidAt: new Date(),

          updatedAt: new Date(),
        },
      }
    );

    console.log(
      "Health report unlocked:",
      {
        reportId:
          report._id.toString(),

        mobile,

        paymentId,
      }
    );

    return NextResponse.json({
      success: true,
      reportUnlocked: true,
    });

  } catch (error) {
    console.error(
      "Health Report Webhook Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Webhook processing failed",
      },
      {
        status: 500,
      }
    );
  }
}