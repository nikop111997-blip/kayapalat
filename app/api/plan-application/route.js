import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("kayakalap");

    const application = {
      ...body,
      createdAt: new Date(),
      status: "new",
    };

    const result = await db
      .collection("plan_applications")
      .insertOne(application);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save application",
      },
      { status: 500 }
    );
  }
}