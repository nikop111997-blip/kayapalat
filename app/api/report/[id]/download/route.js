import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  let browser;

  try {
    const { id } = await params;

    // -----------------------------
    // Get report
    // -----------------------------
    const client = await clientPromise;
    const db = client.db("kayakalap");

    const reportDoc = await db.collection("health_reports").findOne({
      _id: new ObjectId(id),
    });

    if (!reportDoc) {
      return NextResponse.json(
        {
          error: "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------
    // Chromium
    // -----------------------------
    const chromiumPackUrl =
      "https://github.com/Sparticuz/chromium/releases/download/v141.0.0/chromium-v141.0.0-pack.x64.tar";

    const executablePath = await chromium.executablePath(
      chromiumPackUrl
    );

    console.log("Chromium executable:", executablePath);

    // -----------------------------
    // Launch browser
    // -----------------------------
    browser = await puppeteer.launch({
      executablePath,

      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],

      defaultViewport: chromium.defaultViewport,

      headless: true,
    });

    // -----------------------------
    // Create page
    // -----------------------------
    const page = await browser.newPage();

    // -----------------------------
    // Report URL
    // -----------------------------
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://www.kayapalat.in";

    const reportUrl = `${baseUrl}/report/print/${id}`;

    console.log("Opening:", reportUrl);

    await page.goto(reportUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // -----------------------------
    // Generate PDF
    // -----------------------------
    const pdf = await page.pdf({
      format: "A4",

      printBackground: true,

      preferCSSPageSize: true,

      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    return new NextResponse(pdf, {
      status: 200,

      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition": `attachment; filename="Kayapalat-Health-Report-${id}.pdf"`,

        "Content-Length": pdf.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        message: error?.message,
      },
      {
        status: 500,
      }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error(
          "Browser close error:",
          closeError
        );
      }
    }
  }
}