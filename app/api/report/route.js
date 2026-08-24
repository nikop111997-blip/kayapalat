import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";
import { generateReport } from "@/lib/rulesEngine";
import { generateHealthNarrative } from "@/lib/ai/generateHealthNarrative";
import { analyzeBodyPhotos } from "@/lib/ai/analyzeBodyPhotos";

export async function POST(req) {
  try {
    const answers = await req.json();

    const start = Date.now();

    // -----------------------------
    // Validate mobile
    // -----------------------------
    const mobile = String(answers.mobile || "").replace(/\D/g, "");

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          error: "Mobile number is required",
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
    // Check duplicate mobile
    // -----------------------------
    const existingReport = await collection.findOne({
      mobile,
    });

    if (existingReport) {
      return NextResponse.json(
        {
          success: false,
          duplicate: true,
          error: "A health report already exists for this mobile number.",
        },
        {
          status: 409,
        }
      );
    }

    // -----------------------------
    // Generate calculated report
    // -----------------------------
    const report = generateReport(answers);
 let bodyAnalysis = {
      available: false,
      reason: "No photos uploaded.",
    };

    const frontPhoto =
      answers?.photos?.front;

    const sidePhoto =
      answers?.photos?.side;


    if (frontPhoto || sidePhoto) {
      bodyAnalysis =
        await analyzeBodyPhotos({
          frontUrl: frontPhoto,
          sideUrl: sidePhoto,
          answers,
        });
    }


    // -----------------------------
    // Add body analysis to report
    // -----------------------------

    report.bodyAnalysis =
      bodyAnalysis;
    report.ai = await generateHealthNarrative(report);

    // -----------------------------
    // Save everything
    // -----------------------------
    const document = {
      mobile,

      answers,

      report,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(document);

    console.log(
      `AI Report Generated in ${Date.now() - start}ms`
    );

    // -----------------------------
    // Return report
    // -----------------------------
    return NextResponse.json({
      success: true,

      reportId: result.insertedId.toString(),
    });
  } catch (err) {
    console.error("Report API Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate report",
      },
      {
        status: 500,
      }
    );
  }
}