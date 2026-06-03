import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const auth = await getAccessToken();

    const response = await fetch(
      "https://api.instamojo.com/v2/payment_requests/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purpose: "Test Order",
          amount: "10",
          buyer_name: "Puneet Sharma",
          email: "test@example.com",
          phone: "8005908750",
           send_email: true,
  send_sms: true,
          redirect_url:
            "https://www.kayapalat.in/payment/success",
          webhook:
    `https://www.kayapalat.in/api/instamojo/webhook`,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
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