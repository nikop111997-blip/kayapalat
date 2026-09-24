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

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    console.error("Instamojo Auth Error:", data);

    throw new Error(
      data?.error_description ||
        data?.message ||
        "Failed to authenticate with Instamojo"
    );
  }

  return data.access_token;
}

export async function POST(req) {
  try {
    const body = await req.json();

    const mobile = String(body?.mobile || "").replace(
      /\D/g,
      ""
    );

    const amount = Number(body?.amount || 0);

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          error: "Mobile number is required",
        },
        { status: 400 }
      );
    }

    if (!amount || amount < 9) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment amount",
        },
        { status: 400 }
      );
    }

    /*
     * IMPORTANT:
     * We use mobile as the identifier.
     *
     * We don't trust reportId from localStorage.
     */

    const token = await getAccessToken();

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.kayapalat.in";

    const response = await fetch(
      "https://api.instamojo.com/v2/payment_requests/",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          purpose: `Health Report-${mobile}`,

          amount: String(amount),

          buyer_name:
            body?.name || "Health Report User",

          email:
            body?.email || undefined,

          phone: mobile,

          send_email: false,

          send_sms: false,

          redirect_url:
            `${baseUrl}/payment/success?type=health-report`,

          webhook:
            `${baseUrl}/api/instamojo/report-webhook`,

          allow_repeated_payments: false,
        }),
      }
    );

    const data = await response.json();

    console.log(
      "Instamojo Report Payment Response:",
      data
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.message ||
            data?.error ||
            "Failed to create payment request",
          instamojo: data,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,

      paymentRequestId:
        data?.id ||
        data?.payment_request_id ||
        null,

      paymentUrl:
        data?.longurl ||
        data?.shorturl ||
        null,

      data,
    });

  } catch (error) {
    console.error(
      "Report Payment Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to create payment",
      },
      {
        status: 500,
      }
    );
  }
}