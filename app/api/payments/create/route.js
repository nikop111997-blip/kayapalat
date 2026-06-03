import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

async function getAccessToken() {
  const response = await fetch(
    "https://api.instamojo.com/oauth2/token/",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.INSTAMOJO_CLIENT_ID,
        client_secret:
          process.env.INSTAMOJO_CLIENT_SECRET,
      }),
    }
  );

  return response.json();
}

export async function POST(req) {
  try {
    const { orderId } = await req.json();
console.log("Received Order ID:", orderId);
    const client = await clientPromise;
    const db = client.db("kayakalap");

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(orderId),
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    const auth = await getAccessToken();

    const paymentResponse = await fetch(
      "https://api.instamojo.com/v2/payment_requests/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purpose: `Order-${orderId}`,
          amount: order.amount.toString(),
          buyer_name:
            order.customer.name,
          email:
            order.customer.email,
          phone:
            order.customer.phone,
send_email: true,
  send_sms: true,
          redirect_url:
            `https://www.kayapalat.in/success`,
             webhook:
    `https://www.kayapalat.in/api/instamojo/webhook`,
        }),
      }
    );

    const paymentData =
      await paymentResponse.json();
console.log("Instamojo Response:", paymentData);
    await db.collection("orders").updateOne(
      {
        _id: new ObjectId(orderId),
      },
      {
        $set: {
          paymentRequestId:
            paymentData.id,
          paymentUrl:
            paymentData.longurl,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      paymentUrl:
        paymentData.longurl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}