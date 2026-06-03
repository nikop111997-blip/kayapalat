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

      customer: {
        name,
        email,
        phone,
        address:body.address || "",
        city: body.city || "",
        pincode: body.pincode || "",
      },

      product:
        body.product || null,

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