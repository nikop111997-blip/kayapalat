import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
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

    const orderId = purpose.replace(
      "Order-",
      ""
    );

    console.log({
      paymentId,
      paymentRequestId,
      status,
      orderId,
    });

    if (status !== "Credit") {
      return NextResponse.json({
        success: true,
        message: "Payment not completed",
      });
    }

    const client = await clientPromise;

    const db = client.db("kayakalap");

    await db.collection("orders").updateOne(
      {
        _id: new ObjectId(orderId),
      },
      {
        $set: {
          status: "paid",
          paymentId,
          paymentRequestId,
          paidAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}