import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
console.log("Received order data:", body);
    // save customer data
   const orderRes = await fetch(
  "https://www.kayapalat.in/api/orders/create",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: body.customer.name,
      plan: body.product.name,
      customer: body.customer,
      quantity: body.quantity,
      amount: body.amount,
      address: body.customer.address,
      city: body.customer.city,
      pincode: body.customer.pincode,
      product: body.product,

      utm: body.utm,
      utm_source: body.utm?.utm_source,
      utm_medium: body.utm?.utm_medium,
      utm_campaign: body.utm?.utm_campaign,
      utm_term: body.utm?.utm_term,
      utm_content: body.utm?.utm_content,
    }),
  }
);

    const order =
      await orderRes.json();

    if (!order.success) {
      throw new Error(
        "Order creation failed"
      );
    }

    // create instamojo payment
    const paymentRes = await fetch(
      `https://www.kayapalat.in/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          orderId: order.orderId,
        }),
      }
    );

    const payment =
      await paymentRes.json();

    if (!payment.success) {
      throw new Error(
        "Payment creation failed"
      );
    }

    return NextResponse.json({
      success: true,
      paymentUrl:
        payment.paymentUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}