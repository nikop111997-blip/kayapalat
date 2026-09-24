import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    // Next.js 15/16
    const { id } = await params;

    // -----------------------------
    // Validate report ID
    // -----------------------------
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid report ID",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // MongoDB
    // -----------------------------
    const client = await clientPromise;

    const db = client.db("kayakalap");

    const collection = db.collection("health_reports");

    // -----------------------------
    // Find report
    // -----------------------------
    const document = await collection.findOne({
      _id: new ObjectId(id),
    });

    // -----------------------------
    // Report not found
    // -----------------------------
    if (!document) {
      return NextResponse.json(
        {
          success: false,
          error: "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------
    // Return report
    // -----------------------------
    return NextResponse.json({
      success: true,

      reportId: document._id.toString(),

      report: document.report,

      answers: document.answers,

      createdAt: document.createdAt,

      updatedAt: document.updatedAt,
    });
  } catch (error) {
    console.error("Get Report API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load report",
      },
      {
        status: 500,
      }
    );
  }
}