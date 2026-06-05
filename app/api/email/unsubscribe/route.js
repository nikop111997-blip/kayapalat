import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");

    if (!email) {
      return new Response("Invalid request", {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("kayakalap");

    await db.collection("newsletter").updateOne(
      { email },
      {
        $set: {
          unsubscribed: true,
          unsubscribedAt: new Date(),
        },
      }
    );

    return new Response(
      `
      <html>
        <body style="font-family:Arial;padding:40px;text-align:center">
          <h2>Successfully Unsubscribed</h2>
          <p>${email}</p>
          <p>You will no longer receive our emails.</p>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (err) {
    return new Response(
      "Something went wrong",
      { status: 500 }
    );
  }
}