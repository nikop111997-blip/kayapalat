import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const name =
      body.name ||
      body.customer?.name;

    const email =
      body.email ||
      body.customer?.email;

    const phone =
      body.phone ||
      body.customer?.phone;
    
    const refferBy =
      body.refferBy ||
      body.customer?.refferBy ||
      "Organic"; // Default to "Organic" if not provided

    const plan =
      body.plan ||
      body.product?.name ||
      "Unknown Plan";

    const amount = Number(
      body.amount ||
      body.totalPrice
    );

    const quantity =
      body.quantity || 1;

    const client =
      await clientPromise;

    const db =
      client.db("kayakalap");

   const order = {
  name,
  plan,
  email,
  phone,
  amount,
  quantity,
  refferBy,

  customer: {
    name,
    email,
    phone,
    address: body.address || "",
    city: body.city || "",
    pincode: body.pincode || "",
  },

  product: body.product || null,
landingPage: body.landingPage || "",
referrer: body.referrer || "",
  // UTM Tracking
  utm: body.utm || {},

  utm_source:
    body.utm_source ||
    body.utm?.utm_source ||
    "",

  utm_medium:
    body.utm_medium ||
    body.utm?.utm_medium ||
    "",

  utm_campaign:
    body.utm_campaign ||
    body.utm?.utm_campaign ||
    "",

  utm_term:
    body.utm_term ||
    body.utm?.utm_term ||
    "",

  utm_content:
    body.utm_content ||
    body.utm?.utm_content ||
    "",

  status: "pending",

  paymentRequestId: null,
  paymentId: null,

  createdAt: new Date(),
  updatedAt: new Date(),
};

    const result =
      await db
        .collection("orders")
        .insertOne(order);

    return NextResponse.json({
      success: true,
      orderId:
        result.insertedId.toString(),
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