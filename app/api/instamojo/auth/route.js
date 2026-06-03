import { NextResponse } from "next/server";

export async function GET() {
  try {
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